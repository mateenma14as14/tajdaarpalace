import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Facebook, Instagram, Youtube } from "../ui/SocialIcons";
import { NAV_LINKS, SITE } from "../../data/site";
import { SERVICES } from "../../data/services";
import { Container } from "../ui/Section";

const ICONS = { facebook: Facebook, instagram: Instagram, youtube: Youtube };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-200">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/50 font-display text-lg text-gold-300">
                T
              </span>
              <span className="leading-none">
                <span className="block font-display text-2xl text-cream-50">Tajdar</span>
                <span className="block text-[0.6rem] uppercase tracking-[0.34em] text-gold-300">
                  Marquee
                </span>
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-cream-200/70">
              Three halls, one kitchen and a team that has hosted more than twelve
              hundred celebrations since {SITE.established}.
            </p>

            <div className="mt-6 flex gap-3">
              {SITE.socials.map((social) => {
                const Icon = ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200/20 text-cream-200/70 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.24em] text-gold-300">Explore</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream-200/70 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/booking" className="text-gold-300 transition-colors hover:text-gold-200">
                  Book online
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.24em] text-gold-300">Services</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-cream-200/70 transition-colors hover:text-cream-50"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.24em] text-gold-300">Visit us</h3>
            <ul className="mt-6 space-y-4 text-sm text-cream-200/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
                <a href={SITE.phoneHref} className="transition-colors hover:text-cream-50">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
                <a href={SITE.emailHref} className="transition-colors hover:text-cream-50">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
                <span>
                  {SITE.hours[0].days}
                  <br />
                  {SITE.hours[0].time}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-200/10 pt-8 text-xs text-cream-200/50 sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Photography shown is placeholder imagery from Unsplash.
          </p>
        </div>
      </Container>
    </footer>
  );
}
