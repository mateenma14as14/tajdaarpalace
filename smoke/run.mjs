/**
 * Smoke tests.
 *
 *   npm run smoke
 *
 * Renders every route server-side to catch broken imports and render-time
 * errors, then exercises the booking logic against a stub localStorage.
 * Exits non-zero on the first sign of trouble, so it can gate a deploy.
 */

const { renderRoute, bookings, utils, images } = await import("./.out/entry.js");

/**
 * Stub of the browser storage the booking module expects. Installed only
 * after the render pass — defining `window` up front makes framer-motion
 * take its browser code path and reach for DOM APIs that are not here.
 */
function installStorageStub() {
  const store = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
  };
}

let fails = 0;
const check = (label, ok, extra = "") => {
  if (ok) console.log(`  PASS  ${label}`);
  else {
    fails += 1;
    console.log(`  FAIL  ${label}${extra ? `  — ${extra}` : ""}`);
  }
};

/* ---------------------------------------------------------------- */
console.log("\nRoutes");
/* ---------------------------------------------------------------- */

const routes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/projects/ayesha-and-hamza",
  "/projects/amaan-turns-one",
  "/gallery",
  "/booking",
  "/contact",
  "/no-such-page",
];

for (const route of routes) {
  try {
    const html = renderRoute(route);
    check(`${route} renders`, html.length > 2000, `${html.length} chars`);
  } catch (err) {
    check(`${route} renders`, false, err.message);
  }
}

// An unknown project slug redirects rather than throwing.
try {
  renderRoute("/projects/does-not-exist");
  check("unknown project slug does not throw", true);
} catch (err) {
  check("unknown project slug does not throw", false, err.message);
}

/* ---------------------------------------------------------------- */
console.log("\nQuoting");
/* ---------------------------------------------------------------- */

installStorageStub();

const draft = { hallId: "grand", packageId: "gold", guests: 400, addons: ["dj", "valet"] };
const q = bookings.quote(draft);
const expectedSub = 250000 + 2650 * 400 + 45000 + 25000;

check("catering = per head × guests", q.catering === 2650 * 400, `got ${q.catering}`);
check("add-ons summed", q.addonsTotal === 70000, `got ${q.addonsTotal}`);
check("subtotal correct", q.subtotal === expectedSub, `got ${q.subtotal}`);
check("service charge is 5%", q.serviceCharge === Math.round(expectedSub * 0.05));
check("total = subtotal + service charge", q.total === expectedSub + q.serviceCharge);
check("deposit is 25% of total", q.deposit === Math.round(q.total * 0.25));
check("empty draft totals to zero", bookings.quote({}).total === 0);

/* ---------------------------------------------------------------- */
console.log("\nAvailability");
/* ---------------------------------------------------------------- */

check("today is not in the past", bookings.isPast(utils.toISODate(new Date())) === false);
check("an old date is in the past", bookings.isPast("2020-01-01") === true);
check(
  "pre-booked dates are stable across calls",
  bookings.isPrebooked("2026-12-19", "grand") === bookings.isPrebooked("2026-12-19", "grand"),
);
check(
  "halls have independent availability",
  !["2026-06-06", "2026-07-11", "2026-08-15", "2026-09-19"].every(
    (d) => bookings.isPrebooked(d, "grand") === bookings.isPrebooked(d, "royal"),
  ),
);

let target = null;
let openDates = 0;
for (let i = 30; i < 220; i += 1) {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const iso = utils.toISODate(d);
  if (bookings.availabilityFor(iso, "grand", []) === "available") {
    openDates += 1;
    if (!target && bookings.availabilityFor(iso, "royal", []) === "available") target = iso;
  }
}
check("plenty of future dates are open", openDates > 20, `${openDates} open`);
check("found a date free in two halls", Boolean(target));

/* ---------------------------------------------------------------- */
console.log("\nBookings");
/* ---------------------------------------------------------------- */

const payload = {
  ...draft,
  date: target,
  slot: "dinner",
  eventType: "Walima",
  name: "Test Family",
  email: "test@example.com",
  phone: "03001234567",
  notes: "",
};

const first = await bookings.createBooking(payload);
check("booking is created", first.ok === true, first.error);
check("reference looks right", /^TM-\d{4}-[A-Z0-9]{5}$/.test(first.booking?.reference || ""));
check("price is frozen onto the booking", first.booking?.pricing.total === q.total);
check("saved to storage", first.persisted === true);

check("double-booking a hall is refused", (await bookings.createBooking(payload)).ok === false);

const otherHall = await bookings.createBooking({ ...payload, hallId: "royal", guests: 150 });
check("another hall on the same date is fine", otherHall.ok === true, otherHall.error);

check(
  "a past date is refused",
  (await bookings.createBooking({ ...payload, date: "2020-05-05" })).ok === false,
);
check("the date now reads as booked", (await bookings.checkAvailability(target, "grand")) === "booked");

check("cancelling works", (await bookings.cancelBooking(first.booking.reference)).ok === true);
check("cancelling frees the date", (await bookings.checkAvailability(target, "grand")) === "available");
check("cancelling an unknown reference fails cleanly",
  (await bookings.cancelBooking("TM-0000-XXXXX")).ok === false);

check("both bookings are listed", (await bookings.listBookings()).length === 2);
check("lookup by reference works",
  (await bookings.getBooking(otherHall.booking.reference))?.reference === otherHall.booking.reference);
check("unknown reference returns null", (await bookings.getBooking("nope")) === null);

/* ---------------------------------------------------------------- */
console.log("\nFormatting");
/* ---------------------------------------------------------------- */

check("money formats rupees", utils.money(285000) === "Rs 285,000", utils.money(285000));
check("money copes with junk", utils.money(undefined) === "Rs 0" && utils.money(NaN) === "Rs 0");
check("dates read naturally", utils.formatDate("2026-02-14") === "14 February 2026");
check("bad dates return empty", utils.formatDate("") === "" && utils.formatDate("abc") === "");
check("no UTC drift on dates", utils.toISODate(new Date(2026, 0, 1)) === "2026-01-01");
check("email validation", utils.isValidEmail("a@b.co") && !utils.isValidEmail("nope@"));
check("phone validation", utils.isValidPhone("0300-1234567") && !utils.isValidPhone("123"));
check("unsplash ids become CDN urls",
  images.img("1519741497674-611481863552", 800, 600).startsWith("https://images.unsplash.com/photo-1519741497674"));
check("local image paths pass through untouched",
  images.img("/images/grand-hall.jpg") === "/images/grand-hall.jpg", images.img("/images/grand-hall.jpg"));
check("absolute urls pass through untouched",
  images.img("https://cdn.example.com/a.jpg") === "https://cdn.example.com/a.jpg");
check("missing id returns empty string", images.img("") === "" && images.img(undefined) === "");
check("addMonths rolls over the year",
  utils.toISODate(utils.addMonths(new Date(2026, 11, 5), 1)) === "2027-01-01");

/* ---------------------------------------------------------------- */

console.log(
  fails === 0
    ? "\n✓ All smoke checks passed.\n"
    : `\n✗ ${fails} check${fails === 1 ? "" : "s"} failed.\n`,
);
process.exit(fails === 0 ? 0 : 1);
