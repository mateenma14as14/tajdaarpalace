import { PHOTO } from "./images";

/** Prices are placeholder figures in PKR. */
export const SERVICES = [
  {
    slug: "weddings",
    icon: "heart",
    title: "Weddings & Barat",
    summary:
      "Mehndi, barat and walima hosted end to end — staging, seating, lighting and a coordinator who stays with you all evening.",
    from: 285000,
    unit: "per event",
    photo: PHOTO.serviceWedding,
    features: [
      "Dedicated wedding coordinator",
      "Bridal room & groom's lounge",
      "Stage, aisle and mandap styling",
      "Guest valet parking for 200 cars",
    ],
  },
  {
    slug: "catering",
    icon: "utensils",
    title: "In-house Catering",
    summary:
      "Desi, continental and BBQ menus cooked on site by our own kitchen, with live counters and tastings before you commit.",
    from: 1850,
    unit: "per head",
    photo: PHOTO.serviceCatering,
    features: [
      "Complimentary menu tasting",
      "Live BBQ & chaat counters",
      "Vegetarian and Jain menus",
      "Uniformed service staff",
    ],
  },
  {
    slug: "decor",
    icon: "sparkles",
    title: "Décor & Staging",
    summary:
      "Floral installations, fairy-light canopies and custom stage sets built to a moodboard you sign off on beforehand.",
    from: 120000,
    unit: "per setup",
    photo: PHOTO.serviceDecor,
    features: [
      "Fresh and imported florals",
      "Custom stage backdrops",
      "Architectural & mood lighting",
      "Entrance and walkway styling",
    ],
  },
  {
    slug: "corporate",
    icon: "briefcase",
    title: "Corporate Events",
    summary:
      "Conferences, product launches, dinners and award nights with AV, stage management and branded signage handled in house.",
    from: 195000,
    unit: "per event",
    photo: PHOTO.serviceCorporate,
    features: [
      "Projection, LED wall & sound",
      "Theatre, cabaret or banquet layouts",
      "Registration desk & branding",
      "High-speed Wi-Fi for guests",
    ],
  },
  {
    slug: "private-parties",
    icon: "cake",
    title: "Birthdays & Private Parties",
    summary:
      "Smaller celebrations in the Royal Hall — birthdays, aqiqah, engagements and anniversaries, styled just as carefully.",
    from: 85000,
    unit: "per event",
    photo: PHOTO.serviceBirthday,
    features: [
      "Themed décor packages",
      "Custom cakes & dessert tables",
      "Kids' play corner",
      "Sound system and DJ",
    ],
  },
  {
    slug: "photography",
    icon: "camera",
    title: "Photography & Film",
    summary:
      "Partner photographers and cinematographers who already know every good corner of the venue and its light.",
    from: 150000,
    unit: "per event",
    photo: PHOTO.servicePhotography,
    features: [
      "Two photographers & one filmer",
      "Same-day highlight reel",
      "Drone coverage of the lawn",
      "Online gallery within 21 days",
    ],
  },
];

/** Halls guests choose between when booking. */
export const HALLS = [
  {
    id: "grand",
    name: "The Grand Hall",
    capacity: 800,
    minGuests: 300,
    photo: PHOTO.hallGrand,
    rent: 250000,
    blurb:
      "Our largest air-conditioned hall, with a double-height ceiling, chandeliers and a 40-foot stage.",
    highlights: ["Air conditioned", "40ft stage", "Chandelier lighting", "Separate entrance"],
  },
  {
    id: "garden",
    name: "The Garden Lawn",
    capacity: 500,
    minGuests: 150,
    photo: PHOTO.hallGarden,
    rent: 180000,
    blurb:
      "An open-air lawn framed by palms and string lights — best from October through March.",
    highlights: ["Open air", "String-light canopy", "Fountain backdrop", "Marquee cover on request"],
  },
  {
    id: "royal",
    name: "The Royal Hall",
    capacity: 300,
    minGuests: 80,
    photo: PHOTO.hallRoyal,
    rent: 110000,
    blurb:
      "An intimate hall for nikkah ceremonies, mehndi nights and family dinners.",
    highlights: ["Air conditioned", "Intimate setting", "Private lounge", "Flexible layouts"],
  },
];

/** Per-head catering packages offered in the booking flow. */
export const PACKAGES = [
  {
    id: "silver",
    name: "Silver",
    perHead: 1850,
    blurb: "A generous desi menu that covers the essentials beautifully.",
    includes: [
      "1 rice, 2 curries, 1 BBQ item",
      "Salad bar, raita & naan",
      "2 desserts",
      "Soft drinks & water",
      "Standard table linen",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    perHead: 2650,
    popular: true,
    blurb: "Our most-booked package — more BBQ, live counters and upgraded décor.",
    includes: [
      "2 rice, 3 curries, 3 BBQ items",
      "Live chaat & BBQ counters",
      "4 desserts incl. live station",
      "Welcome drinks & mocktails",
      "Upgraded centrepieces & linen",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    perHead: 3900,
    blurb: "Continental and desi side by side, with full floral styling included.",
    includes: [
      "Continental + desi buffet",
      "Live pasta, BBQ & dessert stations",
      "Premium plated starters",
      "Full floral stage & table décor",
      "Dedicated event manager",
    ],
  },
];

export const ADDONS = [
  { id: "photography", label: "Photography & film", price: 150000 },
  { id: "dj", label: "DJ & sound system", price: 45000 },
  { id: "floral", label: "Extra floral installation", price: 65000 },
  { id: "fireworks", label: "Cold pyro & sparklers", price: 35000 },
  { id: "valet", label: "Valet parking crew", price: 25000 },
  { id: "carRental", label: "Decorated car for the couple", price: 40000 },
];

export const EVENT_TYPES = [
  "Wedding / Barat",
  "Walima",
  "Mehndi",
  "Nikkah",
  "Engagement",
  "Birthday",
  "Corporate event",
  "Other",
];
