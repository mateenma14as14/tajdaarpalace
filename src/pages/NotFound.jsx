import { Home, CalendarDays } from "lucide-react";
import { Container } from "../components/ui/Section";
import Button from "../components/ui/Button";
import { img, PHOTO } from "../data/images";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-32">
      <img
        src={img(PHOTO.heroTable, 1600, 1000, 65)}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-900/82" />

      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl text-gold-300 sm:text-8xl">404</p>
          <div className="rule-gold mt-6 text-gold-400" aria-hidden="true">✦</div>

          <h1 className="mt-6 text-3xl text-white sm:text-4xl">
            This page has left the party
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/75">
            The link may be old, or the page may have moved. Everything else is
            still where you left it.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/" size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4" strokeWidth={1.5} />
              Back home
            </Button>
            <Button to="/booking" variant="onDark" size="lg" className="w-full sm:w-auto">
              <CalendarDays className="h-4 w-4" strokeWidth={1.5} />
              Book a date
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
