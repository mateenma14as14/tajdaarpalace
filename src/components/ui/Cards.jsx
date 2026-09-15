import { Link } from "react-router-dom";
import { ArrowUpRight, Users, Check } from "lucide-react";
import Img from "./Img";
import Icon from "../../lib/icons";
import { cn, money, formatDate } from "../../lib/utils";

/** Service tile — icon, title, blurb, price and a feature list. */
export function ServiceCard({ service, id }) {
  return (
    <article
      id={id}
      className="group flex h-full flex-col overflow-hidden rounded-4xl border border-cream-200 bg-white shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Img
          id={service.photo}
          alt={service.title}
          width={800}
          height={600}
          className="h-full w-full"
          imgClassName="transition-transform duration-[900ms] ease-soft group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-rose-500 shadow-soft backdrop-blur-sm">
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{service.summary}</p>

        <ul className="mt-5 space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={2} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-cream-200 pt-5">
          <span>
            <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">
              From
            </span>
            <span className="font-display text-2xl text-rose-600">
              {money(service.from)}
            </span>
            <span className="ml-1 text-xs text-ink-400">{service.unit}</span>
          </span>

          <Link
            to="/booking"
            className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-rose-600"
          >
            Enquire
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Venue tile — photo, capacity, rent and highlights. */
export function HallCard({ hall, className }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-4xl border border-cream-200 bg-white shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img
          id={hall.photo}
          alt={hall.name}
          width={900}
          height={563}
          className="h-full w-full"
          imgClassName="transition-transform duration-[900ms] ease-soft group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-900/55 to-transparent"
        />
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs text-ink-900 shadow-soft backdrop-blur-sm">
          <Users className="h-3.5 w-3.5 text-rose-500" strokeWidth={1.5} />
          Up to {hall.capacity} guests
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="text-2xl">{hall.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{hall.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {hall.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-blush-50 px-3 py-1 text-[0.7rem] tracking-wide text-rose-600"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5">
          <span className="text-sm text-ink-500">
            Hall rent from{" "}
            <strong className="font-normal text-ink-900">{money(hall.rent)}</strong>
          </span>
          <Link
            to="/booking"
            className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-rose-600 transition-colors hover:text-rose-700"
          >
            Book
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Project tile — full-bleed cover with the detail revealed on hover. */
export function ProjectCard({ project, className }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-4xl shadow-soft transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-soft-lg",
        className,
      )}
    >
      <Img
        id={project.cover}
        alt={project.title}
        width={900}
        height={1100}
        className="aspect-[4/5] w-full"
        imgClassName="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.06]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-2xl text-white sm:text-[1.75rem]">{project.title}</h3>
        <p className="mt-1 text-sm italic text-blush-200">{project.subtitle}</p>

        <div className="mt-4 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.14em] text-white/60">
          <span>{formatDate(project.date, { day: undefined })}</span>
          <span aria-hidden="true">·</span>
          <span>{project.guests} guests</span>
        </div>

        {/* Slides up on hover, always visible on touch devices */}
        <span className="mt-4 flex max-h-0 items-center gap-1.5 overflow-hidden text-xs uppercase tracking-[0.16em] text-gold-300 opacity-0 transition-all duration-500 ease-soft group-hover:max-h-10 group-hover:opacity-100 group-focus-visible:max-h-10 group-focus-visible:opacity-100">
          Read the story
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
