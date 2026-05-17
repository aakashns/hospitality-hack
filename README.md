# Sera — AI Concierge for Rosewood Hotels

Built for **Hospitality 2030**, a Rosewood Sand Hill hackathon (Anthropic, ElevenLabs, Greycroft).

This project demonstrates what the hotel arrival & stay experience of the future looks like. Demo (turn on sound):

https://github.com/user-attachments/assets/5543ac78-48cf-447f-88b1-d3444ba51773

"Sera" is a voice-based AI concierge for Rosewood hotels & resorts to provide a carefully crafted personalized welcome & stay for regular guests. Guests feel recognized & cared for.

Based on the booking & flight details, and the guest's previous stay at Rosewood hotels, Sera schedules pick-up, sets the room ambience, and recommends activities at the property.

On the booking page, guests do the following simply by talking to Sera:
- Review details about their stay, flight, pick-up etc.
- Change their check in (arrival) & check out (departure) dates 
- Request room temperature, lighting, aroma, bath water changes
- Review recommended activities & reschedule them if needed
- learn more about the neighborhood and place of interest
- and much more..

The experience of talking to Sera on the booking page is almost magical: 
- As you ask for information, the page is automatically scrolled to the relevant section. 
- When you request changes, they are highlighted on the screen to offer real-time feedback. - You can view a transcript of your conversation with Sera as an overlay or hide it away.
All of this is achieved using tools made available to the agent.

The app is built using React & Next.js, and it uses Eleven Labs for text-to-speech and speech-to-text and Claude 4.5 Sonnet as the intelligence layer.


## Running it

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root:

```
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxxxxxxx
```

The agent must be configured in the ElevenLabs dashboard as Public, with system-prompt and first-message overrides enabled. The agent must have the following client tools configured on the Eleven Labs dashboard:

- `scroll_to_section`: bring a card into view, with a soft amber pulse to draw attention
- `change_stay`: adjust arrival or departure (ISO dates); nights are recomputed
- `change_room`: switch between Hillside Suite, Vineyard Suite, or Tree House Bungalow
- `change_room_setting`: adjust temperature, lighting, aromatherapy, pillow, bath
- `toggle_welcome_amenity`: accept or decline the welcome amenity
- `change_itinerary`: add (from a curated list of 13 recommendations), remove, or update activities

**NOTE:** Without an agent ID, the app falls back to a scripted demo so the voice surface still works.

3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to look

- `app/page.tsx`: the single-screen layout, cards, fade-in animation, field-flash on change
- `components/voice-chat.tsx`: floating Sera surface, session lifecycle, client tool handlers
- `components/trip-context.tsx`: typed trip state and the mutation surface tools call into
- `lib/agent-prompt.ts`: dynamic system prompt built per session from the current trip + conversation history
