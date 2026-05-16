export const guest = {
  firstName: "Andrew",
  lastName: "Mason",
  honorific: "Mr.",
  loyaltyTier: "Rosewood Asaya — Platinum",
  priorStays: 7,
  lastVisit: "Hotel Crescent Court, Dallas · Feb 2026",
};

export const stay = {
  property: "Rosewood Sand Hill",
  suite: "Hillside Suite · 214",
  arrivalISO: "2026-05-17",
  departureISO: "2026-05-20",
  checkIn: "1:00 PM",
  checkOut: "12:00 PM",
};

export const host = {
  name: "Elena Petrova",
  role: "Concierge · 4 years with Rosewood",
  presence: "On property today · 7 AM – 11 PM",
  ext: "ext. 4214",
  phone: "+1-650-555-0177",
};

export const flight = {
  carrier: "United",
  number: "UA 890",
  origin: { city: "Tokyo", code: "NRT", time: "6:55 PM JST · Sat" },
  destination: { city: "San Francisco", code: "SFO", time: "12:12 PM PT · Sun" },
  status: "Delayed 30 min",
  delayed: true,
  delayNote: "Re-routed around weather over the Pacific — driver rescheduled.",
  durationHrs: 9.7,
  timezonesCrossed: 8,
  etaAtProperty: "1:05 PM PT",
};

export const driver = {
  name: "Mateo Reyes",
  role: "Lead chauffeur · 6 years with Rosewood",
  vehicle: "Cadillac Escalade Platinum · Black",
  plate: "8RXM402",
  dispatchedAt: "Dispatched 11:20 AM PT · 12 min to gate",
  phone: "+1-650-555-0148",
};

export type Room = {
  key: string;
  number: string;
  view: string;
  climateF: number;
  scene: string;
  aromatherapy: string;
  pillow: string;
  bath: string;
  signals: string[];
};

export const roomOptions: Record<string, Room> = {
  hillside: {
    key: "hillside",
    number: "Hillside Suite 214",
    view: "Oak grove · west-facing",
    climateF: 67,
    scene: "Dawn — warm 2200K",
    aromatherapy: "Cedar + Eucalyptus",
    pillow: "Firm down · two extra",
    bath: "Drawn 12:25 PM · Epsom + Bergamot",
    signals: ["Last 4 stays", "Stated preferences"],
  },
  vineyard: {
    key: "vineyard",
    number: "Vineyard Suite 308",
    view: "Sand Hill vineyard · south-facing",
    climateF: 67,
    scene: "Vineyard — soft 2400K",
    aromatherapy: "Bergamot + Sage",
    pillow: "Medium down · cooling shell",
    bath: "On request · 10 min notice",
    signals: ["Last 4 stays", "Higher floor preferred"],
  },
  treehouse: {
    key: "treehouse",
    number: "Tree House Bungalow",
    view: "Redwood grove · private terrace",
    climateF: 66,
    scene: "Forest — dim 2000K",
    aromatherapy: "Cedar + Pine",
    pillow: "Firm down · two extra",
    bath: "Outdoor cedar soaking tub · 80°F",
    signals: ["First-time bungalow upgrade", "Wellness preference"],
  },
};

export const room: Room = roomOptions.hillside;

export const wellness = {
  fatigueScore: 72,
  fatigueLabel: "Elevated · transpac arrival",
  jetLagDays: "2–3 days westbound",
  hydration: "Electrolyte set in suite · 1.2L recommended on arrival",
  movement: "Iyengar restorative · 4:00 PM with Mira",
  blackoutWindow: "Suggested nap 1:30–3:00 PM",
  whoopReadiness: 41,
};

export type Amenity = {
  enabled: boolean;
  title: string;
  origin: string;
  why: string;
  pairing: string;
  note: string;
};

export const amenity: Amenity = {
  enabled: true,
  title: "Ridge Monte Bello Cabernet · 2019",
  origin: "Ridge Vineyards · Cupertino · 11 mi",
  why: "From your tasting notes at Hotel Crescent Court — you favored the Bordeaux-leaning Cabernets.",
  pairing: "Plated with Sonoma chèvre and Marcona almonds",
  note: "— with regards, Elena Petrova, Concierge",
};

export type ItineraryItem = {
  // ISO 8601 local datetime: "YYYY-MM-DDTHH:MM:SS" (no timezone suffix)
  time: string;
  title: string;
  detail: string;
};

