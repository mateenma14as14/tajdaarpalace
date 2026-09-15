import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Single-open accordion. `items` is [{ q, a }].
 * Buttons carry aria-expanded and control the panel by id.
 */
export default function Accordion({ items, className }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={cn("divide-y divide-cream-300 border-y border-cream-300", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-rose-600"
              >
                <span className="font-display text-lg leading-snug text-ink-900 sm:text-xl">
                  {item.q}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-soft",
                    isOpen
                      ? "rotate-45 border-rose-400 bg-rose-500 text-white"
                      : "border-cream-300 bg-white text-ink-500",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-12 text-sm leading-relaxed text-ink-500">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
