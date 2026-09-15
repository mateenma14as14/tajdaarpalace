import { VALUES } from "../../data/content";
import { Container, Section, SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";
import Icon from "../../lib/icons";

/** Four reasons to book, shown as soft cards. */
export default function Values({ tone = "white" }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading
          eyebrow="Why Tajdar"
          title="Four things we will not compromise on"
          lead="Most marquees subcontract the parts that matter most. We decided early on not to, and it shapes everything else."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <article className="group h-full rounded-4xl border border-cream-200 bg-cream-50 p-7 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-blush-200 hover:bg-blush-50 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-soft transition-colors duration-500 group-hover:bg-rose-500 group-hover:text-white">
                  <Icon name={value.icon} className="h-5 w-5" strokeWidth={1.5} />
                </span>

                <h3 className="mt-6 text-xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{value.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
