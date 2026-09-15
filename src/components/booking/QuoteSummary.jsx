import { Info } from "lucide-react";
import { TIME_SLOTS } from "../../lib/bookings";
import { formatDate, money } from "../../lib/utils";

function Row({ label, sub, value, muted }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="min-w-0">
        <span className={muted ? "text-sm text-ink-400" : "text-sm text-ink-700"}>
          {label}
        </span>
        {sub && <span className="block text-xs text-ink-400">{sub}</span>}
      </span>
      <span className="shrink-0 text-sm text-ink-900">{value}</span>
    </div>
  );
}

/**
 * Live running total. Recalculates on every change so nothing about the price
 * is a surprise at the end.
 */
export default function QuoteSummary({ draft, pricing, className }) {
  const slot = TIME_SLOTS.find((s) => s.id === draft.slot);
  const hasAnything = pricing.hall || pricing.package || pricing.addonsTotal > 0;

  return (
    <aside className={className}>
      <div className="rounded-4xl border border-blush-200 bg-blush-50 p-6 sm:p-7">
        <h3 className="font-display text-2xl">Your quote</h3>
        <p className="mt-1 text-xs text-ink-400">Updates as you choose</p>

        {!hasAnything ? (
          <p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-ink-500">
            Pick a hall and a menu and the running total will appear here.
          </p>
        ) : (
          <>
            {/* What has been chosen */}
            <dl className="mt-6 space-y-1 border-t border-blush-200 pt-4">
              {draft.eventType && <Row label="Event" value={draft.eventType} muted />}
              {draft.date && <Row label="Date" value={formatDate(draft.date)} muted />}
              {slot && <Row label="Sitting" value={slot.label} sub={slot.time} muted />}
            </dl>

            {/* Money */}
            <dl className="mt-4 space-y-1 border-t border-blush-200 pt-4">
              {pricing.hall && (
                <Row
                  label={pricing.hall.name}
                  sub="Hall rent"
                  value={money(pricing.hallRent)}
                />
              )}

              {pricing.package && pricing.guests > 0 && (
                <Row
                  label={`${pricing.package.name} menu`}
                  sub={`${pricing.guests} guests × ${money(pricing.perHead)}`}
                  value={money(pricing.catering)}
                />
              )}

              {pricing.addons.map((addon) => (
                <Row key={addon.id} label={addon.label} value={money(addon.price)} />
              ))}
            </dl>

            <dl className="mt-4 space-y-1 border-t border-blush-200 pt-4">
              <Row label="Subtotal" value={money(pricing.subtotal)} muted />
              <Row
                label={`Service charge (${Math.round(pricing.serviceChargeRate * 100)}%)`}
                value={money(pricing.serviceCharge)}
                muted
              />
            </dl>

            <div className="mt-4 flex items-baseline justify-between gap-4 border-t-2 border-rose-200 pt-4">
              <span className="text-sm uppercase tracking-[0.14em] text-ink-700">
                Total
              </span>
              <span className="font-display text-3xl text-rose-600">
                {money(pricing.total)}
              </span>
            </div>

            <div className="mt-5 flex gap-3 rounded-2xl bg-white p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
              <p className="text-xs leading-relaxed text-ink-500">
                A {Math.round(pricing.depositRate * 100)}% deposit of{" "}
                <strong className="font-normal text-ink-900">
                  {money(pricing.deposit)}
                </strong>{" "}
                confirms the date. Nothing is charged online — we will call to arrange it.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
