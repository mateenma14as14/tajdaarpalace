import { Check, Star } from "lucide-react";

import PageHero from "../components/layout/PageHero";
import CTABanner from "../components/home/CTABanner";

import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { ServiceCard, HallCard } from "../components/ui/Cards";
import Accordion from "../components/ui/Accordion";

import { SERVICES, HALLS, PACKAGES, ADDONS } from "../data/services";
import { FAQS } from "../data/content";
import { PHOTO } from "../data/images";
import { cn, money } from "../lib/utils";

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title="Venue, kitchen, décor and coordination"
        lead="Six services, all delivered by our own staff. Mix them however you like — most families take the venue, catering and décor together."
        photo={PHOTO.serviceDecor}
      />

      {/* Services grid */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Six things we do, and do ourselves"
            lead="Prices below are starting figures for a typical booking. Your quote will be itemised and fixed before you pay anything."
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.1} className="h-full">
                <ServiceCard service={service} id={service.slug} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Venues */}
      <Section tone="white" id="venues">
        <Container>
          <SectionHeading
            eyebrow="The venues"
            title="Choose your room"
            lead="Capacities are seated with a stage in place. Standing receptions take roughly a third more."
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

      {/* Catering packages */}
      <Section tone="blush" id="packages">
        <Container>
          <SectionHeading
            eyebrow="Catering"
            title="Three menus, priced per head"
            lead="Every package includes service staff, crockery, linen and soft drinks. Tastings are complimentary once your date is confirmed."
          />

          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-4xl border bg-white p-8 transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg",
                    pkg.popular
                      ? "border-rose-300 shadow-soft-lg lg:-mt-4 lg:pb-12"
                      : "border-cream-200 shadow-soft",
                  )}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-rose-500 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-white shadow-soft">
                      <Star className="h-3 w-3 fill-current" strokeWidth={0} />
                      Most booked
                    </span>
                  )}

                  <h3 className="font-display text-3xl">{pkg.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{pkg.blurb}</p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl text-rose-600">
                      {money(pkg.perHead)}
                    </span>
                    <span className="text-sm text-ink-400">per head</span>
                  </p>

                  <ul className="mt-7 flex-1 space-y-3 border-t border-cream-200 pt-7">
                    {pkg.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={2} />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <Button
                    to="/booking"
                    variant={pkg.popular ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    Book {pkg.name}
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Add-ons */}
          <Reveal className="mx-auto mt-16 max-w-3xl rounded-4xl border border-blush-200 bg-white p-8 shadow-soft sm:p-10">
            <h3 className="text-center text-2xl">Optional extras</h3>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-ink-500">
              Add any of these during booking. They appear on your quote straight away.
            </p>

            <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-cream-300 pb-3"
                >
                  <dt className="text-sm text-ink-700">{addon.label}</dt>
                  <dd className="shrink-0 text-sm text-rose-600">{money(addon.price)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream" id="faq">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions we get asked most"
            lead="If yours is not here, call us — someone will answer."
          />

          <Reveal className="mt-12">
            <Accordion items={FAQS} />
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        eyebrow="Next step"
        title="Build your quote in three minutes"
        lead="Pick a hall, a date and a package and the total updates as you go. No payment is taken online."
      />
    </>
  );
}
