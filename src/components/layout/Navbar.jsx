import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "../../data/site";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Solid bar once the hero image has scrolled past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Prevent the page behind the drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLight = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft",
          scrolled
            ? "border-b border-cream-200 bg-cream-50/90 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-3" aria-label={SITE.name}>
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-lg transition-colors duration-500",
                onLight
                  ? "border-gold-300 bg-white text-rose-500"
                  : "border-white/50 bg-white/10 text-white backdrop-blur-sm",
              )}
            >
              T
            </span>

            <span className="leading-none">
              <span
                className={cn(
                  "block font-display text-xl transition-colors duration-500 sm:text-2xl",
                  onLight ? "text-ink-900" : "text-white",
                )}
              >
                Tajdar
              </span>
              <span
                className={cn(
                  "block text-[0.6rem] uppercase tracking-[0.34em] transition-colors duration-500",
                  onLight ? "text-rose-500" : "text-white/75",
                )}
              >
                Marquee
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-300",
                    onLight
                      ? isActive
                        ? "text-rose-600"
                        : "text-ink-700 hover:text-rose-500"
                      : isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white",
                    isActive &&
                      "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:bg-gold-400",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className={cn(
                "hidden items-center gap-2 text-xs tracking-[0.1em] transition-colors duration-500 xl:flex",
                onLight ? "text-ink-500 hover:text-rose-500" : "text-white/80 hover:text-white",
              )}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              {SITE.phone}
            </a>

            <Button
              to="/booking"
              size="sm"
              variant={onLight ? "primary" : "onDark"}
              className="hidden sm:inline-flex"
            >
              Book a date
            </Button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                onLight
                  ? "border-cream-300 bg-white text-ink-900"
                  : "border-white/40 text-white",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream-50 lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8 pb-16">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-cream-200 py-4 font-display text-3xl transition-colors",
                        isActive ? "text-rose-500" : "text-ink-900",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-8 flex flex-col gap-3"
              >
                <Button to="/booking" size="lg">
                  Book a date
                </Button>
                <Button href={SITE.phoneHref} variant="outline" size="lg">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {SITE.phone}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
