import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import PageHero from "../components/layout/PageHero";
import CTABanner from "../components/home/CTABanner";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { ProjectCard } from "../components/ui/Cards";

import { PROJECTS } from "../data/projects";
import { PHOTO } from "../data/images";
import { cn } from "../lib/utils";

/** Filter chips are derived from the tags on the projects themselves. */
function useFilters() {
  return useMemo(() => {
    const tags = new Set();
    PROJECTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }, []);
}

export default function Projects() {
  const filters = useFilters();
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Recent work"
        title="Evenings we helped put together"
        lead="Six events from the last eighteen months — the brief, what we built, and how it ran on the night."
        photo={PHOTO.heroCouple}
      />

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            title="Weddings, mehndis, corporate nights and birthdays"
            lead="Every one of these was photographed here. Filter by the kind of event you are planning."
          />

          {/* Filters */}
          <Reveal className="mt-12 flex flex-wrap justify-center gap-2.5">
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-5 py-2 text-xs uppercase tracking-[0.14em] transition-all duration-300 ease-soft",
                    isActive
                      ? "border-rose-500 bg-rose-500 text-white shadow-soft"
                      : "border-cream-300 bg-white text-ink-700 hover:border-rose-300 hover:text-rose-600",
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </Reveal>

          {/* Grid */}
          <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-16 text-center text-sm text-ink-400">
              Nothing under that filter yet.
            </p>
          )}

          <p className="mt-14 text-center text-sm text-ink-400">
            Showing {visible.length} of {PROJECTS.length} projects
          </p>
        </Container>
      </Section>

      <CTABanner
        eyebrow="Yours next"
        title="Tell us what you have in mind"
        lead="Bring a moodboard, a Pinterest board or a single photograph. We have started from less."
      />
    </>
  );
}
