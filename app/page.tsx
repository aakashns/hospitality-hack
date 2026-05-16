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
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import { VoiceBubble } from "@/components/voice-bubble";
import {
  guest,
  stay,
  flight,
  room,
  wellness,
  amenity,
  itinerary,
  senseOfPlace,
  privacy,
  assistant,
} from "@/lib/mock-trip";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 pb-40">
      <PageHeader />

      <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-5 pb-10">
        <TripHeaderCard />
        <FlightCard />
        <RoomCard />
        <WellnessCard />
        <AmenityCard />
        <ItineraryCard />
        <SenseOfPlaceCard />
        <PrivacyCard />
      </main>

      <VoiceBubble assistantName={assistant.name} />
    </div>
  );
}

function PageHeader() {
  return (
    <header className="mx-auto flex w-full max-w-xl flex-col gap-1 px-7 pt-12 pb-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>Rosewood</span>
        <span>{guest.loyaltyTier}</span>
      </div>
      <Separator className="mt-4 mb-6" />
      <p className="text-sm tracking-widest uppercase text-muted-foreground">
        Welcome back,
      </p>
      <h1 className="font-heading text-5xl font-medium tracking-tight">
        {guest.honorific} {guest.lastName}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Your arrival at <span className="text-foreground">{stay.property}</span>{" "}
        has been prepared. Tap any card for detail, or speak with{" "}
        {assistant.name} below.
      </p>
    </header>
  );
}

function TripHeaderCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge>This stay</Badge>
          <Badge variant="ghost">{stay.nights} nights</Badge>
        </div>
        <CardTitle className="text-2xl">{stay.property}</CardTitle>
        <CardDescription>{stay.suite}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-7">
        <Field label="Arrival" value={stay.arrival} />
        <Field label="Departure" value={stay.departure} />
        <Field
          label={stay.countdownLabel}
          value={stay.countdownValue}
          accent
        />
        <Field
          label="Pre-arrival"
          value={`${stay.preArrivalProgress}% ready`}
        />
        <div className="col-span-2">
          <Progress value={stay.preArrivalProgress} />
        </div>
      </CardContent>
    </Card>
  );
}

function FlightCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <SectionEyebrow icon={Plane} label="Flight & arrival" />
          <Badge variant="ghost" className="text-foreground">
            <CircleDot className="!size-2 text-emerald-600" />
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
        <Separator />
        <div className="flex flex-col gap-2 text-base">
          <p className="text-foreground">{flight.driverDispatch}</p>
          <p className="text-muted-foreground">
            Estimated arrival at property{" "}
            <span className="text-foreground">{flight.etaAtProperty}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function RoomCard() {
  return (
    <Card>
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
  return (
    <Card>
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

function ItineraryCard() {
  return (
    <Card>
      <CardHeader>
        <SectionEyebrow icon={CalendarDays} label="Pre-loaded itinerary" />
        <CardTitle className="text-2xl">Day one & morning two</CardTitle>
        <CardDescription>
          Drafted from your prior preferences — adjust anytime with{" "}
          {assistant.name}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {itinerary.map((entry) => (
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
