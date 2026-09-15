import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/content";
import { img } from "../../data/images";
import { Container, Section, SectionHeading } from "../ui/Section";
import Rating from "../ui/Rating";
import { cn } from "../../lib/utils";

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    setIndex((current) => (next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, paused, go]);

  const active = TESTIMONIALS[index];

  return (
    <Section tone="blush">
      <Container>
        <SectionHeading
          eyebrow="Kind words"
          title="What families tell us afterwards"
          lead="Six of the notes we have been sent since we opened. We have not edited them."
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-5xl border border-blush-200 bg-white p-8 shadow-soft sm:p-12">
            <Quote
              className="absolute right-8 top-8 h-16 w-16 text-blush-100"
              strokeWidth={1}
              aria-hidden="true"
            />

            <div className="min-h-[19rem] sm:min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Rating value={active.rating} size="md" />

                  <blockquote className="mt-5 font-display text-xl leading-relaxed text-ink-900 sm:text-2xl">
                    “{active.quote}”
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-4">
                    <img
                      src={img(active.photo, 120, 120, 70)}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-blush-200"
                    />
                    <span>
                      <span className="block text-sm text-ink-900">{active.name}</span>
                      <span className="block text-xs text-ink-400">{active.event}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white text-ink-700 shadow-soft transition-all duration-300 hover:border-rose-400 hover:text-rose-600"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    i === index ? "w-8 bg-rose-500" : "w-1.5 bg-blush-300 hover:bg-rose-300",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white text-ink-700 shadow-soft transition-all duration-300 hover:border-rose-400 hover:text-rose-600"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
