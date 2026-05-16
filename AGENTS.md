<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Rosewood Sand Hill — Hyper-Personalized Arrival

Built for **Hospitality 2030: A Rosewood Sand Hill Hackathon** (Anthropic, ElevenLabs, Greycroft).

## The problem statement

Rosewood's *"A Sense of Place"* philosophy means every property is deeply tied to its local culture — but guests often experience a generic luxury arrival. The challenge: synthesize guest history, real-time flight data, wellness/recovery signals, stated preferences, social signals, and local context to choreograph a truly **bespoke arrival before the guest walks in the door** — while maintaining trust, consent, and subtlety.

## What we're building

A **mobile-first web app** that gives the guest a single curated view of their upcoming stay at Rosewood Sand Hill, plus a Siri-style voice assistant they can talk to.

The home screen is a stack of cards, each surfacing one dimension of the orchestrated arrival:

- **Trip header** — property, dates, room, countdown
- **Flight & arrival ETA** — live flight status, driver dispatched, ETA at property
- **Room readiness** — temperature, lighting scene, aromatherapy, pillow firmness — all pre-set from past stays
- **Wellness & recovery** — jet-lag forecast, hydration plan, suggested spa/movement based on travel fatigue
- **Welcome amenity** — locally-sourced, personalized (e.g. Sand Hill Road vineyard pick for a wine-loving guest)
- **Pre-loaded itinerary** — dinner reservations, trail walks, Stanford-area picks based on past preferences
- **A Sense of Place** — local culture moments curated to this specific guest
- **Privacy & consent** — what signals we used, what to mute, transparent controls

Anchored at the bottom: a **floating Siri-like voice bubble** the guest taps to ask anything ("move my dinner later", "is my room ready?", "what's nearby tonight?").

## Stack

- Next.js 16 (App Router, RSC) + React 19
- Tailwind v4
- shadcn/ui — **sera** style, taupe base color (luxe, editorial)
- Playfair Display (headings) + Noto Sans (body) — already wired in `app/layout.tsx`
- Mock data only for now; voice agent + backend come later

## Design principles

- **Subtle, not assistive-tech.** This is luxury. White space, editorial typography, restrained motion.
- **Earned trust.** Every personalization should make it obvious *why* it's there and how to turn it off.
- **Single scroll.** Whole experience fits on the phone, no nav, no tabs. Voice is the second surface.
