/**
 * Business details. Everything here is placeholder copy — replace with the
 * real address, numbers and social links before going live.
 */
export const SITE = {
  name: "Tajdar Marquee",
  tagline: "Weddings & Events, Beautifully Hosted",
  established: 2009,
  phone: "+92 300 1234567",
  phoneHref: "tel:+923001234567",
  whatsapp: "+92 300 1234567",
  whatsappHref: "https://wa.me/923001234567",
  email: "hello@tajdarmarquee.com",
  emailHref: "mailto:hello@tajdarmarquee.com",
  address: {
    line1: "12-A Grand Avenue, Ferozepur Road",
    line2: "Gulberg III, Lahore, Punjab 54000",
    full: "12-A Grand Avenue, Ferozepur Road, Gulberg III, Lahore",
  },
  hours: [
    { days: "Monday – Thursday", time: "10:00 AM – 10:00 PM" },
    { days: "Friday – Sunday", time: "9:00 AM – 12:00 AM" },
    { days: "Public holidays", time: "By appointment" },
  ],
  // Embedded map of the placeholder area — swap the query for your address.
  mapEmbed:
    "https://www.google.com/maps?q=Gulberg%20III%2C%20Lahore%2C%20Pakistan&output=embed",
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ],
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const STATS = [
  { value: "1,200+", label: "Events hosted" },
  { value: "16", label: "Years of hosting" },
  { value: "3", label: "Halls & lawns" },
  { value: "4.9", label: "Average rating" },
];
