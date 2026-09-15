import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarCheck,
  Users,
  AlertCircle,
  Printer,
  Star,
} from "lucide-react";

import PageHero from "../components/layout/PageHero";
import Calendar from "../components/booking/Calendar";
import Stepper from "../components/booking/Stepper";
import QuoteSummary from "../components/booking/QuoteSummary";

import { Container, Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Img from "../components/ui/Img";
import { Field, Input, Select, Textarea, CheckboxCard } from "../components/ui/Form";

import { HALLS, PACKAGES, ADDONS, EVENT_TYPES } from "../data/services";
import { PHOTO } from "../data/images";
import { SITE } from "../data/site";
import {
  TIME_SLOTS,
  createBooking,
  quote,
  availabilityFor,
  readBookingsSync,
} from "../lib/bookings";
import { cn, formatDate, isValidEmail, isValidPhone, money } from "../lib/utils";

const STEPS = ["Event", "Guests & menu", "Your details", "Review"];

const EMPTY_DRAFT = {
  eventType: "",
  hallId: "",
  date: "",
  slot: "dinner",
  guests: "",
  packageId: "gold",
  addons: [],
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function Booking() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const pricing = useMemo(() => quote(draft), [draft]);
  const hall = pricing.hall;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }

  // If the chosen date is not free in the newly selected hall, clear it so the
  // visitor is not carried forward on an impossible booking.
  useEffect(() => {
    if (!draft.date || !draft.hallId) return;
    const state = availabilityFor(draft.date, draft.hallId, readBookingsSync());
    if (state !== "available") {
      setDraft((d) => ({ ...d, date: "" }));
    }
  }, [draft.hallId, draft.date]);

  function toggleAddon(id, on) {
    setDraft((d) => ({
      ...d,
      addons: on ? [...d.addons, id] : d.addons.filter((a) => a !== id),
    }));
  }

  /** Validation, one rule set per step. */
  function validateStep(index) {
    const next = {};

    if (index === 0) {
      if (!draft.eventType) next.eventType = "Please choose the kind of event.";
      if (!draft.hallId) next.hallId = "Please choose a hall.";
      if (!draft.date) next.date = "Please pick an available date.";
      if (!draft.slot) next.slot = "Please choose a sitting.";
    }

    if (index === 1) {
      const guests = Number(draft.guests);
      if (!draft.guests) next.guests = "How many guests are you expecting?";
      else if (!Number.isFinite(guests) || guests < 1) next.guests = "Enter a number of guests.";
      else if (hall && guests > hall.capacity)
        next.guests = `${hall.name} seats ${hall.capacity}. Choose a larger hall or reduce the count.`;
      else if (hall && guests < hall.minGuests)
        next.guests = `${hall.name} has a minimum of ${hall.minGuests} guests.`;
      if (!draft.packageId) next.packageId = "Please choose a menu.";
    }

    if (index === 2) {
      if (!draft.name.trim()) next.name = "Please tell us your name.";
      if (!draft.email.trim()) next.email = "We need an email for the confirmation.";
      else if (!isValidEmail(draft.email)) next.email = "That email does not look right.";
      if (!draft.phone.trim()) next.phone = "We will call to confirm — please add a number.";
      else if (!isValidPhone(draft.phone)) next.phone = "Please check the phone number.";
    }

    return next;
  }

  function goNext() {
    const found = validateStep(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 260, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 260, behavior: "smooth" });
  }

  async function submit() {
    // Re-run every step in case something was edited after the fact.
    const all = { ...validateStep(0), ...validateStep(1), ...validateStep(2) };
    if (Object.keys(all).length > 0) {
      setErrors(all);
      setStep(0);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const result = await createBooking(draft);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    setConfirmed(result.booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startOver() {
    setDraft(EMPTY_DRAFT);
    setConfirmed(null);
    setAgreed(false);
    setStep(0);
    setErrors({});
  }

  /* ---------------------------------------------------------------- */
  /* Confirmation                                                      */
  /* ---------------------------------------------------------------- */
  if (confirmed) {
    return (
      <>
        <PageHero
          crumb="Booking"
          eyebrow="Request received"
          title="Your date is held"
          lead="We have your request. Someone will call within 24 hours to confirm the deposit and lock it in."
          photo={PHOTO.heroCouple}
        />

        <Section tone="cream">
          <Container className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-5xl border border-cream-200 bg-white shadow-soft-lg"
            >
              <div className="border-b border-cream-200 bg-blush-50 px-8 py-10 text-center sm:px-12">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-white shadow-soft">
                  <Check className="h-8 w-8" strokeWidth={2} />
                </span>

                <h2 className="mt-6 text-3xl">Thank you, {confirmed.name.split(" ")[0]}</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
                  Keep this reference — quote it when you call and we will find your
                  booking straight away.
                </p>

                <p className="mt-6 inline-block rounded-2xl border border-dashed border-rose-300 bg-white px-6 py-3 font-display text-2xl tracking-wide text-rose-600">
                  {confirmed.reference}
                </p>
              </div>

              {/* Details */}
              <dl className="divide-y divide-cream-200 px-8 py-2 sm:px-12">
                {[
                  ["Event", confirmed.eventType],
                  ["Date", formatDate(confirmed.date)],
                  ["Sitting", TIME_SLOTS.find((s) => s.id === confirmed.slot)?.label],
                  ["Venue", confirmed.hallName],
                  ["Guests", `${confirmed.guests} seated`],
                  ["Menu", `${confirmed.packageName} package`],
                  [
                    "Extras",
                    confirmed.addons.length
                      ? confirmed.addons
                          .map((id) => ADDONS.find((a) => a.id === id)?.label)
                          .filter(Boolean)
                          .join(", ")
                      : "None",
                  ],
                  ["Contact", `${confirmed.phone} · ${confirmed.email}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap justify-between gap-2 py-4">
                    <dt className="text-xs uppercase tracking-[0.16em] text-ink-400">
                      {label}
                    </dt>
                    <dd className="text-sm text-ink-900">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Money */}
              <div className="border-t border-cream-200 bg-cream-50 px-8 py-8 sm:px-12">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-ink-500">Estimated total</span>
                  <span className="font-display text-2xl text-ink-900">
                    {money(confirmed.pricing.total)}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <span className="text-sm text-ink-500">Deposit to confirm (25%)</span>
                  <span className="font-display text-2xl text-rose-600">
                    {money(confirmed.pricing.deposit)}
                  </span>
                </div>

                {!confirmed.persisted && (
                  <p className="mt-4 text-xs text-ink-400">
                    Your browser blocked local storage, so this booking is not saved on
                    this device — please note the reference down.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 px-8 pb-10 pt-8 sm:flex-row sm:justify-center sm:px-12">
                <Button onClick={() => window.print()} variant="outline">
                  <Printer className="h-4 w-4" strokeWidth={1.5} />
                  Print this
                </Button>
                <Button href={SITE.phoneHref} variant="primary">
                  Call {SITE.phone}
                </Button>
                <Button onClick={startOver} variant="ghost">
                  Make another booking
                </Button>
              </div>
            </motion.div>

            <p className="mt-8 text-center text-sm text-ink-400">
              Something not right?{" "}
              <Link to="/contact" className="text-rose-600 underline underline-offset-4">
                Get in touch
              </Link>{" "}
              and we will amend it.
            </p>
          </Container>
        </Section>
      </>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Wizard                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <>
      <PageHero
        crumb="Booking"
        eyebrow="Book online"
        title="Check your date and hold it"
        lead="Four short steps, a price that updates as you go, and no payment taken online. We confirm every request within 24 hours."
        photo={PHOTO.hallGrand}
      />

      <Section tone="cream">
        <Container>
          {/* Progress */}
          <Reveal className="mx-auto max-w-3xl">
            <Stepper steps={STEPS} current={step} onJump={setStep} />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Form column */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="rounded-5xl border border-cream-200 bg-white p-6 shadow-soft sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* ---------------- Step 1: Event ---------------- */}
                    {step === 0 && (
                      <div className="space-y-8">
                        <header>
                          <p className="eyebrow">Step one</p>
                          <h2 className="mt-3 text-3xl">What are we hosting?</h2>
                        </header>

                        <Field
                          label="Type of event"
                          htmlFor="eventType"
                          required
                          error={errors.eventType}
                        >
                          <Select
                            id="eventType"
                            value={draft.eventType}
                            onChange={(e) => set("eventType", e.target.value)}
                            placeholder="Choose an event type"
                            options={EVENT_TYPES}
                            error={errors.eventType}
                          />
                        </Field>

                        {/* Halls */}
                        <fieldset>
                          <legend className="text-xs uppercase tracking-[0.16em] text-ink-500">
                            Choose a hall <span className="text-rose-500">*</span>
                          </legend>

                          <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            {HALLS.map((h) => {
                              const selected = draft.hallId === h.id;
                              return (
                                <label
                                  key={h.id}
                                  className={cn(
                                    "group cursor-pointer overflow-hidden rounded-3xl border bg-white transition-all duration-400 ease-soft",
                                    selected
                                      ? "border-rose-400 shadow-soft-lg"
                                      : "border-cream-300 hover:border-blush-300 hover:shadow-soft",
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="hall"
                                    value={h.id}
                                    checked={selected}
                                    onChange={() => set("hallId", h.id)}
                                    className="sr-only"
                                  />

                                  <span className="relative block">
                                    <Img
                                      id={h.photo}
                                      alt=""
                                      width={400}
                                      height={260}
                                      className="aspect-[3/2] w-full"
                                    />
                                    {selected && (
                                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white shadow-soft">
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                      </span>
                                    )}
                                  </span>

                                  <span className="block p-4">
                                    <span className="block text-sm text-ink-900">{h.name}</span>
                                    <span className="mt-1 flex items-center gap-1 text-xs text-ink-400">
                                      <Users className="h-3 w-3" strokeWidth={1.5} />
                                      {h.minGuests}–{h.capacity} guests
                                    </span>
                                    <span className="mt-1.5 block text-xs text-rose-600">
                                      {money(h.rent)} rent
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {errors.hallId && (
                            <p className="mt-2 text-xs text-rose-600">{errors.hallId}</p>
                          )}
                        </fieldset>

                        {/* Date */}
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">
                            Pick a date <span className="text-rose-500">*</span>
                          </p>

                          {!draft.hallId ? (
                            <p className="mt-4 rounded-3xl border border-dashed border-cream-300 bg-cream-50 p-8 text-center text-sm text-ink-400">
                              Choose a hall first — availability differs between them.
                            </p>
                          ) : (
                            <div className="mt-4">
                              <Calendar
                                value={draft.date}
                                onChange={(iso) => set("date", iso)}
                                hallId={draft.hallId}
                              />
                            </div>
                          )}

                          {errors.date && (
                            <p className="mt-2 text-xs text-rose-600">{errors.date}</p>
                          )}

                          {draft.date && (
                            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700">
                              <CalendarCheck
                                className="h-4 w-4 text-rose-500"
                                strokeWidth={1.5}
                              />
                              {formatDate(draft.date)} is available in {hall?.name}.
                            </p>
                          )}
                        </div>

                        {/* Slot */}
                        <fieldset>
                          <legend className="text-xs uppercase tracking-[0.16em] text-ink-500">
                            Sitting <span className="text-rose-500">*</span>
                          </legend>

                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {TIME_SLOTS.map((s) => {
                              const selected = draft.slot === s.id;
                              return (
                                <label
                                  key={s.id}
                                  className={cn(
                                    "cursor-pointer rounded-2xl border p-4 text-center transition-all duration-300",
                                    selected
                                      ? "border-rose-400 bg-blush-50 shadow-soft"
                                      : "border-cream-300 bg-white hover:border-blush-300",
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="slot"
                                    value={s.id}
                                    checked={selected}
                                    onChange={() => set("slot", s.id)}
                                    className="sr-only"
                                  />
                                  <span className="block text-sm text-ink-900">{s.label}</span>
                                  <span className="mt-1 block text-xs text-ink-400">
                                    {s.time}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>
                    )}

                    {/* ---------------- Step 2: Guests & menu ---------------- */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <header>
                          <p className="eyebrow">Step two</p>
                          <h2 className="mt-3 text-3xl">Guests and menu</h2>
                        </header>

                        <Field
                          label="Number of guests"
                          htmlFor="guests"
                          required
                          error={errors.guests}
                          hint={
                            hall
                              ? `${hall.name} seats ${hall.minGuests} to ${hall.capacity}.`
                              : undefined
                          }
                        >
                          <Input
                            id="guests"
                            type="number"
                            inputMode="numeric"
                            min={hall?.minGuests || 1}
                            max={hall?.capacity || 1000}
                            value={draft.guests}
                            onChange={(e) => set("guests", e.target.value)}
                            placeholder="e.g. 350"
                            error={errors.guests}
                          />
                        </Field>

                        {/* Packages */}
                        <fieldset>
                          <legend className="text-xs uppercase tracking-[0.16em] text-ink-500">
                            Catering package <span className="text-rose-500">*</span>
                          </legend>

                          <div className="mt-4 space-y-3">
                            {PACKAGES.map((pkg) => {
                              const selected = draft.packageId === pkg.id;
                              const guests = Number(draft.guests) || 0;

                              return (
                                <label
                                  key={pkg.id}
                                  className={cn(
                                    "flex cursor-pointer gap-4 rounded-3xl border p-5 transition-all duration-300",
                                    selected
                                      ? "border-rose-400 bg-blush-50 shadow-soft"
                                      : "border-cream-300 bg-white hover:border-blush-300",
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="package"
                                    value={pkg.id}
                                    checked={selected}
                                    onChange={() => set("packageId", pkg.id)}
                                    className="sr-only"
                                  />

                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                                      selected
                                        ? "border-rose-500 bg-rose-500"
                                        : "border-cream-300 bg-white",
                                    )}
                                  >
                                    {selected && (
                                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    )}
                                  </span>

                                  <span className="min-w-0 flex-1">
                                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                      <span className="font-display text-xl text-ink-900">
                                        {pkg.name}
                                      </span>
                                      {pkg.popular && (
                                        <span className="flex items-center gap-1 rounded-full bg-rose-500 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-white">
                                          <Star className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
                                          Most booked
                                        </span>
                                      )}
                                    </span>

                                    <span className="mt-1 block text-sm text-ink-500">
                                      {pkg.blurb}
                                    </span>

                                    <span className="mt-3 flex flex-wrap items-baseline gap-x-3">
                                      <span className="text-sm text-rose-600">
                                        {money(pkg.perHead)} per head
                                      </span>
                                      {guests > 0 && (
                                        <span className="text-xs text-ink-400">
                                          = {money(pkg.perHead * guests)} for {guests} guests
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Add-ons */}
                        <fieldset>
                          <legend className="text-xs uppercase tracking-[0.16em] text-ink-500">
                            Optional extras
                          </legend>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {ADDONS.map((addon) => (
                              <CheckboxCard
                                key={addon.id}
                                checked={draft.addons.includes(addon.id)}
                                onChange={(on) => toggleAddon(addon.id, on)}
                                title={addon.label}
                                subtitle={money(addon.price)}
                              />
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    )}

                    {/* ---------------- Step 3: Details ---------------- */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <header>
                          <p className="eyebrow">Step three</p>
                          <h2 className="mt-3 text-3xl">How do we reach you?</h2>
                          <p className="mt-3 text-sm leading-relaxed text-ink-500">
                            We call every booking to confirm the deposit. Nothing else is
                            done with these details.
                          </p>
                        </header>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <Field label="Full name" htmlFor="b-name" required error={errors.name}>
                            <Input
                              id="b-name"
                              value={draft.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder="Ayesha Rehman"
                              error={errors.name}
                            />
                          </Field>

                          <Field label="Phone" htmlFor="b-phone" required error={errors.phone}>
                            <Input
                              id="b-phone"
                              type="tel"
                              value={draft.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              placeholder="0300 1234567"
                              error={errors.phone}
                            />
                          </Field>
                        </div>

                        <Field label="Email" htmlFor="b-email" required error={errors.email}>
                          <Input
                            id="b-email"
                            type="email"
                            value={draft.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="you@example.com"
                            error={errors.email}
                          />
                        </Field>

                        <Field
                          label="Anything else?"
                          htmlFor="b-notes"
                          hint="Colour scheme, dietary requirements, timings — anything you already know."
                        >
                          <Textarea
                            id="b-notes"
                            rows={4}
                            value={draft.notes}
                            onChange={(e) => set("notes", e.target.value)}
                            placeholder="We would like a blush and gold palette, and around 40 guests will need vegetarian food."
                          />
                        </Field>
                      </div>
                    )}

                    {/* ---------------- Step 4: Review ---------------- */}
                    {step === 3 && (
                      <div className="space-y-8">
                        <header>
                          <p className="eyebrow">Last step</p>
                          <h2 className="mt-3 text-3xl">Check it over</h2>
                          <p className="mt-3 text-sm leading-relaxed text-ink-500">
                            Nothing is charged now. We will call within 24 hours to
                            arrange the deposit and confirm the date.
                          </p>
                        </header>

                        <dl className="divide-y divide-cream-200 rounded-3xl border border-cream-200">
                          {[
                            ["Event", draft.eventType],
                            ["Date", formatDate(draft.date)],
                            ["Sitting", TIME_SLOTS.find((s) => s.id === draft.slot)?.label],
                            ["Venue", hall?.name],
                            ["Guests", `${draft.guests} seated`],
                            ["Menu", `${pricing.package?.name} package`],
                            [
                              "Extras",
                              pricing.addons.length
                                ? pricing.addons.map((a) => a.label).join(", ")
                                : "None",
                            ],
                            ["Name", draft.name],
                            ["Phone", draft.phone],
                            ["Email", draft.email],
                            ["Notes", draft.notes || "—"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex flex-wrap justify-between gap-2 px-5 py-3.5"
                            >
                              <dt className="text-xs uppercase tracking-[0.16em] text-ink-400">
                                {label}
                              </dt>
                              <dd className="max-w-[60%] text-right text-sm text-ink-900">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream-50 p-4">
                          <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-rose-500"
                          />
                          <span className="text-sm leading-relaxed text-ink-500">
                            I understand this is a booking request, that the date is held
                            for 48 hours, and that a 25% deposit confirms it.
                          </span>
                        </label>

                        {submitError && (
                          <p className="flex items-start gap-2.5 rounded-2xl bg-blush-100 p-4 text-sm text-rose-700">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                            {submitError}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between gap-4 border-t border-cream-200 pt-8">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    disabled={step === 0}
                    className={step === 0 ? "invisible" : ""}
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back
                  </Button>

                  {step < STEPS.length - 1 ? (
                    <Button onClick={goNext} size="lg">
                      Continue
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  ) : (
                    <Button onClick={submit} size="lg" disabled={!agreed || submitting}>
                      {submitting ? "Sending…" : "Send booking request"}
                      {!submitting && <Check className="h-4 w-4" strokeWidth={2} />}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky quote */}
            <div className="lg:col-span-5 xl:col-span-4">
              <QuoteSummary draft={draft} pricing={pricing} className="lg:sticky lg:top-28" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
