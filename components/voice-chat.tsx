"use client";

import * as React from "react";
import { Mic, X, Eye, EyeOff } from "lucide-react";
import {
  ConversationProvider,
  useConversation,
  useConversationClientTool,
} from "@elevenlabs/react";

import { cn } from "@/lib/utils";
import { buildFirstMessage, buildSystemPrompt } from "@/lib/agent-prompt";
import { useTrip } from "@/components/trip-context";

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

type Phase = "idle" | "listening" | "thinking" | "speaking";
type Message = { id: number; role: "user" | "agent"; text: string };

type DemoStep = {
  ms: number;
  status: Phase;
  push?: { role: "user" | "agent"; text: string };
};

const demoScript: DemoStep[] = [
  { ms: 600, status: "listening" },
  {
    ms: 2200,
    status: "thinking",
    push: { role: "user", text: "Is the room ready?" },
  },
  {
    ms: 1800,
    status: "speaking",
    push: {
      role: "agent",
      text: "Your suite is at 67°. The bath will be drawn at 12:25 with Epsom and bergamot.",
    },
  },
  { ms: 3800, status: "listening" },
  {
    ms: 2200,
    status: "thinking",
    push: { role: "user", text: "Move my spa to 5 PM." },
  },
  {
    ms: 1800,
    status: "speaking",
    push: {
      role: "agent",
      text: "Done — Mira is expecting you at 5. I'll let the suite know.",
    },
  },
  { ms: 3500, status: "idle" },
];

export function VoiceChat({ assistantName }: { assistantName: string }) {
  return (
    <ConversationProvider>
      <VoiceChatInner assistantName={assistantName} />
    </ConversationProvider>
  );
}

