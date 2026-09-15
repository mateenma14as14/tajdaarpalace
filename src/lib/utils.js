/** Small shared helpers. */

/** Join class names, dropping falsy values. */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

// Grouping only — the currency symbol is added by hand so the output is
// identical in every browser and Node build, whatever ICU data is present.
const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Format an amount in rupees, e.g. 285000 -> "Rs 285,000". */
export function money(amount) {
  const value = Number(amount);
  return `Rs ${GROUPED.format(Number.isFinite(value) ? Math.round(value) : 0)}`;
}

/** "2026-02-14" -> "14 February 2026" */
export function formatDate(iso, opts) {
  if (!iso) return "";
  const d = typeof iso === "string" ? new Date(`${iso}T00:00:00`) : iso;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  });
}

/** Local-time YYYY-MM-DD, avoiding the UTC shift toISOString() introduces. */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addMonths(date, n) {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return d;
}

/** Stable small hash, used to fake a realistic availability calendar. */
export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Accepts 03001234567, +923001234567, 0300-1234567 and similar. */
export function isValidPhone(value) {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
