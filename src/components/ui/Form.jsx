import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const CONTROL =
  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink-900 " +
  "placeholder:text-ink-400 transition-colors duration-200 " +
  "focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-blush-100";

/** Label + control + error/hint wrapper. */
export function Field({ label, hint, error, required, children, className, htmlFor }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-xs uppercase tracking-[0.16em] text-ink-500"
        >
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ error, className, ...props }) {
  return (
    <input
      className={cn(CONTROL, error ? "border-rose-400" : "border-cream-300", className)}
      aria-invalid={error ? "true" : undefined}
      {...props}
    />
  );
}

export function Textarea({ error, className, rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        CONTROL,
        "resize-y leading-relaxed",
        error ? "border-rose-400" : "border-cream-300",
        className,
      )}
      aria-invalid={error ? "true" : undefined}
      {...props}
    />
  );
}

export function Select({ error, className, options = [], placeholder, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          CONTROL,
          "appearance-none pr-10",
          error ? "border-rose-400" : "border-cream-300",
          !props.value && placeholder ? "text-ink-400" : "",
          className,
        )}
        aria-invalid={error ? "true" : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400"
      >
        ▾
      </span>
    </div>
  );
}

/** A large, tappable checkbox rendered as a card — used for booking add-ons. */
export function CheckboxCard({ checked, onChange, title, subtitle, className }) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-4 transition-all duration-300 ease-soft",
        checked
          ? "border-rose-300 bg-blush-50 shadow-soft"
          : "border-cream-300 hover:border-blush-300 hover:bg-blush-50/50",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <span
        aria-hidden="true"
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors",
          checked ? "border-rose-500 bg-rose-500 text-white" : "border-cream-300 bg-white",
        )}
      >
        {checked && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm text-ink-900">{title}</span>
        {subtitle && <span className="block text-xs text-ink-400">{subtitle}</span>}
      </span>
    </label>
  );
}
