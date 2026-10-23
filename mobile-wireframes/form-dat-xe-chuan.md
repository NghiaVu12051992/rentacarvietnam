# Standard Mobile Booking Wizard (CarRentalRequestWizard)
> **Source Model**: Reused directly from `CarRentalRequestWizard.astro` in `website-vntoyou-ver2`.
> **Language Deployment**: **English (en)** as the primary international version.
> **UX Philosophy**: **100% Tap & Go (Duolingo-style)** — Zero friction, no lengthy keyboard inputs on mobile. Large tap targets for thumbs. Complete inquiry in under 15 seconds.

---

### Step-by-Step Mobile Screen Flows (Viewport 375px - 414px)

```
┌───────────────────────────────────────────────┐ 📱 Mobile Screen (375px - 414px)
│ ┌───────────────────────────────────────────┐ │
│ │  GET ITINERARY ADVICE & CAR QUOTE         │ │ <- Header
│ │  [━━━━━━━░░░░░░░░░░░░░░░░░░░░░░░░] 1/5    │ │ <- Duolingo Progress Bar
│ │ ───────────────────────────────────────── │ │
│ │                                           │ │
│ │ STEP 1: HOW MANY PASSENGERS?              │ │ <- Big Question Title
│ │ (Tap to select & auto-advance)            │ │
│ │                                           │ │
│ │ ┌───────────────────┬───────────────────┐ │ │
│ │ │ 👤 1–3 Pax        │ 👥 4–7 Pax        │ │ │ <- Large Tap Cards (.p-duo-card)
│ │ │ (SUV / Sedan)     │ (SUV / Minivan)   │ │ │    Active state: .is-active
│ │ ├───────────────────┼───────────────────┤ │ │
│ │ │ 🚐 8–15 Pax       │ 🚌 16–24 Pax      │ │ │
│ │ │ (16-Seat Van)     │ (29-Seat Midi Bus)│ │ │
│ │ ├───────────────────┴───────────────────┤ │ │
│ │ │ 🚌 25–45+ Pax (Universe Tour Coach)   │ │ │
│ │ └───────────────────────────────────────┘ │ │
│ │                                           │ │
│ │ 🔒 Free Advice • Direct Local Fleet       │ │ <- Trust Badge
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────┐ │
│ │ [← Back]                                  │ │
│ │  GET ITINERARY ADVICE & CAR QUOTE         │ │
│ │  [━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░] 2/5    │ │
│ │ ───────────────────────────────────────── │ │
│ │                                           │ │
│ │ STEP 2: HOW MANY DAYS DO YOU NEED?        │ │
│ │                                           │ │
│ │ ┌───────────────────┬───────────────────┐ │ │
│ │ │ ⏱️ 1 Day          │ 🗓️ 2 Days         │ │ │ <- Single Tap advances to Step 3
│ │ │ (Airport / City)  │ (Overnight Trip)  │ │ │
│ │ ├───────────────────┼───────────────────┤ │ │
│ │ │ 🏞️ 3 Days         │ ⛰️ 4+ Days (Tour) │ │ │
│ │ │ (Sapa / Ninh Binh)│ (Ha Giang Loop)   │ │ │
│ │ └───────────────────┴───────────────────┘ │ │
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────┐ │
│ │ [← Back]                                  │ │
│ │  GET ITINERARY ADVICE & CAR QUOTE         │ │
│ │  [━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░] 3/5    │ │
│ │ ───────────────────────────────────────── │ │
│ │                                           │ │
│ │ STEP 3: WHERE DO YOU START OR TRAVEL TO?  │ │
│ │                                           │ │
│ │ ┌───────────────────┬───────────────────┐ │ │
│ │ │ ✈️ Noi Bai Airport │ 🏙️ Hanoi Downtown │ │ │
│ │ ├───────────────────┼───────────────────┤ │ │
│ │ │ 🏞️ Sapa Town      │ ⛵ Halong Bay Port │ │ │
│ │ ├───────────────────┼───────────────────┤ │ │
│ │ │ ⛰️ Ninh Binh      │ 📝 Other / Custom │ │ │
│ │ └───────────────────┴───────────────────┘ │ │
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────┐ │
│ │ [← Back]                                  │ │
│ │  GET ITINERARY ADVICE & CAR QUOTE         │ │
│ │  [━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░] 4/5    │ │
│ │ ───────────────────────────────────────── │ │
│ │                                           │ │
│ │ STEP 4: WHEN DO YOU NEED THE VEHICLE?     │ │
│ │                                           │ │
│ │ ┌───────────────────┬───────────────────┐ │ │
│ │ │ ⚡ Today          │ 📅 Tomorrow       │ │ │
│ │ ├───────────────────┼───────────────────┤ │ │
│ │ │ 🗓️ Pick a Date    │ 🕒 Not sure yet   │ │ │
│ │ └───────────────────┴───────────────────┘ │ │
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────┐ │
│ │ [← Back]                                  │ │
│ │  GET ITINERARY ADVICE & CAR QUOTE         │ │
│ │  [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━] 5/5    │ │
│ │ ───────────────────────────────────────── │ │
│ │                                           │ │
│ │ STEP 5: HOW SHOULD WE SEND YOUR QUOTE?    │ │
│ │                                           │ │
│ │ 📋 Your Selected Trip Summary:            │ │ <- Auto summary pill
│ │ [ 4–7 Pax | 2 Days | Hanoi ➔ Sapa ]       │ │
│ │                                           │ │
│ │ 📱 WhatsApp / Viber Number *              │ │ <- The ONLY essential input!
│ │ ┌───────────────────────────────────────┐ │ │
│ │ │ +1 / +44 / +84... Phone number        │ │ │
│ │ └───────────────────────────────────────┘ │ │
│ │                                           │ │
│ │ ✉️ Email (Optional backup)                │ │
│ │ ┌───────────────────────────────────────┐ │ │
│ │ │ name@example.com                      │ │ │
│ │ └───────────────────────────────────────┘ │ │
│ │                                           │ │
│ │ 🏷️ Quick Options (Tap to add):            │ │
│ │ (✈️ Airport Pickup) (👶 Child Seat)       │ │
│ │ (🧳 Extra Luggage)  (⛳ Golf Bags)         │ │
│ │                                           │ │
│ │ ┌───────────────────────────────────────┐ │ │
│ │ │ 🚀 GET MY FREE QUOTE (WITHIN 15 MINS) │ │ │ <- High-contrast Primary Button
│ │ └───────────────────────────────────────┘ │ │
│ │                                           │ │
│ │ 🔒 No upfront deposit • 100% transparent  │ │
│ │    All-inclusive with driver & tolls.     │ │
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

---

### Technical Implementation & Data Mapping (Cloudflare D1 + Astro)

1. **State Persistence**: 
   - State stored in lightweight client JS (zero dependency, < 2KB).
   - Auto-advance on card clicks (Step 1 -> 2 -> 3 -> 4) without page reload.
2. **Cloudflare D1 Edge Insertion**:
   - `POST /api/quote`:
     ```sql
     INSERT INTO quotes (
       pax, days, destination, travel_date, contact_phone, contact_email, notes, created_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'));
     ```
3. **Instant Operator Dispatch**:
   - Webhook trigger to Telegram / WhatsApp / Resend email immediately notifying dispatch team.
