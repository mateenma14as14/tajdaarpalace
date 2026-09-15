import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const VARIANTS = {
  primary:
    "bg-rose-500 text-white shadow-soft hover:bg-rose-600 hover:shadow-soft-lg active:bg-rose-700",
  gold:
    "bg-gold-500 text-white shadow-soft hover:bg-gold-600 hover:shadow-soft-lg",
  outline:
    "border border-rose-300 text-rose-600 bg-white/70 hover:bg-blush-50 hover:border-rose-400",
  ghost: "text-ink-700 hover:bg-blush-50 hover:text-rose-600",
  white:
    "bg-white text-ink-900 shadow-soft hover:shadow-soft-lg hover:text-rose-600",
  onDark:
    "border border-white/60 text-white hover:bg-white hover:text-ink-900 backdrop-blur-sm",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

/**
 * Renders as <button>, <Link> (when `to` is given) or <a> (when `href` is).
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  to,
  href,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-normal tracking-[0.12em] uppercase",
    "transition-all duration-300 ease-soft disabled:opacity-50 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
