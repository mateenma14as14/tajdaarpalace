import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

/** Horizontal progress indicator for the booking wizard. */
export default function Stepper({ steps, current, onJump }) {
  return (
    <ol className="flex items-center justify-between gap-1 sm:gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = done && typeof onJump === "function";

        return (
          <li key={step} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJump(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-full transition-opacity sm:gap-3",
                clickable ? "cursor-pointer hover:opacity-80" : "cursor-default",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs transition-all duration-400",
                  done && "border-rose-500 bg-rose-500 text-white",
                  active && "border-rose-500 bg-white text-rose-600 ring-4 ring-blush-100",
                  !done && !active && "border-cream-300 bg-white text-ink-400",
                )}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : i + 1}
              </span>

              <span
                className={cn(
                  "hidden whitespace-nowrap text-xs uppercase tracking-[0.14em] md:inline",
                  active ? "text-ink-900" : "text-ink-400",
                )}
              >
                {step}
              </span>
            </button>

            {/* Connector */}
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px flex-1 transition-colors duration-500",
                  done ? "bg-rose-300" : "bg-cream-300",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
