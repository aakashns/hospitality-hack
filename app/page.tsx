"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  Plane,
  KeyRound,
  HeartPulse,
  Wine,
  CalendarDays,
  Trees,
  ShieldCheck,
  Check,
  CircleDot,
  Thermometer,
  Sparkles,
  Droplets,
  Phone,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { VoiceChat } from "@/components/voice-chat";
import { TripProvider, useTrip } from "@/components/trip-context";
import { FadeInSection } from "@/components/fade-in-section";

export default function Page() {
  return (
    <TripProvider>
      <PageContent />
    </TripProvider>
  );
}

function PageContent() {
  const { trip } = useTrip();

  const sections: { id: string; Component: React.ComponentType }[] = [
    { id: "section-stay", Component: TripHeaderCard },
    { id: "section-flight", Component: FlightCard },
    { id: "section-room", Component: RoomCard },
    ...(trip.amenity.enabled
      ? [{ id: "section-amenity", Component: AmenityCard }]
      : []),
    { id: "section-itinerary", Component: ItineraryCard },
    { id: "section-place", Component: SenseOfPlaceCard },
    { id: "section-wellness", Component: WellnessCard },
    { id: "section-privacy", Component: PrivacyCard },
  ];

  return (
    <div className="bg-gradient-to-b from-background to-muted/40 pb-32">
      <header className="mx-auto flex w-full max-w-xl flex-col gap-1 px-7 pt-10 pb-8">
        <FadeInSection delayMs={0}>
          <div className="mb-8 flex justify-center">
            <Image
              src="/rosewood.jpg"
              alt="Rosewood — A Sense of Place"
              width={300}
              height={100}
              priority
              className="h-auto w-[14rem]"
            />
          </div>
        </FadeInSection>

        <FadeInSection delayMs={300}>
          <div className="flex items-center gap-7">
            <Avatar size="lg" className="size-32! shrink-0 ring-1 ring-border">
              <AvatarImage
                src="/guest.jpg"
                alt={`${trip.guest.firstName} ${trip.guest.lastName}`}
              />
              <AvatarFallback className="font-heading text-6xl">
                {trip.guest.firstName[0]}
                {trip.guest.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm tracking-widest uppercase text-muted-foreground">
                Welcome back,
              </p>
              <h1 className="font-heading text-5xl font-medium tracking-tight">
                {trip.guest.honorific} {trip.guest.lastName}
              </h1>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delayMs={600}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Your arrival at{" "}
            <span className="text-foreground">{trip.stay.property}</span> has
            been prepared.
          </p>
        </FadeInSection>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-5 pb-10">
        {sections.map(({ id, Component }, i) => (
          <FadeInSection
            key={id}
            id={id}
            delayMs={i === 0 ? 900 : 0}
          >
            <Component />
          </FadeInSection>
        ))}
      </main>

      <VoiceChat assistantName={trip.assistant.name} />
    </div>
  );
}

function TripHeaderCard() {
  const { trip } = useTrip();
  return (
    <Card>
      <Image
        src="/rosewood-sand-hill.jpg"
        alt={trip.stay.property}
        width={1200}
        height={600}
        priority
        className="aspect-[16/9] w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge>This stay</Badge>
          <Badge variant="ghost">{trip.stay.nights} nights</Badge>
        </div>
        <CardTitle className="text-2xl">{trip.stay.property}</CardTitle>
        <CardDescription>{trip.stay.suite}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-7">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7">
          <Field label="Arrival" value={trip.stay.arrival} />
          <Field label="Departure" value={trip.stay.departure} />
          <Field label="Check-in" value={trip.stay.checkIn} />
          <Field label="Check-out" value={trip.stay.checkOut} />
        </div>

        <Separator />

        <HostBlock />
      </CardContent>
    </Card>
  );
}

function HostBlock() {
  const { trip } = useTrip();
  const { host } = trip;
  return (
    <div className="flex flex-col gap-5">
      <SectionEyebrow icon={KeyRound} label="Your host" />
      <div className="flex items-start gap-5">
        <Avatar size="lg" className="size-20! shrink-0 ring-1 ring-border">
          <AvatarImage src="/host.jpg" alt={host.name} />
          <AvatarFallback>
            {host.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="font-heading text-xl tracking-wide text-foreground">
            {host.name}
          </p>
          <p className="text-sm text-muted-foreground">{host.role}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {host.presence} · {host.ext}
          </p>
        </div>
      </div>

      <Button asChild size="lg" className="w-full">
        <a href={`tel:${host.phone.replace(/[^+\d]/g, "")}`}>
          <Phone data-icon="inline-start" className="size-4" />
          Call {host.name.split(" ")[0]}
        </a>
      </Button>
    </div>
  );
}

function FlightCard() {
  const { trip } = useTrip();
  const { flight } = trip;
  return (
    <Card>
      <Image
        src="/united-airlines.jpg"
        alt={`${flight.carrier} ${flight.number}`}
        width={1200}
        height={600}
        className="aspect-[16/9] w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <SectionEyebrow icon={Plane} label="Flight & arrival" />
          <Badge
            variant="ghost"
            className={
              flight.delayed
                ? "text-amber-700 dark:text-amber-400"
                : "text-foreground"
            }
          >
            <CircleDot
              className={`!size-2 ${
                flight.delayed ? "text-amber-600" : "text-emerald-600"
              }`}
            />
            {flight.status}
          </Badge>
        </div>
        <CardTitle className="text-2xl">
          {flight.carrier} {flight.number}
        </CardTitle>
        <CardDescription>
          {flight.durationHrs}h · {flight.timezonesCrossed} timezones west
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <p className="font-heading text-4xl tracking-wide">
              {flight.origin.code}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {flight.origin.city}
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {flight.origin.time}
            </p>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="h-px w-20 bg-border" />
            <Plane className="my-1.5 size-4" />
            <div className="h-px w-20 bg-border" />
          </div>
          <div className="text-right">
            <p className="font-heading text-4xl tracking-wide">
              {flight.destination.code}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {flight.destination.city}
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {flight.destination.time}
            </p>
          </div>
        </div>
        <p className="text-base text-muted-foreground">
          Estimated arrival at property{" "}
          <span
            className={
              flight.delayed
                ? "text-amber-700 dark:text-amber-400"
                : "text-foreground"
            }
          >
            {flight.etaAtProperty}
          </span>
        </p>

        {flight.delayed ? (
          <div className="rounded-md border border-amber-600/30 bg-amber-100/40 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
            {flight.delayNote}
          </div>
        ) : null}

        <Separator />

        <DriverBlock />
      </CardContent>
    </Card>
  );
}

function DriverBlock() {
  const { trip } = useTrip();
  const { driver } = trip;
  return (
    <div className="flex flex-col gap-5">
      <SectionEyebrow icon={KeyRound} label="Your driver" />
      <div className="flex items-start gap-5">
        <Avatar size="lg" className="size-20! shrink-0 ring-1 ring-border">
          <AvatarImage src="/driver.jpg" alt={driver.name} />
          <AvatarFallback>
            {driver.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="font-heading text-xl tracking-wide text-foreground">
            {driver.name}
          </p>
          <p className="text-sm text-muted-foreground">{driver.role}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {driver.dispatchedAt}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-muted/40 p-4">
        <Image
          src="/car.png"
          alt={driver.vehicle}
          width={640}
          height={320}
          className="h-20 w-auto object-contain"
        />
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Vehicle
          </p>
          <p className="text-sm leading-tight text-foreground">
            {driver.vehicle}
          </p>
          <p className="font-heading text-base tracking-widest text-foreground">
            {driver.plate}
          </p>
        </div>
      </div>

      <Button asChild size="lg" className="w-full">
        <a href={`tel:${driver.phone.replace(/[^+\d]/g, "")}`}>
          <Phone data-icon="inline-start" className="size-4" />
          Call {driver.name.split(" ")[0]}
        </a>
      </Button>
    </div>
  );
}

function RoomCard() {
  const { trip } = useTrip();
  const { room } = trip;
  return (
    <Card>
      <Image
        src="/hillside.jpg"
        alt={room.number}
        width={1200}
        height={600}
        className="aspect-[16/9] w-full object-cover"
      />
      <CardHeader>
        <SectionEyebrow icon={KeyRound} label="Suite readiness" />
        <CardTitle className="text-2xl">{room.number}</CardTitle>
        <CardDescription>{room.view}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-7">
        <Field
          label="Climate"
          value={`${room.climateF}°F`}
          icon={Thermometer}
        />
        <Field label="Lighting" value={room.scene} icon={Sparkles} />
        <Field label="Aromatherapy" value={room.aromatherapy} />
        <Field label="Pillow" value={room.pillow} />
        <div className="col-span-2">
          <Field label="Bath" value={room.bath} icon={Droplets} />
        </div>
        <div className="col-span-2 flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {room.signals.map((s) => (
            <span
              key={s}
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              · {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WellnessCard() {
  const { trip } = useTrip();
  const { wellness } = trip;
  return (
    <Card>
      <CardHeader>
        <SectionEyebrow icon={HeartPulse} label="Wellness & recovery" />
        <CardTitle className="text-2xl">Travel fatigue · elevated</CardTitle>
        <CardDescription>
          Synthesised from flight duration and WHOOP readiness
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Stat
            label="WHOOP readiness"
            value={`${wellness.whoopReadiness}`}
            unit="/100"
            tone="warn"
          />
          <Stat
            label="Travel load"
            value={`${wellness.fatigueScore}`}
            unit="/100"
            tone="warn"
          />
        </div>
        <Separator />
        <ul className="flex flex-col gap-4">
          <RecoveryLine label="Jet-lag forecast" value={wellness.jetLagDays} />
          <RecoveryLine label="Hydration" value={wellness.hydration} />
          <RecoveryLine label="Movement" value={wellness.movement} />
          <RecoveryLine label="Rest window" value={wellness.blackoutWindow} />
        </ul>
      </CardContent>
    </Card>
  );
}

function AmenityCard() {
  const { trip } = useTrip();
  const { amenity } = trip;
  return (
    <Card>
      <Image
        src="/wine.jpg"
        alt={amenity.title}
        width={1200}
        height={600}
        className="aspect-[16/9] w-full object-cover"
      />
      <CardHeader>
        <SectionEyebrow icon={Wine} label="Welcome amenity" />
        <CardTitle className="text-2xl">{amenity.title}</CardTitle>
        <CardDescription>{amenity.origin}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-base leading-relaxed text-foreground/90">
          {amenity.why}
        </p>
        <Separator />
        <p className="text-base leading-relaxed text-muted-foreground">
          {amenity.pairing}
        </p>
        <p className="font-heading text-lg italic tracking-wide text-foreground/80">
          {amenity.note}
        </p>
      </CardContent>
    </Card>
  );
}

const DAY_OFFSETS: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

function timeKey(timeStr: string): number {
  const parts = timeStr.split("·").map((s) => s.trim());
  const dayKey = parts[1]?.slice(0, 3).toLowerCase() ?? "sun";
  const dayOffset = (DAY_OFFSETS[dayKey] ?? 0) * 24 * 60;
  const match = parts[0].match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!match) return dayOffset;
  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const ampm = match[3].toLowerCase();
  if (ampm === "pm" && hours !== 12) hours += 12;
  if (ampm === "am" && hours === 12) hours = 0;
  return dayOffset + hours * 60 + mins;
}

function ItineraryCard() {
  const { trip } = useTrip();
  const sortedItinerary = useMemo(
    () =>
      [...trip.itinerary].sort((a, b) => timeKey(a.time) - timeKey(b.time)),
    [trip.itinerary],
  );
  return (
    <Card>
      <CardHeader>
        <SectionEyebrow icon={CalendarDays} label="Pre-loaded itinerary" />
        <CardTitle className="text-2xl">Day one & morning two</CardTitle>
        <CardDescription>
          Drafted from your prior preferences — adjust anytime with{" "}
          {trip.assistant.name}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {sortedItinerary.map((entry) => (
            <li
              key={entry.title}
              className="grid grid-cols-[6.5rem_1fr] gap-5 border-t border-border/60 py-4 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span className="pt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {entry.time}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-lg text-foreground">{entry.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {entry.detail}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SenseOfPlaceCard() {
  const { trip } = useTrip();
  const { senseOfPlace } = trip;
  return (
    <Card>
      <CardHeader>
        <SectionEyebrow icon={Trees} label="A sense of place" />
        <CardTitle className="text-2xl">{senseOfPlace.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-base leading-relaxed text-foreground/90">
          {senseOfPlace.body}
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {senseOfPlace.meta}
        </p>
      </CardContent>
    </Card>
  );
}

function PrivacyCard() {
  const { trip } = useTrip();
  const { privacy } = trip;
  return (
    <Card>
      <CardHeader>
        <SectionEyebrow icon={ShieldCheck} label="What we used" />
        <CardTitle className="text-2xl">Signals & consent</CardTitle>
        <CardDescription>{privacy.footnote}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {privacy.signalsUsed.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between gap-4 text-base"
            >
              <span
                className={
                  s.consented ? "text-foreground" : "text-muted-foreground"
                }
              >
                {s.label}
              </span>
              {s.consented ? (
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  <Check className="size-4" /> On
                </span>
              ) : (
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Muted
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SectionEyebrow({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
  );
}

function Field({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={
          accent
            ? "font-heading text-2xl tracking-wide text-foreground"
            : "flex items-center gap-2 text-base text-foreground"
        }
      >
        {Icon && !accent ? <Icon className="size-4 text-muted-foreground" /> : null}
        {value}
      </span>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "warn" | "good" | "neutral";
}) {
  const toneClass =
    tone === "warn"
      ? "text-amber-700 dark:text-amber-400"
      : tone === "good"
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-foreground";
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-heading text-4xl leading-none tracking-wide">
        <span className={toneClass}>{value}</span>
        {unit ? (
          <span className="ml-1 text-base text-muted-foreground">{unit}</span>
        ) : null}
      </span>
    </div>
  );
}

function RecoveryLine({ label, value }: { label: string; value: string }) {
  return (
    <li className="grid grid-cols-[9rem_1fr] gap-4">
      <span className="pt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="text-base leading-relaxed text-foreground/90">{value}</span>
    </li>
  );
}
