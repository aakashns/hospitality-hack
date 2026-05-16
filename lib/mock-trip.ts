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
  arrival: "Sunday, May 17",
  departure: "Wednesday, May 20",
  nights: 3,
  countdownLabel: "Arriving in",
  countdownValue: "11h 23m",
  preArrivalProgress: 88,
};

export const flight = {
  carrier: "United",
  number: "UA 890",
  origin: { city: "Tokyo", code: "NRT", time: "6:55 PM JST · Sat" },
  destination: { city: "San Francisco", code: "SFO", time: "11:42 AM PT · Sun" },
  status: "On time",
  durationHrs: 9.7,
  timezonesCrossed: 8,
  driverDispatch: "Driver dispatched at 10:50 AM · Black Cadillac CT6",
  etaAtProperty: "12:35 PM PT",
};

export const room = {
  number: "Hillside Suite 214",
  view: "Oak grove · west-facing",
  climateF: 67,
  scene: "Dawn — warm 2200K",
  aromatherapy: "Cedar + Eucalyptus",
  pillow: "Firm down · two extra",
  bath: "Drawn 12:25 PM · Epsom + Bergamot",
  signals: ["Last 4 stays", "Stated preferences"],
};

export const wellness = {
  fatigueScore: 72,
  fatigueLabel: "Elevated · transpac arrival",
  jetLagDays: "2–3 days westbound",
  hydration: "Electrolyte set in suite · 1.2L recommended on arrival",
  movement: "Iyengar restorative · 4:00 PM with Mira",
  blackoutWindow: "Suggested nap 1:30–3:00 PM",
  whoopReadiness: 41,
};

export const amenity = {
  title: "Ridge Monte Bello Cabernet · 2019",
  origin: "Ridge Vineyards · Cupertino · 11 mi",
  why: "From your tasting notes at Hotel Crescent Court — you favored the Bordeaux-leaning Cabernets.",
  pairing: "Plated with Sonoma chèvre and Marcona almonds",
  note: "— with regards, Étienne, Head Concierge",
};

export const itinerary = [
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
