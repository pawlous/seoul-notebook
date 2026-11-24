# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
The owner and their travel companions on the same Seoul trip. Each person opens the notebook on their own device: on a laptop while planning before the trip, and on a phone while walking around Seoul to check the next stop, open Naver Map, and add notes.

## Product Purpose
A personal travel notebook for Seoul trips. It shows each day's plan (flights, times, places, suggested periods), lets people keep notes on every stop, and links each place to Naver Map. Success means anyone on the trip can tell at a glance what is next today and get there.

## Positioning
Not a generic trip planner: it is one specific itinerary, written in Traditional Chinese, with real Naver Map links and personal notes attached to each stop.

## Operating Context
- Two trips: 2026.12.26–12.29 (default, 四天三夜) and 2026.10.13–10.17 (`?trip=october`).
- Used both on desktop (planning) and on phones in the street (day-of use, often one-handed and outdoors).
- Notes are stored in localStorage when signed out, or in Supabase per account when signed in; "匯入此裝置備註" copies device notes to the cloud without overwriting.

## Capabilities and Constraints
- Static Vite + React site deployed to GitHub Pages under `/seoul-notebook/`.
- Features that must stay: day tabs, suggested periods, per-stop notes with edit/save/cancel, sign-in/sign-out, import, reload, trip switcher, Naver Map links.
- All existing copy stays as written (confirmed by the owner).

## Brand Commitments
- Name: 首爾散步手帳 / "SEOUL ／ 我的旅行手帳"; trip titles "冬日首爾，慢慢走。" and "首爾，慢慢走。".
- The navy blue (currently `#163b9c`) stays as the main brand color (confirmed by the owner).
- Requested feel for the redesign: fashionable, minimal, stylish (時尚簡約有風格設計感).

## Evidence on Hand
- Itinerary data: `lib/december-itinerary.json`, `lib/itinerary.json`, `lib/day-plan.ts`.
- Header illustration: authored SVG line drawing of Seoul landmarks (`src/SeoulSkyline.tsx`). The earlier DDP photo (CC BY 2.0) was removed at the owner's request, along with its credit.

## Product Principles
1. What is next today must be findable in one glance on a phone.
2. Places are one tap from Naver Map.
3. Notes are personal and never lost: drafts are kept on failure, imports never overwrite.
4. Calm and unhurried, matching "慢慢走".
