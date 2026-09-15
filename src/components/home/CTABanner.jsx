import { CalendarDays, Phone } from "lucide-react";
import { img, PHOTO } from "../../data/images";
import { SITE } from "../../data/site";
import { Container } from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

/** Full-bleed closing call to action used at the foot of most pages. */
export default function CTABanner({
  eyebrow = "Ready when you are",
  title = "Let us hold your date",
  lead = "Check availability, choose a hall and a menu, and send your booking request in about three minutes. We confirm within 24 hours.",
}) {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <img
        src={img(PHOTO.heroTable, 1920, 900, 70)}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink-900/78"
      />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-300">{eyebrow}</p>
          <div className="rule-gold mt-4 text-gold-400" aria-hidden="true">✦</div>

          <h2 className="mt-5 text-3xl leading-tight text-balance text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
            {lead}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button to="/booking" size="lg" className="w-full sm:w-auto">
              <CalendarDays className="h-4 w-4" strokeWidth={1.5} />
              Book online
            </Button>
            <Button href={SITE.phoneHref} variant="onDark" size="lg" className="w-full sm:w-auto">
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              {SITE.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