export const itinerary: ItineraryItem[] = [
  {
    time: "2026-05-17T13:00:00",
    title: "Arrival & welcome",
    detail: "Check-in skipped — suite key sent to Apple Wallet",
  },
  {
    time: "2026-05-17T13:30:00",
    title: "Quiet window",
    detail: "Calendar cleared · do-not-disturb until 3:30 PM",
  },
  {
    time: "2026-05-17T16:00:00",
    title: "Iyengar restorative · Sense Spa",
    detail: "Booked with Mira · 60 min",
  },
  {
    time: "2026-05-17T19:30:00",
    title: "Madera — table 7",
    detail: "Window two-top, your usual · pre-ordered tasting menu",
  },
  {
    time: "2026-05-18T08:30:00",
    title: "Stanford Dish loop",
    detail: "Trail concierge ready · sunrise pace, 3.7 mi",
  },
];

export type Recommendation = {
  id: string;
  // Days from arrival: 0 = arrival day, 1 = next day, etc.
  dayOffset: number;
  // 24-hour "HH:MM"
  time: string;
  title: string;
  detail: string;
};

export const itineraryRecommendations: Recommendation[] = [
  {
    id: "yoga_dawn",
    dayOffset: 1,
    time: "06:30",
    title: "Sunrise yoga on the terrace",
    detail: "60 min · with Aria · paced for jet-lag recovery",
  },
  {
    id: "thai_spa",
    dayOffset: 0,
    time: "16:00",
    title: "Thai bodywork · Sense Spa",
    detail: "90 min · deep tissue release with Tippawan",
  },
  {
    id: "watsu",
    dayOffset: 0,
    time: "15:00",
    title: "Watsu therapy · private pool",
    detail: "60 min in 96° water · floats the spine, sleep aid",
  },
  {
    id: "wine_cellar",
    dayOffset: 0,
    time: "17:30",
    title: "Private cellar tasting",
    detail: "Sommelier-led · five Bordeaux & California Cabernets",
  },
  {
    id: "dinner_manresa",
    dayOffset: 0,
    time: "19:30",
    title: "Manresa, Los Gatos",
    detail: "Tasting menu · 40 min drive · driver ready",
  },
  {
    id: "dinner_french_laundry",
    dayOffset: 0,
    time: "19:00",
    title: "The French Laundry, Yountville",
    detail: "Chef's counter · 75 min drive · helicopter on offer",
  },
  {
    id: "tennis_clinic",
    dayOffset: 1,
    time: "10:00",
    title: "Private tennis clinic",
    detail: "Court 3 · 60 min · pro Jakob, restrings included",
  },
  {
    id: "cycling_la_honda",
    dayOffset: 1,
    time: "09:00",
    title: "Old La Honda climb",
    detail: "Coached road ride · ~2 hrs · Pinarello & kit provided",
  },
  {
    id: "golf_sharon",
    dayOffset: 1,
    time: "08:00",
    title: "Nine holes · Sharon Heights",
    detail: "Tee time arranged · cart, caddie, club rentals",
  },
  {
    id: "filoli",
    dayOffset: 1,
    time: "10:30",
    title: "Filoli Gardens · private guided",
    detail: "Curator walkthrough · 90 min · house & grounds",
  },
  {
    id: "stanford_art",
    dayOffset: 1,
    time: "11:00",
    title: "Cantor Arts Center · private",
    detail: "Curator-led · Rodin courtyard + special exhibitions",
  },
  {
    id: "redwood_walk",
    dayOffset: 1,
    time: "09:00",
    title: "Wunderlich redwood walk",
    detail: "Guided · 75 min · meditative pace, perfect for jet-lag",
  },
  {
    id: "michelin_breakfast",
    dayOffset: 1,
    time: "08:30",
    title: "Breakfast at Madera",
    detail: "Quiet corner · soft-boiled eggs, your usual sparkling water",
  },
];

export const senseOfPlace = {
  title: "The grove your suite looks onto",
  body:
    "The valley oaks behind Hillside 214 are older than Sand Hill Road itself, surveyed in 1858. The artwork above your desk is by Ana Teresa Fernández, who grew up forty minutes south in Salinas.",
  meta: "Curated by Étienne, drawn from your prior interest in Bay Area artists.",
};

export const privacy = {
  signalsUsed: [
    { label: "Stay history across 7 Rosewood properties", consented: true },
    { label: "Flight manifest via United Mileage Plus opt-in", consented: true },
    { label: "WHOOP recovery score (last 72h)", consented: true },
    { label: "Calendar — work/personal, read-only", consented: true },
    { label: "Public social — last 30 days", consented: false },
  ],
  footnote:
    "Every signal is opt-in. Mute any source and we'll fall back to your stated preferences only.",
};

export const assistant = {
  name: "Sera",
  greeting: "Tap to speak with Sera — your arrival concierge.",
};
