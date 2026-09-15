/**
 * Booking store.
 *
 * This is the ONLY module that touches booking storage. Right now everything
 * lives in localStorage so the whole flow can be demonstrated without a
 * server. To move to a real backend, replace the bodies of the exported
 * functions with fetch() calls — every function is already async, and no
 * component reads localStorage directly.
 */

import { HALLS, PACKAGES, ADDONS } from "../data/services";
import { hashString, toISODate } from "./utils";

const STORAGE_KEY = "tajdar.bookings.v1";
const SERVICE_CHARGE_RATE = 0.05;
const DEPOSIT_RATE = 0.25;

/* ------------------------------------------------------------------ */
/* Storage primitives                                                  */
/* ------------------------------------------------------------------ */

function readAll() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Private mode, disabled storage, or corrupted JSON — fail soft.
    return [];
  }
}

function writeAll(bookings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Availability                                                        */
/* ------------------------------------------------------------------ */

/**
 * Dates already taken, so the calendar has something realistic to show.
 * Derived from a stable hash of the date so it never changes between
 * reloads, weighted so weekends fill up first. Replace with a real
 * availability endpoint when you have one.
 */
export function isPrebooked(isoDate, hallId) {
  const day = new Date(`${isoDate}T00:00:00`).getDay();
  const weekend = day === 0 || day === 6;
  const bucket = hashString(`${isoDate}:${hallId}`) % 100;
  return weekend ? bucket < 45 : bucket < 12;
}

/** True when a date is in the past. */
export function isPast(isoDate) {
  const today = toISODate(new Date());
  return isoDate < today;
}

/**
 * Availability for one date + hall.
 * Returns "past" | "booked" | "available".
 */
export async function checkAvailability(isoDate, hallId) {
  if (!isoDate || !hallId) return "available";
  if (isPast(isoDate)) return "past";
  if (isPrebooked(isoDate, hallId)) return "booked";
  const mine = readAll();
  const taken = mine.some(
    (b) => b.date === isoDate && b.hallId === hallId && b.status !== "cancelled",
  );
  return taken ? "booked" : "available";
}

/** Synchronous variant used by the calendar grid, which renders many cells. */
export function availabilityFor(isoDate, hallId, existing) {
  if (isPast(isoDate)) return "past";
  if (isPrebooked(isoDate, hallId)) return "booked";
  const taken = (existing || []).some(
    (b) => b.date === isoDate && b.hallId === hallId && b.status !== "cancelled",
  );
  return taken ? "booked" : "available";
}

/* ------------------------------------------------------------------ */
/* Quoting                                                             */
/* ------------------------------------------------------------------ */

/**
 * Work out the price for a draft booking.
 * Pure function — safe to call on every keystroke.
 */
export function quote(draft) {
  const hall = HALLS.find((h) => h.id === draft.hallId);
  const pkg = PACKAGES.find((p) => p.id === draft.packageId);
  const guests = Number(draft.guests) || 0;

  const hallRent = hall ? hall.rent : 0;
  const perHead = pkg ? pkg.perHead : 0;
  const catering = perHead * guests;

  const addons = (draft.addons || [])
    .map((id) => ADDONS.find((a) => a.id === id))
    .filter(Boolean);
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

  const subtotal = hallRent + catering + addonsTotal;
  const serviceCharge = Math.round(subtotal * SERVICE_CHARGE_RATE);
  const total = subtotal + serviceCharge;

  return {
    hall,
    package: pkg,
    guests,
    hallRent,
    perHead,
    catering,
    addons,
    addonsTotal,
    subtotal,
    serviceCharge,
    serviceChargeRate: SERVICE_CHARGE_RATE,
    total,
    deposit: Math.round(total * DEPOSIT_RATE),
    depositRate: DEPOSIT_RATE,
  };
}

/* ------------------------------------------------------------------ */
/* Bookings                                                            */
/* ------------------------------------------------------------------ */

function makeReference() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TM-${year}-${rand}`;
}

export async function listBookings() {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getBooking(reference) {
  return readAll().find((b) => b.reference === reference) || null;
}

/**
 * Persist a booking request. Returns { ok, booking } or { ok: false, error }.
 * Availability is re-checked here so two tabs cannot both take a date.
 */
export async function createBooking(draft) {
  const state = await checkAvailability(draft.date, draft.hallId);
  if (state === "booked") {
    return { ok: false, error: "That date has just been taken for this hall. Please pick another." };
  }
  if (state === "past") {
    return { ok: false, error: "Please choose a date in the future." };
  }

  const pricing = quote(draft);
  const booking = {
    reference: makeReference(),
    createdAt: new Date().toISOString(),
    status: "pending",
    // Event
    eventType: draft.eventType,
    date: draft.date,
    slot: draft.slot,
    hallId: draft.hallId,
    hallName: pricing.hall?.name || "",
    guests: Number(draft.guests) || 0,
    packageId: draft.packageId,
    packageName: pricing.package?.name || "",
    addons: draft.addons || [],
    // Contact
    name: draft.name?.trim(),
    email: draft.email?.trim(),
    phone: draft.phone?.trim(),
    notes: draft.notes?.trim() || "",
    // Money, frozen at time of booking
    pricing: {
      hallRent: pricing.hallRent,
      catering: pricing.catering,
      addonsTotal: pricing.addonsTotal,
      subtotal: pricing.subtotal,
      serviceCharge: pricing.serviceCharge,
      total: pricing.total,
      deposit: pricing.deposit,
    },
  };

  const all = readAll();
  all.push(booking);
  const saved = writeAll(all);

  return {
    ok: true,
    booking,
    // The reference still works over the phone even if storage was unavailable.
    persisted: saved,
  };
}

export async function cancelBooking(reference) {
  const all = readAll();
  const target = all.find((b) => b.reference === reference);
  if (!target) return { ok: false, error: "No booking found with that reference." };
  target.status = "cancelled";
  writeAll(all);
  return { ok: true, booking: target };
}

/** Used by the calendar so it can mark the visitor's own bookings. */
export function readBookingsSync() {
  return readAll();
}

export const TIME_SLOTS = [
  { id: "lunch", label: "Lunch", time: "12:00 PM – 4:00 PM" },
  { id: "dinner", label: "Dinner", time: "7:00 PM – 12:00 AM" },
  { id: "fullday", label: "Full day", time: "11:00 AM – 12:00 AM" },
];
