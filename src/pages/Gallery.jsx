import { useMemo, useState } from "react";
import { Expand } from "lucide-react";

import PageHero from "../components/layout/PageHero";
import CTABanner from "../components/home/CTABanner";
import Lightbox from "../components/gallery/Lightbox";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import Button from "../components/ui/Button";

import { GALLERY, GALLERY_CATEGORIES } from "../data/gallery";
import { PHOTO } from "../data/images";
import { cn } from "../lib/utils";

const PAGE_SIZE = 12;

/** Masonry columns need a set aspect per tile to pack nicely. */
const ASPECT = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  default: "aspect-square",
};

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () =>
      category === "All" ? GALLERY : GALLERY.filter((item) => item.category === category),
    [category],
  );

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  function selectCategory(next) {
    setCategory(next);
    setShown(PAGE_SIZE); // reset paging whenever the filter changes
  }

  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Photographs"
        title="Look around the marquee"
        lead="Weddings, mehndis, corporate nights and birthdays, all photographed on this site. Click any photograph to open it full size."
        photo={PHOTO.heroTable}
      />

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title={`${GALLERY.length} photographs, filtered however you like`}
            lead="These are placeholder images for now — swap them for your own by editing one file."
          />

          {/* Category filters */}
          <Reveal className="mt-12 flex flex-wrap justify-center gap-2.5">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = cat === category;
              const count =
                cat === "All"
                  ? GALLERY.length
                  : GALLERY.filter((g) => g.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCategory(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.14em] transition-all duration-300 ease-soft",
                    isActive
                      ? "border-rose-500 bg-rose-500 text-white shadow-soft"
                      : "border-cream-300 bg-white text-ink-700 hover:border-rose-300 hover:text-rose-600",
                  )}
                >
                  {cat}
                  <span className={cn("text-[0.65rem]", isActive ? "text-white/70" : "text-ink-400")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </Reveal>

          {/* Masonry */}
          <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
            {visible.map((item, i) => (
              <div key={item.id + i} className="mb-5 break-inside-avoid">
                <Reveal delay={(i % 4) * 0.05}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group relative block w-full overflow-hidden rounded-4xl shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    <Img
                      id={item.id}
                      alt={item.caption}
                      width={700}
                      height={700}
                      className={cn("w-full", ASPECT[item.span] || ASPECT.default)}
                      imgClassName="transition-transform duration-[900ms] ease-soft group-hover:scale-105"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <span className="absolute right-4 top-4 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="h-4 w-4" strokeWidth={1.5} />
                    </span>

                    <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-gold-300">
                        {item.category}
                      </span>
                      <span className="mt-1 block">{item.caption}</span>
                    </span>
                  </button>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Paging */}
          <div className="mt-12 text-center">
            <p className="text-sm text-ink-400">
              Showing {visible.length} of {filtered.length} photographs
            </p>

            {hasMore && (
              <Button
                variant="outline"
                size="lg"
                className="mt-6"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
              >
                Load more
              </Button>
            )}
          </div>
        </Container>
      </Section>

      <CTABanner
        eyebrow="See it properly"
        title="Photographs only go so far"
        lead="Book a walk-through and see the halls dressed. Most visits take about forty minutes."
      />

      <Lightbox
        items={visible}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </>
  );
}
