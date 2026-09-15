import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { availabilityFor, readBookingsSync } from "../../lib/bookings";
import { addMonths, cn, toISODate } from "../../lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Days to render, padded so the 1st lands under the right weekday. */
function buildMonth(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // getDay() is Sunday-first; shift so Monday is column 0.
  const lead = (first.getDay() + 6) % 7;

  const cells = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

/**
 * Month-view date picker showing which dates are still free for a given hall.
 * Booked and past dates are disabled rather than hidden, so people can see
 * how busy a month is at a glance.
 */
export default function Calendar({ value, onChange, hallId }) {
  const today = new Date();
  const [view, setView] = useState(() => (value ? new Date(`${value}T00:00:00`) : today));

  // Read once per render pass rather than per cell.
  const existing = useMemo(() => readBookingsSync(), []);
  const cells = useMemo(() => buildMonth(view), [view]);

  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const viewMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const canGoBack = viewMonth > thisMonth;
  // Bookings open twenty-four months ahead.
  const canGoForward = viewMonth < addMonths(thisMonth, 24);

  const monthLabel = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="rounded-4xl border border-cream-200 bg-white p-5 shadow-soft sm:p-6">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoBack && setView(addMonths(view, -1))}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 text-ink-700 transition-colors hover:border-rose-300 hover:text-rose-600 disabled:opacity-30 disabled:hover:border-cream-300 disabled:hover:text-ink-700"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <p aria-live="polite" className="font-display text-xl text-ink-900">
          {monthLabel}
        </p>

        <button
          type="button"
          onClick={() => canGoForward && setView(addMonths(view, 1))}
          disabled={!canGoForward}
          aria-label="Next month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 text-ink-700 transition-colors hover:border-rose-300 hover:text-rose-600 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Weekday header */}
      <div className="mt-6 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="pb-2 text-[0.6rem] uppercase tracking-[0.14em] text-ink-400"
          >
            {day.slice(0, 1)}
            <span className="hidden sm:inline">{day.slice(1)}</span>
          </span>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`pad-${i}`} aria-hidden="true" />;

          const iso = toISODate(date);
          const state = availabilityFor(iso, hallId, existing);
          const selected = value === iso;
          const disabled = state !== "available";

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={selected}
              aria-label={`${date.getDate()} ${monthLabel}${
                disabled ? ` — ${state === "past" ? "past date" : "already booked"}` : " — available"
              }`}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xl text-sm transition-all duration-200",
                selected && "bg-rose-500 text-white shadow-soft",
                !selected && state === "available" && "text-ink-900 hover:bg-blush-100",
                state === "booked" && "text-ink-400/60 line-through",
                state === "past" && "text-ink-400/40",
              )}
            >
              {date.getDate()}

              {/* Availability dot */}
              {!selected && state === "available" && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1.5 h-1 w-1 rounded-full bg-gold-400"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-cream-200 pt-4 text-[0.7rem] text-ink-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-cream-300" />
          Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Your choice
        </span>
      </div>
    </div>
  );
}
