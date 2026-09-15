import { motion } from "framer-motion";
import { CalendarDays, ArrowDown } from "lucide-react";
import { img, PHOTO } from "../../data/images";
import { SITE, STATS } from "../../data/site";
import { Container } from "../ui/Section";
import Button from "../ui/Button";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-12">
      {/* Background photo with a slow drift so the hero never feels static */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <img
          src={img(PHOTO.heroHall, 1920, 1280, 76)}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Warm scrim — blush at the edges, deeper at the base */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 via-ink-900/40 to-ink-900/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(43_37_35/0.55)_100%)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[0.7rem] uppercase tracking-[0.34em] text-gold-300"
          >
            Est. {SITE.established} · Lahore
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="rule-gold mt-5 text-gold-300"
            aria-hidden="true"
          >
            ✦
          </motion.div>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 text-[2.75rem] leading-[1.05] text-balance text-white sm:text-6xl md:text-7xl"
          >
            Where your day
            <span className="mt-1 block italic text-blush-200">becomes a memory</span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Three halls, our own kitchen and a coordinator who stays with you from
            the first walk-through to the last guest leaving. Check your date and
            book it online in a few minutes.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button to="/booking" size="lg" className="w-full sm:w-auto">
              <CalendarDays className="h-4 w-4" strokeWidth={1.5} />
              Check your date
            </Button>
            <Button to="/gallery" variant="onDark" size="lg" className="w-full sm:w-auto">
              View the gallery
            </Button>
          </motion.div>
        </div>

        {/* Stats plate */}
        <motion.dl
          variants={fade}
          initial="hidden"
          animate="show"
          custom={4}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-4xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/5 px-4 py-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>

      {/* Scroll cue */}
      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/70 transition-colors hover:border-white hover:text-white md:flex"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
