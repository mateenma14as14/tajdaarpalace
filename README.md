# Tajdar Marquee

A marketing and online-booking site for a wedding and events marquee, built with
React 19, Vite 8, Tailwind CSS 4 and React Router 7.

All copy, prices and photographs are **placeholders**. See
[Making it yours](#making-it-yours) for the three files you need to edit.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script            | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                           |
| `npm run build`   | Production build into `dist/`                                        |
| `npm run preview` | Serve the production build locally                                   |
| `npm run smoke`   | Renders every route and exercises the booking logic; exits non-zero on failure |

## Pages

| Route              | Page      | Notes                                                        |
| ------------------ | --------- | ------------------------------------------------------------ |
| `/`                | Home      | Hero, intro, services, halls, projects, gallery strip, reviews |
| `/about`           | About     | Story, milestone timeline, values, team                       |
| `/services`        | Services  | Six services, three halls, catering packages, add-ons, FAQ    |
| `/projects`        | Projects  | Filterable case-study grid                                    |
| `/projects/:slug`  | Project   | Full write-up, photo grid with lightbox, prev/next            |
| `/gallery`         | Gallery   | Masonry grid, category filters, load-more, lightbox           |
| `/booking`         | Booking   | Four-step wizard with availability calendar and live quote    |
| `/contact`         | Contact   | Validated enquiry form, opening hours, embedded map           |
| anything else      | 404       |                                                               |

## How the booking flow works

1. **Event** — event type, hall, date, sitting. The calendar shows which dates are
   free for the selected hall; picking a different hall clears a date that is not
   available there.
2. **Guests & menu** — guest count (validated against the hall's minimum and
   capacity), catering package, optional extras.
3. **Your details** — name, email and phone, all validated.
4. **Review** — full summary and a confirmation checkbox, then a booking
   reference like `TM-2026-K4M2P`.

The quote panel recalculates on every change: hall rent + (per head × guests) +
extras, then a 5% service charge, with a 25% deposit shown separately. No payment
is taken.

### Where the data lives

Bookings are saved to `localStorage`, so the whole flow can be demonstrated with
no server. Everything that touches storage is in
[`src/lib/bookings.js`](src/lib/bookings.js) — **no component reads storage
directly**, and every exported function is already `async`.

To move to a real backend, replace the bodies of `listBookings`, `getBooking`,
`createBooking`, `cancelBooking` and `checkAvailability` with `fetch()` calls.
Nothing else in the app needs to change.

Two things to be aware of before launch:

- `isPrebooked()` fakes a realistic availability calendar from a hash of the
  date. Swap it for a real availability endpoint.
- The contact form and the booking form do not send anything anywhere yet. The
  submit handlers are marked with a comment showing where the request belongs.

## Making it yours

Almost everything is data-driven. In most cases you edit a data file, not a
component.

| To change…                                   | Edit                                   |
| -------------------------------------------- | -------------------------------------- |
| Name, phone, email, address, hours, socials   | `src/data/site.js`                     |
| Services, halls, catering packages, add-ons   | `src/data/services.js`                 |
| Past events shown under Projects              | `src/data/projects.js`                 |
| Gallery photos and their categories           | `src/data/gallery.js`                  |
| Testimonials, team, timeline, FAQs            | `src/data/content.js`                  |
| Every photograph on the site                  | `src/data/images.js`                   |
| Colours, fonts, shadows, radii                | `src/index.css` (the `@theme` block)   |

### Swapping the photographs

Placeholders are free Unsplash photos loaded from their CDN, referenced by photo
id. To use your own pictures, put the files in `public/images/` and replace the
ids in `src/data/images.js` with paths:

```js
export const PHOTO = {
  heroHall: "/images/grand-hall.jpg",
  // …
};
```

`img()` passes an Unsplash id through their resizing API; a value starting with
`/` is used as-is, so both styles work side by side while you migrate.

### The map

`SITE.mapEmbed` in `src/data/site.js` is a Google Maps embed URL. Replace the
`q=` parameter with your address.

## Project structure

```
src/
  components/
    booking/     Calendar, Stepper, QuoteSummary
    gallery/     Lightbox
    home/        Hero, Intro, Values, Testimonials, CTABanner
    layout/      Navbar, Footer, PageHero, ScrollToTop, WhatsAppButton
    ui/          Button, Section, Reveal, Img, Form, Cards, Accordion, …
  data/          All site content (see the table above)
  lib/
    bookings.js  Booking storage, availability and quoting
    utils.js     Currency, dates, validation
  pages/         One file per route
smoke/           Server-render + logic checks (npm run smoke)
```

## Notes

- Pages other than Home are lazy-loaded, so the first visit downloads roughly
  100 kB gzipped rather than the whole site.
- Animations respect `prefers-reduced-motion`.
- The navbar is transparent over each page's hero image and turns solid on
  scroll; the mobile drawer locks background scrolling.
- The lightbox supports arrow keys and Escape, and moves focus to its close
  button when opened.

## Private preview (password lock)

Until launch, every visitor sees a password screen
([src/components/PreviewGate.jsx](src/components/PreviewGate.jsx)); the site
itself only downloads after the correct password is entered, and each browser
stays unlocked afterwards.

- **Launch:** set `PREVIEW_LOCK = false` in `PreviewGate.jsx` and delete the
  `noindex, nofollow` robots tag from `index.html`.
- **Change the password:** replace `PASSWORD_SHA256` with the hash printed by
  `node -e "console.log(require('crypto').createHash('sha256').update('new-password').digest('hex'))"`.

The check runs in the browser, so it keeps casual visitors and search engines
out but is not real security. Don't put anything confidential behind it.

## Deploying

The build output in `dist/` is static. On any host, add a rewrite so unknown
paths serve `index.html` — otherwise refreshing `/booking` will 404.

- **Netlify** — add `public/_redirects` containing `/*  /index.html  200`
- **Vercel** — detected automatically for Vite projects
- **Apache/Nginx** — point all non-file requests at `index.html`
