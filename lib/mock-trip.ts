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
  arrival: "Sunday, May 17",
  departure: "Wednesday, May 20",
  nights: 3,
  checkIn: "1:00 PM",
  checkOut: "12:00 PM",
};

export const host = {
  name: "Elena Petrova",
  role: "Property Host · 4 years with Rosewood",
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
  note: "— with regards, Étienne, Head Concierge",
};

export type ItineraryItem = {
  time: string;
  title: string;
  detail: string;
};

export const itinerary: ItineraryItem[] = [
  {
    time: "1:00 PM",
    title: "Arrival & welcome",
    detail: "Check-in skipped — suite key sent to Apple Wallet",
  },
  {
    time: "1:30 PM",
    title: "Quiet window",
    detail: "Calendar cleared · do-not-disturb until 3:30 PM",
  },
  {
    time: "4:00 PM",
    title: "Iyengar restorative · Sense Spa",
    detail: "Booked with Mira · 60 min",
  },
  {
    time: "7:30 PM",
    title: "Madera — table 7",
    detail: "Window two-top, your usual · pre-ordered tasting menu",
  },
  {
    time: "8:30 AM · Mon",
    title: "Stanford Dish loop",
    detail: "Trail concierge ready · sunrise pace, 3.7 mi",
  },
];

export type Recommendation = ItineraryItem & { id: string };

export const itineraryRecommendations: Recommendation[] = [
  {
    id: "yoga_dawn",
    time: "6:30 AM",
    title: "Sunrise yoga on the terrace",
    detail: "60 min · with Aria · paced for jet-lag recovery",
  },
  {
    id: "thai_spa",
    time: "4:00 PM",
    title: "Thai bodywork · Sense Spa",
    detail: "90 min · deep tissue release with Tippawan",
  },
  {
    id: "watsu",
    time: "3:00 PM",
    title: "Watsu therapy · private pool",
    detail: "60 min in 96° water · floats the spine, sleep aid",
  },
  {
    id: "wine_cellar",
    time: "5:30 PM",
    title: "Private cellar tasting",
    detail: "Sommelier-led · five Bordeaux & California Cabernets",
  },
  {
    id: "dinner_manresa",
    time: "7:30 PM",
    title: "Manresa, Los Gatos",
    detail: "Tasting menu · 40 min drive · driver ready",
  },
  {
    id: "dinner_french_laundry",
    time: "7:00 PM",
    title: "The French Laundry, Yountville",
    detail: "Chef's counter · 75 min drive · helicopter on offer",
  },
  {
    id: "tennis_clinic",
    time: "10:00 AM",
    title: "Private tennis clinic",
    detail: "Court 3 · 60 min · pro Jakob, restrings included",
  },
  {
    id: "cycling_la_honda",
    time: "9:00 AM",
    title: "Old La Honda climb",
    detail: "Coached road ride · ~2 hrs · Pinarello & kit provided",
  },
  {
    id: "golf_sharon",
    time: "8:00 AM",
    title: "Nine holes · Sharon Heights",
    detail: "Tee time arranged · cart, caddie, club rentals",
  },
  {
    id: "filoli",
    time: "10:30 AM",
    title: "Filoli Gardens · private guided",
    detail: "Curator walkthrough · 90 min · house & grounds",
  },
  {
    id: "stanford_art",
    time: "11:00 AM",
    title: "Cantor Arts Center · private",
    detail: "Curator-led · Rodin courtyard + special exhibitions",
  },
  {
    id: "redwood_walk",
    time: "9:00 AM",
    title: "Wunderlich redwood walk",
    detail: "Guided · 75 min · meditative pace, perfect for jet-lag",
  },
  {
    id: "michelin_breakfast",
    time: "8:30 AM",
    title: "Breakfast at Madera",
    detail: "Quiet corner · soft-boiled eggs, your usual sparkling water",
  },
];

export const senseOfPlace = {
  title: "The grove your suite looks onto",
  body:
    "The valley oaks behind Hillside 214 are older than Sand Hill Road itself — surveyed in 1858. The artwork above your desk is by Ana Teresa Fernández, who grew up forty minutes south in Salinas. She'll be in residence at the property Tuesday evening if you'd like to meet.",
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
