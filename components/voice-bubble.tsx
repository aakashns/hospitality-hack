"use client";

import * as React from "react";
import { Mic, MicOff } from "lucide-react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

import { cn } from "@/lib/utils";

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

type DemoPhase = "idle" | "listening" | "thinking" | "speaking";

const demoScript: { phase: DemoPhase; text: string; ms: number }[] = [
  { phase: "listening", text: "Listening…", ms: 1400 },
  { phase: "listening", text: "“Is the room ready?”", ms: 1400 },
  { phase: "thinking", text: "Sera is checking with the suite…", ms: 1200 },
  {
    phase: "speaking",
    text: "Your suite is at 67°. The bath will be drawn at 12:25.",
    ms: 3200,
  },
];

export function VoiceBubble({ assistantName }: { assistantName: string }) {
  return (
    <ConversationProvider>
      <VoiceBubbleInner assistantName={assistantName} />
    </ConversationProvider>
  );
}

function VoiceBubbleInner({ assistantName }: { assistantName: string }) {
  const hasAgent = Boolean(AGENT_ID);
  const conversation = useConversation({
    onError: (e) => console.warn("[voice] error", e),
  });

  const [demoOn, setDemoOn] = React.useState(false);
  const [demoIdx, setDemoIdx] = React.useState(0);

  React.useEffect(() => {
    if (!demoOn) return;
    if (demoIdx >= demoScript.length) {
      const t = setTimeout(() => {
        setDemoOn(false);
        setDemoIdx(0);
      }, 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setDemoIdx((i) => i + 1),
      demoScript[demoIdx].ms,
    );
    return () => clearTimeout(t);
  }, [demoOn, demoIdx]);

  const liveStatus = conversation.status;
  const liveSpeaking = conversation.isSpeaking;

  const active = hasAgent
    ? liveStatus === "connected" || liveStatus === "connecting"
    : demoOn && demoIdx < demoScript.length;

  const phase: DemoPhase = hasAgent
    ? liveStatus !== "connected"
      ? "idle"
      : liveSpeaking
        ? "speaking"
        : "listening"
    : demoOn && demoIdx < demoScript.length
      ? demoScript[demoIdx].phase
      : "idle";

  const transcript = hasAgent
    ? liveStatus === "connecting"
      ? "Connecting…"
      : liveStatus === "connected"
        ? liveSpeaking
          ? `${assistantName} is speaking…`
          : "Listening…"
        : ""
    : demoOn && demoIdx < demoScript.length
      ? demoScript[demoIdx].text
      : "";

  async function handleTap() {
    if (hasAgent) {
      if (liveStatus === "connected" || liveStatus === "connecting") {
        conversation.endSession();
        return;
      }
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        conversation.startSession({
          agentId: AGENT_ID!,
          connectionType: "webrtc",
        });
      } catch (e) {
        console.warn("[voice] mic permission denied", e);
      }
      return;
    }
    if (demoOn) {
      setDemoOn(false);
      setDemoIdx(0);
    } else {
      setDemoIdx(0);
      setDemoOn(true);
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),1.75rem)]">
      <div className="pointer-events-auto flex flex-col items-center gap-4">
        {active && transcript ? (
          <div className="max-w-[22rem] rounded-full bg-popover/95 px-6 py-2.5 text-center text-base tracking-wide text-popover-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur">
            {transcript}
          </div>
        ) : (
          <div className="max-w-[22rem] rounded-full bg-popover/80 px-5 py-2 text-center text-xs uppercase tracking-widest text-muted-foreground shadow-sm ring-1 ring-foreground/5 backdrop-blur">
            Ask {assistantName}
          </div>
        )}

        <button
          type="button"
          onClick={handleTap}
          aria-label={active ? "Stop talking" : `Talk to ${assistantName}`}
          className={cn(
            "group relative grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl ring-1 ring-foreground/10 transition active:translate-y-px",
            active && "bg-foreground",
          )}
        >
          {active ? (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-foreground/30" />
              <span className="absolute -inset-2 animate-pulse rounded-full bg-foreground/10" />
              <MicOff className="relative size-7" />
            </>
          ) : (
            <Mic className="size-7" />
          )}
        </button>

        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {phase === "thinking"
            ? `${assistantName} · thinking`
            : phase === "speaking"
              ? `${assistantName} · speaking`
              : phase === "listening"
                ? `${assistantName} · listening`
                : hasAgent
                  ? `${assistantName} · ready`
                  : `${assistantName} · demo`}
        </div>
      </div>
    </div>
  );
}
