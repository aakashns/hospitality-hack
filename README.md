# Sera — Rosewood Sand Hill arrival concierge

Built for **Hospitality 2030**, a Rosewood Sand Hill hackathon (Anthropic, ElevenLabs, Greycroft).

## What it is

A mobile-first web app that gives a luxury guest a single, curated view of their upcoming stay at Rosewood Sand Hill — and a voice concierge, **Sera**, who can read the same context and act on it in real time.

## What it does

The home screen is a single scroll of cards: trip header (property, dates, host), flight & driver dispatch, suite readiness (climate, lighting, aromatherapy, bath), wellness signals (jet-lag forecast, recovery), welcome amenity, pre-loaded itinerary, sense of place, and signals & consent. Everything is sourced from a typed mock trip, but the app is designed so any field could be live data.

The floating Sera button opens a voice conversation. The agent receives the full guest context at session start, can scroll the page to relevant sections, and can act through client tools:

- `scroll_to_section` — bring a card into view, with a soft amber pulse to draw attention
- `change_stay` — adjust arrival or departure (ISO dates); nights are recomputed
- `change_room` — switch between Hillside Suite, Vineyard Suite, or Tree House Bungalow
- `change_room_setting` — adjust temperature, lighting, aromatherapy, pillow, bath
- `toggle_welcome_amenity` — accept or decline the welcome amenity
- `change_itinerary` — add (from a curated list of 13 recommendations), remove, or update activities

Mutations flow through a React context, so cards update live and the changed field flashes briefly.

## Stack

- **Next.js 16** (App Router, React Server Components) + **React 19**
- **Tailwind v4** + **shadcn/ui** (sera style, taupe base)
- **ElevenLabs Conversational AI** (`@elevenlabs/react`) — WebSocket voice session, client tools, dynamic system-prompt overrides per session
- **Claude Sonnet 4.5** (configured as the LLM behind the ElevenLabs agent) — tool-calling and brief, warm conversational style

## Running it

```bash
npm install
```

Create `.env.local` in the project root:

```
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxxxxxxx
```

The agent must be configured in the ElevenLabs dashboard as Public, with system-prompt and first-message overrides enabled, and the six client tools above defined (names must match exactly). Without an agent ID, the app falls back to a scripted demo so the voice surface still works.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to look

- `app/page.tsx` — the single-screen layout, cards, fade-in animation, field-flash on change
- `components/voice-chat.tsx` — floating Sera surface, session lifecycle, client tool handlers
- `components/trip-context.tsx` — typed trip state and the mutation surface tools call into
- `lib/agent-prompt.ts` — dynamic system prompt built per session from the current trip + conversation history
- `lib/mock-trip.ts` — guest, stay, room options, itinerary recommendations
