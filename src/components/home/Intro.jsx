import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PHOTO } from "../../data/images";
import { Container, Section } from "../ui/Section";
import Reveal from "../ui/Reveal";
import Img from "../ui/Img";

/** Two overlapping photographs beside the studio introduction. */
export default function Intro() {
  return (
    <Section id="intro" tone="cream">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <Reveal className="relative">
            <Img
              id={PHOTO.aboutStory}
              alt="Guests seated in the Grand Hall"
              width={800}
              height={1000}
              className="aspect-[4/5] w-full rounded-5xl shadow-soft-lg"
            />

            <Img
              id={PHOTO.aboutDetail}
              alt="Table styling detail"
              width={500}
              height={500}
              className="absolute -bottom-8 -right-2 hidden aspect-square w-44 rounded-4xl border-4 border-cream-50 shadow-soft-lg sm:block sm:w-56 lg:-right-8"
            />

            {/* Years badge */}
            <div className="absolute -left-3 top-8 hidden rounded-3xl bg-white px-5 py-4 text-center shadow-soft-lg sm:block lg:-left-8">
              <span className="block font-display text-3xl text-rose-500">16</span>
              <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
                Years of
                <br />
                hosting
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-4 text-3xl leading-tight text-balance sm:text-4xl md:text-[2.75rem]">
                A marquee run by people who
                <span className="italic text-rose-500"> stay until the end</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-500">
                <p>
                  Tajdar started in 2009 with a single three-hundred-seat hall and a
                  kitchen that could just about keep up. Sixteen years later there are
                  three venues on the same site — but the kitchen is still ours, and
                  the person who shows you around on your first visit is the same one
                  standing at the door on the night.
                </p>
                <p>
                  We do not subcontract catering, décor or coordination. That is the
                  whole reason we can offer tastings, change a menu a fortnight out,
                  and promise a programme that runs to the minute.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { k: "1,200+", v: "Events hosted since 2009" },
                  { k: "40 mins", v: "Average service time for 700 guests" },
                ].map((item) => (
                  <div key={item.k} className="border-l-2 border-gold-300 pl-4">
                    <span className="block font-display text-2xl text-ink-900">
                      {item.k}
                    </span>
                    <span className="mt-1 block text-sm text-ink-400">{item.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                to="/about"
                className="mt-9 inline-flex items-center gap-2 border-b border-rose-300 pb-1 text-xs uppercase tracking-[0.2em] text-rose-600 transition-colors hover:border-rose-500 hover:text-rose-700"
              >
                Read our story
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
