import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Users, MapPin, Check } from "lucide-react";

import PageHero from "../components/layout/PageHero";
import CTABanner from "../components/home/CTABanner";
import Lightbox from "../components/gallery/Lightbox";
import { Container, Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import Button from "../components/ui/Button";

import { PROJECTS, getProject } from "../data/projects";
import { formatDate } from "../lib/utils";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(null);

  // Unknown slug — send people to the list rather than a dead end.
  if (!project) return <Navigate to="/projects" replace />;

  const position = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(position - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(position + 1) % PROJECTS.length];

  const photos = project.gallery.map((id) => ({ id, caption: project.title }));

  const facts = [
    { icon: Calendar, label: "Date", value: formatDate(project.date) },
    { icon: Users, label: "Guests", value: `${project.guests} seated` },
    { icon: MapPin, label: "Venue", value: project.hall },
  ];

  return (
    <>
      <PageHero
        crumb={project.title}
        eyebrow={project.eventType}
        title={project.title}
        lead={project.excerpt}
        photo={project.cover}
      />

      {/* Facts + story */}
      <Section tone="cream">
        <Container>
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center gap-4 rounded-4xl border border-cream-200 bg-white p-6 shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-50 text-rose-500">
                  <fact.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
                    {fact.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-ink-900">
                    {fact.value}
                  </span>
                </span>
              </div>
            ))}
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">The story</p>
                <h2 className="mt-4 text-3xl leading-tight text-balance sm:text-4xl">
                  {project.subtitle}
                </h2>
              </Reveal>

              <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-500">
                {project.story.map((para, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="rounded-4xl border border-blush-200 bg-blush-50 p-8">
                <h3 className="text-xl">What we built</h3>

                <ul className="mt-6 space-y-3.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={2} />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2 border-t border-blush-200 pt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 text-[0.7rem] tracking-wide text-rose-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button to="/booking" className="mt-8 w-full">
                  Plan something similar
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Photos */}
      <Section tone="white">
        <Container>
          <Reveal>
            <p className="eyebrow">Photographs</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">From the night</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <Reveal key={photo.id + i} delay={(i % 3) * 0.06}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open photograph ${i + 1}`}
                  className="group block w-full overflow-hidden rounded-4xl shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <Img
                    id={photo.id}
                    alt=""
                    width={700}
                    height={560}
                    className="aspect-[5/4] w-full"
                    imgClassName="transition-transform duration-[900ms] ease-soft group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Prev / next */}
      <Section tone="cream" className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 border-y border-cream-300 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 text-left"
            >
              <ArrowLeft
                className="h-4 w-4 shrink-0 text-rose-500 transition-transform group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
                  Previous
                </span>
                <span className="mt-0.5 block font-display text-lg text-ink-900 group-hover:text-rose-600">
                  {prev.title}
                </span>
              </span>
            </Link>

            <Link
              to="/projects"
              className="text-center text-xs uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-rose-600"
            >
              All projects
            </Link>

            <Link
              to={`/projects/${next.slug}`}
              className="group flex items-center justify-end gap-3 text-right"
            >
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
                  Next
                </span>
                <span className="mt-0.5 block font-display text-lg text-ink-900 group-hover:text-rose-600">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-rose-500 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Container>
      </Section>

      <CTABanner />

      <Lightbox
        items={photos}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </>
  );
}