function VoiceChatInner({ assistantName }: { assistantName: string }) {
  const hasAgent = Boolean(AGENT_ID);
  const {
    trip,
    patchStay,
    setRoomOption,
    patchRoom,
    patchAmenity,
    addItineraryItem,
    addItineraryRecommendation,
    removeItineraryItem,
    updateItineraryItem,
  } = useTrip();

  // Keep the latest snapshot accessible without rebinding tools on every render.
  const tripRef = React.useRef(trip);
  tripRef.current = trip;

  useConversationClientTool("scroll_to_section", (params) => {
    const { section } = params as { section: string };
    const id = section.startsWith("section-") ? section : `section-${section}`;
    if (typeof document === "undefined") return `Cannot scroll right now.`;
    const el = document.getElementById(id);
    if (!el) return `Section "${section}" is not on this page.`;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Re-trigger the highlight animation.
    el.classList.remove("section-highlight");
    void el.offsetHeight;
    el.classList.add("section-highlight");
    window.setTimeout(() => el.classList.remove("section-highlight"), 2900);
    return `Scrolled to ${section}.`;
  });

  useConversationClientTool("change_stay", (params) => {
    const { arrival, departure } = params as {
      arrival?: string;
      departure?: string;
    };
    const { ok, nights } = patchStay({ arrival, departure });
    return ok
      ? `Stay updated · ${nights} night${nights === 1 ? "" : "s"}.`
      : `Couldn't parse the dates provided.`;
  });

  useConversationClientTool("change_room", (params) => {
    const { option } = params as { option: string };
    const next = setRoomOption(option);
    return next ? `Suite changed to ${next.number}.` : `Unknown room option "${option}". Choose hillside, vineyard, or treehouse.`;
  });

  useConversationClientTool("change_room_setting", (params) => {
    const { temperature, lighting, aroma, pillow, bath } = params as {
      temperature?: number;
      lighting?: string;
      aroma?: string;
      pillow?: string;
      bath?: string;
    };
    const patch: Record<string, unknown> = {};
    if (typeof temperature === "number") patch.climateF = temperature;
    if (lighting) patch.scene = lighting;
    if (aroma) patch.aromatherapy = aroma;
    if (pillow) patch.pillow = pillow;
    if (bath) patch.bath = bath;
    if (Object.keys(patch).length === 0) return `No room settings provided.`;
    patchRoom(patch);
    const summary = [
      typeof temperature === "number" ? `${temperature}°F` : null,
      lighting,
      aroma,
      pillow,
      bath,
    ]
      .filter(Boolean)
      .join(" · ");
    return `Suite updated · ${summary}.`;
  });

  useConversationClientTool("toggle_welcome_amenity", (params) => {
    const { enabled } = params as { enabled: boolean };
    patchAmenity({ enabled: Boolean(enabled) });
    return enabled
      ? `Welcome amenity is on.`
      : `Welcome amenity declined for this stay.`;
  });

  useConversationClientTool("change_itinerary", (params) => {
    const {
      action,
      recommendation_id,
      title_match,
      time,
      title,
      detail,
      new_time,
      new_detail,
    } = params as {
      action: "add" | "remove" | "update";
      recommendation_id?: string;
      title_match?: string;
      time?: string;
      title?: string;
      detail?: string;
      new_time?: string;
      new_detail?: string;
    };

    if (action === "add") {
      if (recommendation_id) {
        const rec = addItineraryRecommendation(recommendation_id);
        return rec
          ? `Added "${rec.title}" at ${rec.time}.`
          : `No recommendation matches id "${recommendation_id}".`;
      }
      if (time && title) {
        addItineraryItem({ time, title, detail: detail ?? "" });
        return `Added "${title}" at ${time}.`;
      }
      return `Add requires either recommendation_id, or time + title.`;
    }

    if (action === "remove") {
      if (!title_match) return `Remove requires title_match.`;
      const removed = removeItineraryItem(title_match);
      return removed
        ? `Removed "${removed.title}".`
        : `Couldn't find an itinerary item matching "${title_match}".`;
    }

    if (action === "update") {
      if (!title_match) return `Update requires title_match.`;
      const patch: Partial<{ time: string; detail: string }> = {};
      if (new_time) patch.time = new_time;
      if (new_detail) patch.detail = new_detail;
      if (Object.keys(patch).length === 0) {
        return `Update needs at least one of new_time, new_detail.`;
      }
      const updated = updateItineraryItem(title_match, patch);
      return updated
        ? `Updated "${updated.title}".`
        : `Couldn't find an itinerary item matching "${title_match}".`;
    }

    return `Unknown action "${action}". Use add, remove, or update.`;
  });

  const [messages, setMessages] = React.useState<Message[]>([]);
  const messagesRef = React.useRef(messages);
  messagesRef.current = messages;
  const messageIdRef = React.useRef(0);
  const pushMessage = React.useCallback(
    (role: "user" | "agent", text: string) =>
      setMessages((m) => [...m, { id: ++messageIdRef.current, role, text }]),
    [],
  );

  const [transcriptHidden, setTranscriptHidden] = React.useState(false);

  const conversation = useConversation({
    onError: (e) => console.warn("[voice] error", e),
    onMessage: ({ message, role }) => {
      if (!message) return;
      pushMessage(role === "user" ? "user" : "agent", message);
    },
  });

  const [demoOn, setDemoOn] = React.useState(false);
  const [demoIdx, setDemoIdx] = React.useState(0);
  const [demoStatus, setDemoStatus] = React.useState<Phase>("idle");

  React.useEffect(() => {
    if (!demoOn) return;
    if (demoIdx >= demoScript.length) {
      const t = setTimeout(() => setDemoOn(false), 4000);
      return () => clearTimeout(t);
    }
    const step = demoScript[demoIdx];
    const t = setTimeout(() => {
      setDemoStatus(step.status);
      if (step.push) pushMessage(step.push.role, step.push.text);
      setDemoIdx((i) => i + 1);
    }, step.ms);
    return () => clearTimeout(t);
  }, [demoOn, demoIdx, pushMessage]);

  const liveStatus = conversation.status;
  const liveSpeaking = conversation.isSpeaking;
  const liveActive =
    liveStatus === "connected" || liveStatus === "connecting";

  const sessionActive = hasAgent ? liveActive : demoOn;

  const phase: Phase = hasAgent
    ? liveStatus === "connecting"
      ? "thinking"
      : liveStatus === "connected"
        ? liveSpeaking
          ? "speaking"
          : "listening"
        : "idle"
    : demoStatus;

  const statusLabel =
    phase === "thinking"
      ? `${assistantName} is thinking…`
      : phase === "speaking"
        ? `${assistantName} is speaking…`
        : phase === "listening"
          ? "Listening…"
          : "";

  async function startSession() {
    setTranscriptHidden(false);
    if (hasAgent) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        conversation.startSession({
          agentId: AGENT_ID!,
          connectionType: "websocket",
          overrides: {
            agent: {
              prompt: {
                prompt: buildSystemPrompt(tripRef.current, messagesRef.current),
              },
              firstMessage: buildFirstMessage(
                tripRef.current,
                messagesRef.current.length > 0,
              ),
            },
          },
        });
      } catch (e) {
        console.warn("[voice] mic permission denied", e);
      }
      return;
    }
    setDemoIdx(0);
    setDemoStatus("listening");
    setDemoOn(true);
  }

  function stopSession() {
    if (hasAgent) {
      conversation.endSession();
    } else {
      setDemoOn(false);
      setDemoIdx(0);
      setDemoStatus("idle");
    }
  }

  function handleTap() {
    if (sessionActive) stopSession();
    else startSession();
  }

  function dismissOverlay() {
    stopSession();
    setTranscriptHidden(true);
  }

  const overlayVisible = messages.length > 0 || sessionActive;
  const transcriptVisible = overlayVisible && !transcriptHidden;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, phase, sessionActive]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="relative w-full max-w-xl">
        {transcriptVisible ? (
          <div className="absolute right-5 bottom-26 w-[min(22rem,calc(100%-2.5rem))]">
            <div
              ref={scrollRef}
              className="pointer-events-auto flex max-h-[calc(100vh-8rem)] flex-col gap-3 overflow-y-auto px-1 pt-2 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            >
              {messages.map((m) => (
                <Bubble key={m.id} role={m.role} text={m.text} />
              ))}
              {sessionActive && phase === "thinking" ? <TypingBubble /> : null}
              {sessionActive && statusLabel ? (
                <p
                  className={cn(
                    "px-2 pt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-in fade-in duration-300",
                    phase === "listening" ? "self-end" : "self-start",
                  )}
                >
                  {statusLabel}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {overlayVisible ? (
          <button
            type="button"
            onClick={dismissOverlay}
            aria-label="Close conversation"
            className={cn(
              "pointer-events-auto absolute right-43 bottom-6 grid size-16 place-items-center rounded-full bg-background text-foreground shadow-xl ring-1 ring-border transition active:translate-y-px",
              "animate-in fade-in zoom-in-90 duration-300",
            )}
          >
            <X className="size-5" />
          </button>
        ) : null}

        {overlayVisible ? (
          <button
            type="button"
            onClick={() => setTranscriptHidden((h) => !h)}
            aria-label={transcriptHidden ? "Show transcript" : "Hide transcript"}
            className={cn(
              "pointer-events-auto absolute right-24 bottom-6 grid size-16 place-items-center rounded-full bg-background text-foreground shadow-xl ring-1 ring-border transition active:translate-y-px",
              "animate-in fade-in zoom-in-90 duration-300",
            )}
          >
            {transcriptHidden ? (
              <Eye className="size-5" />
            ) : (
              <EyeOff className="size-5" />
            )}
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleTap}
          aria-label={sessionActive ? "Pause listening" : `Talk to ${assistantName}`}
          className={cn(
            "pointer-events-auto absolute right-5 bottom-6 grid size-16 place-items-center rounded-full shadow-xl ring-1 ring-foreground/10 transition active:translate-y-px",
            sessionActive
              ? "bg-foreground text-background"
              : "bg-primary text-primary-foreground",
          )}
        >
          {sessionActive ? (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-foreground/30" />
              <span className="absolute -inset-2 animate-pulse rounded-full bg-foreground/10" />
              <Mic className="relative size-6" />
            </>
          ) : (
            <Mic className="size-6" />
          )}
        </button>
      </div>
    </div>
  );
}

function Bubble({ role, text }: { role: "user" | "agent"; text: string }) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-3xl px-5 py-3 text-base leading-relaxed shadow-md ring-1 ring-foreground/5",
        "animate-in fade-in slide-in-from-bottom-4 duration-400",
        isUser
          ? "self-end rounded-br-md bg-primary text-primary-foreground"
          : "self-start rounded-bl-md bg-background text-foreground",
      )}
    >
      {text}
    </div>
  );
}

function TypingBubble() {
  return (
    <div
      className={cn(
        "max-w-[85%] self-start rounded-3xl rounded-bl-md bg-background px-5 py-3.5 shadow-md ring-1 ring-foreground/5",
        "animate-in fade-in slide-in-from-bottom-4 duration-400",
      )}
    >
      <span className="flex items-end gap-1.5">
        <Dot delay="0ms" />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </span>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      style={{ animationDelay: delay }}
      className="block size-2 animate-bounce rounded-full bg-muted-foreground/70"
    />
  );
}
