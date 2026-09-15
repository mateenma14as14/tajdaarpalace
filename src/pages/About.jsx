import PageHero from "../components/layout/PageHero";
import Values from "../components/home/Values";
import Testimonials from "../components/home/Testimonials";
import CTABanner from "../components/home/CTABanner";

import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";

import { PHOTO, img } from "../data/images";
import { TIMELINE, TEAM } from "../data/content";
import { SITE, STATS } from "../data/site";

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow={`Est. ${SITE.established}`}
        title="Sixteen years of other people's best days"
        lead="We are a family-run marquee in Gulberg with three venues, one kitchen and a coordination team that does not hand you over to anyone else."
        photo={PHOTO.aboutStory}
      />

      {/* Story */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-4 text-3xl leading-tight text-balance sm:text-4xl">
                It began with one hall and a kitchen that could just about keep up
              </h2>

              <Img
                id={PHOTO.aboutDetail}
                alt="Table styling detail"
                width={800}
                height={1000}
                className="mt-10 aspect-[4/5] w-full rounded-5xl shadow-soft-lg"
              />
            </Reveal>

            <div className="space-y-5 text-base leading-relaxed text-ink-500 lg:col-span-7 lg:pt-16">
              <Reveal>
                <p>
                  In 2009 Tajdar Hussain took a lease on a three-hundred-seat hall off
                  Ferozepur Road and started taking bookings for nikkah ceremonies and
                  family dinners. There was no décor team, no lawn and no second hall —
                  just a room, a kitchen, and a promise that the food would go out hot
                  and on time.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <p>
                  That promise turned out to be the whole business. Families came back
                  for the next wedding and brought their cousins. By 2013 we had taken
                  the two acres next door and turned it into an open-air lawn, which
                  made winter our busiest season and stayed that way.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p>
                  The Grand Hall opened in 2017 with eight hundred seats and the
                  forty-foot stage we are still known for. In 2021 we brought florals
                  and staging in house, so couples could sign off a moodboard rather
                  than hope for the best on the night.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p>
                  Twelve hundred events later, the structure is the same as it was in
                  2009: our own kitchen, our own décor studio, and one named person who
                  is with you from the first visit to the last guest leaving. Nothing
                  about that is going to change.
                </p>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.3}>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream-300 pt-10 sm:grid-cols-4">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block font-display text-3xl text-rose-500">
                          {stat.value}
                        </span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-ink-400">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Milestones"
            title="How the site grew"
            lead="Five moments that changed what we could offer."
          />

          <ol className="relative mt-16 sm:ml-4">
            {/* Vertical rule */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-300 via-blush-200 to-transparent sm:block"
            />

            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08} as="li" className="relative sm:pl-12">
                <div className="pb-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 hidden h-4 w-4 rounded-full border-2 border-gold-400 bg-cream-50 sm:block"
                  />

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-3xl text-rose-500">{item.year}</span>
                    <h3 className="text-xl">{item.title}</h3>
                  </div>

                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-500">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Values tone="blush" />

      {/* Team */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people you will actually deal with"
            lead="Four names, and the ones you will meet on your first visit."
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08}>
                <article className="group text-center">
                  <div className="relative mx-auto overflow-hidden rounded-4xl shadow-soft">
                    <img
                      src={img(person.photo, 600, 700, 72)}
                      alt={person.name}
                      width={600}
                      height={700}
                      loading="lazy"
                      className="aspect-[6/7] w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-5 text-xl">{person.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-rose-500">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{person.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Testimonials />

      <CTABanner
        eyebrow="Come and see it"
        title="Walk the halls before you decide"
        lead="Visits take about forty minutes and you will meet whoever would run your event. No obligation, and no hard sell."
      />
    </>
  );
}
