import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { img } from "../../data/images";

/**
 * Full-screen image viewer.
 *
 * `items` is [{ id, caption }]. `index` is null when closed. Arrow keys and
 * Escape are wired up, the page behind is locked, and focus is moved to the
 * close button so keyboard users are not left behind on the page.
 */
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const closeRef = useRef(null);
  const open = index !== null && index !== undefined;
  const count = items.length;

  const step = useCallback(
    (delta) => {
      if (!open) return;
      onIndexChange((index + delta + count) % count);
    },
    [open, index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  const current = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink-900/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || "Image viewer"}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              {index + 1} / {count}
            </span>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Image — clicking the backdrop closes, clicking the image does not */}
          <div
            className="flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
            onClick={onClose}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={img(current.id, 1600, 1100, 82)}
                alt={current.caption || ""}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full rounded-3xl object-contain shadow-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Caption */}
          {current.caption && (
            <p className="px-8 pb-6 text-center text-sm text-white/70">
              {current.caption}
            </p>
          )}

          {/* Arrows */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
