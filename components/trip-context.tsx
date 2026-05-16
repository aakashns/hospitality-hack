"use client";

import * as React from "react";

import * as initial from "@/lib/mock-trip";
import type {
  Amenity,
  ItineraryItem,
  Recommendation,
  Room,
} from "@/lib/mock-trip";

export type Trip = {
  guest: typeof initial.guest;
  stay: typeof initial.stay;
  flight: typeof initial.flight;
  driver: typeof initial.driver;
  host: typeof initial.host;
  room: Room;
  wellness: typeof initial.wellness;
  amenity: Amenity;
  itinerary: ItineraryItem[];
  senseOfPlace: typeof initial.senseOfPlace;
  privacy: typeof initial.privacy;
  assistant: typeof initial.assistant;
};

export type { Amenity, ItineraryItem, Recommendation, Room };

const initialTrip: Trip = {
  guest: initial.guest,
  stay: initial.stay,
  flight: initial.flight,
  driver: initial.driver,
  host: initial.host,
  room: initial.room,
  wellness: initial.wellness,
  amenity: initial.amenity,
  itinerary: initial.itinerary,
  senseOfPlace: initial.senseOfPlace,
  privacy: initial.privacy,
  assistant: initial.assistant,
};

function formatStayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function nightsBetween(arrivalISO: string, departureISO: string): number {
  const a = new Date(`${arrivalISO}T00:00:00`);
  const d = new Date(`${departureISO}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(d.getTime())) return 0;
  return Math.max(
    0,
    Math.round((d.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

function toISODate(input: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

type TripContextValue = {
  trip: Trip;
  patchStay: (patch: {
    arrival?: string;
    departure?: string;
  }) => { ok: boolean; nights: number };
  setRoomOption: (key: string) => Room | null;
  patchRoom: (patch: Partial<Room>) => void;
  patchAmenity: (patch: Partial<Amenity>) => void;
  addItineraryItem: (item: ItineraryItem) => ItineraryItem;
  addItineraryRecommendation: (id: string) => Recommendation | null;
  removeItineraryItem: (titleMatch: string) => ItineraryItem | null;
  updateItineraryItem: (
    titleMatch: string,
    patch: Partial<ItineraryItem>,
  ) => ItineraryItem | null;
};

const TripContext = React.createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = React.useState<Trip>(initialTrip);
  const tripRef = React.useRef(trip);
  tripRef.current = trip;

  const value = React.useMemo<TripContextValue>(
    () => ({
      trip,

      patchStay: ({ arrival, departure }) => {
        const aISO = arrival ? toISODate(arrival) : tripRef.current.stay.arrivalISO;
        const dISO = departure ? toISODate(departure) : tripRef.current.stay.departureISO;
        if (!aISO || !dISO) return { ok: false, nights: tripRef.current.stay.nights };
        const nights = nightsBetween(aISO, dISO);
        setTrip((t) => ({
          ...t,
          stay: {
            ...t.stay,
            arrivalISO: aISO,
            departureISO: dISO,
            arrival: formatStayDate(aISO),
            departure: formatStayDate(dISO),
            nights,
          },
        }));
        return { ok: true, nights };
      },

      setRoomOption: (key) => {
        const next = initial.roomOptions[key];
        if (!next) return null;
        setTrip((t) => ({
          ...t,
          room: next,
          stay: { ...t.stay, suite: next.number },
        }));
        return next;
      },

      patchRoom: (patch) =>
        setTrip((t) => ({ ...t, room: { ...t.room, ...patch } })),

      patchAmenity: (patch) =>
        setTrip((t) => ({ ...t, amenity: { ...t.amenity, ...patch } })),

      addItineraryItem: (item) => {
        setTrip((t) => ({ ...t, itinerary: [...t.itinerary, item] }));
        return item;
      },

      addItineraryRecommendation: (id) => {
        const rec = initial.itineraryRecommendations.find((r) => r.id === id);
        if (!rec) return null;
        // Strip id when storing
        const item: ItineraryItem = {
          time: rec.time,
          title: rec.title,
          detail: rec.detail,
        };
        setTrip((t) => ({ ...t, itinerary: [...t.itinerary, item] }));
        return rec;
      },

      removeItineraryItem: (titleMatch) => {
        const needle = titleMatch.toLowerCase();
        const match = tripRef.current.itinerary.find((i) =>
          i.title.toLowerCase().includes(needle),
        );
        if (!match) return null;
        setTrip((t) => ({
          ...t,
          itinerary: t.itinerary.filter((i) => i.title !== match.title),
        }));
        return match;
      },

      updateItineraryItem: (titleMatch, patch) => {
        const needle = titleMatch.toLowerCase();
        const match = tripRef.current.itinerary.find((i) =>
          i.title.toLowerCase().includes(needle),
        );
        if (!match) return null;
        setTrip((t) => ({
          ...t,
          itinerary: t.itinerary.map((i) =>
            i.title === match.title ? { ...i, ...patch } : i,
          ),
        }));
        return match;
      },
    }),
    [trip],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = React.useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}
