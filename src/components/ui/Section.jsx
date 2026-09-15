import { cn } from "../../lib/utils";
import Reveal from "./Reveal";

export function Container({ className, children, ...props }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props}>
      {children}
    </div>
  );
}

/** A vertical page band. `tone` picks the background. */
export function Section({ tone = "cream", className, children, id, ...props }) {
  const tones = {
    cream: "bg-cream-50",
    white: "bg-white",
    blush: "bg-blush-50",
    linen: "bg-cream-100",
    ink: "bg-ink-900 text-cream-100",
  };

  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", tones[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Eyebrow + heading + optional lead paragraph, with a gold rule between the
 * eyebrow and the title. `align` controls centring.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  onDark = false,
  className,
}) {
  const centred = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centred && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", onDark && "text-gold-300")}>{eyebrow}</p>
      )}

      {eyebrow && centred && <div className="rule-gold mt-4" aria-hidden="true">✦</div>}

      <h2
        className={cn(
          "mt-4 text-3xl leading-tight text-balance sm:text-4xl md:text-[2.75rem]",
          onDark && "text-cream-50",
        )}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-ink-500",
            onDark && "text-cream-200/80",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export default Section;
