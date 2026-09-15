import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import Values from "../components/home/Values";
import Testimonials from "../components/home/Testimonials";
import CTABanner from "../components/home/CTABanner";

import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import Button from "../components/ui/Button";
import { ServiceCard, HallCard, ProjectCard } from "../components/ui/Cards";

import { SERVICES, HALLS } from "../data/services";
import { PROJECTS } from "../data/projects";
import { GALLERY } from "../data/gallery";

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 3);
  const strip = GALLERY.slice(0, 10);

  return (
    <>
      <Hero />
      <Intro />

      {/* Services */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Everything under one roof"
            lead="Venue, kitchen, décor and coordination are all ours, so there is one number to call and one invoice at the end."
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.1} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Button to="/services" variant="outline" size="lg">
              All six services
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Halls */}
      <Section tone="linen">
        <Container>
          <SectionHeading
            eyebrow="The venues"
            title="Three rooms, three very different evenings"
            lead="Pick by guest count and by the feeling you want — a grand hall, an open lawn, or something small and quiet."
          />

          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {HALLS.map((hall, i) => (
              <Reveal key={hall.id} delay={i * 0.1}>
                <HallCard hall={hall} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Values tone="white" />

      {/* Projects */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Recent work"
            title="A few evenings we are proud of"
            lead="Real events from the last eighteen months, with the brief, the build and what it cost to get there."
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Button to="/projects" variant="outline" size="lg">
              See all projects
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Gallery strip — scrolls horizontally on every screen size */}
      <section className="overflow-hidden bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The gallery"
            title="Look around before you visit"
            lead="A few hundred photographs from weddings, mehndis, corporate nights and birthdays hosted here."
          />
        </Container>

        <Reveal className="no-scrollbar mt-14 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
          {strip.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group relative w-64 shrink-0 overflow-hidden rounded-4xl shadow-soft sm:w-72"
            >
              <Img
                id={item.id}
                alt={item.caption}
                width={600}
                height={750}
                className="aspect-[4/5] w-full"
                imgClassName="transition-transform duration-[900ms] ease-soft group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            </Link>
          ))}
        </Reveal>

        <Container>
          <Reveal className="mt-10 text-center">
            <Button to="/gallery" variant="outline" size="lg">
              Open the full gallery
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </Reveal>
        </Container>
      </section>

      <Testimonials />
      <CTABanner />
    </>
  );
}
