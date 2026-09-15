import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Img from "../ui/Img";
import { Container } from "../ui/Section";

/**
 * Shared header for interior pages: a full-bleed photo, a dark scrim and the
 * page title. Keeps the transparent navbar readable on every route.
 */
export default function PageHero({ eyebrow, title, lead, photo, crumb }) {
  return (
    <header className="relative isolate flex min-h-[58vh] items-end overflow-hidden pt-28 pb-16 sm:min-h-[62vh] sm:pb-20">
      <Img
        id={photo}
        alt=""
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 -z-10 h-full w-full"
      />

      {/* Scrim: darker at the bottom so the title always has contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/85 via-ink-900/45 to-ink-900/35"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/60"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={2} />
            <span className="text-gold-300">{crumb || title}</span>
          </nav>

          {eyebrow && (
            <p className="mt-8 text-[0.7rem] uppercase tracking-[0.28em] text-gold-300">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-4 text-4xl leading-[1.1] text-balance text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {lead && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              {lead}
            </p>
          )}
        </motion.div>
      </Container>
    </header>
  );
}
