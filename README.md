# IALFM App

IALFM is a cross‑platform Expo (React Native) app for the Islamic Association of Lewisville and Flower Mound (Texas). It surfaces real‑time prayer schedules, a rich dua library, community announcements, and quick contact links so community members can stay connected on iOS, Android, and the web.

## Features
- **Prayer times powered by location**: Uses Expo Location + Aladhan API to fetch daily salah times, highlights the current/next prayer, and handles Friday (Jummah) timing.
- **Dua collection**: 40+ daily duas with Arabic, transliteration, translations, benefits, and sources.
- **Community hub**: Home carousel, announcements feed, programs, calendar, and donation links.
- **Contact & navigation**: Email modal (Gmail or mail app), phone/website shortcuts, and map deep links.
- **Offline awareness**: NetInfo monitoring with an offline screen and graceful fallbacks.
- **Polished UI**: Expo Router navigation, Safe Area handling, React Native Paper styles, and Reanimated animations/carousels.

## Tech stack
- Expo 53 / React Native 0.79 / React 19 with Expo Router.
- TypeScript with context providers for location, prayer times, and internet status.
- UI utilities and components in `components/`, data helpers in `constants/` and `utils/`, and API calls in `apis/`.

## Project structure (high level)
```
app/                 Expo Router screens (tabs, menus, modals, offline view)
components/          Shared UI (Themed wrapper, SocialButtons, MenuBox, etc.)
context/             Providers: internet, location, prayer times
apis/                Location and prayer-time fetchers plus date helpers
constants/           Theme colors and dua data
utils/               Announcement data + helpers
assets/              Images and fonts used across the app
```

## Getting started
1) **Prerequisites**: Node 18+ and Expo tooling. Enable Corepack for pnpm (`corepack enable`).
2) **Install**: `corepack pnpm install --frozen-lockfile`
3) **Run**:
   - Metro/dev server: `corepack pnpm start`
   - Android emulator/device: `corepack pnpm android`
   - iOS simulator: `corepack pnpm ios`
   - Web: `corepack pnpm web`

When launching on a device/emulator, allow **location** permission so prayer times can be calculated from the current coordinates.

## Testing
Run Jest (watch disabled): `corepack pnpm test -- --watchAll=false`

> Note: No test suites exist yet; the command will exit cleanly when none are found.

## Key configuration & behaviors
- Prayer times: `apis/getPrayerTimes.ts` calls the Aladhan API using geolocation and formats times to 12‑hour display.
- Offline handling: `context/internetContext.tsx` watches connectivity and routes to `app/is-offline`.
- Data sources: Announcements in `utils/announcementsData.ts`, dua content in `constants/Duas.ts`.
- Navigation: `app/_layout.tsx` sets up providers and stack routing; tabs live under `app/(tabs)`.
