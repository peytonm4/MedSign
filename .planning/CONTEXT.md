# MedSign — Planning Context

## Current State (2026-03-15)

App was originally built in v0 (Vercel's AI UI builder) and exported. It has a working frontend with all pages but cannot run locally due to a directory conflict.

### App Flow

1. `/` — Login (patient: RX code + DOB | staff: username + password)
2. `/verify` — Patient identity verification
3. `/consent` — HIPAA consent form with zoom
4. `/signature` — Canvas signature pad (touch + mouse)
5. `/confirmation` — Success screen
6. `/dashboard` — Staff dashboard (prescription list, status tracking, metrics)

### Status

- **Frontend:** Complete (all pages implemented, bilingual EN/ES)
- **Backend:** None — all data is mocked/static
- **Auth:** None — login forms exist but don't validate
- **Database:** None

---

## Session Log

### 2026-03-15 — Fix local dev environment

**Problem:** App cannot run locally. Root cause is a conflicting directory structure left over from the v0 export. Next.js resolves `/app/` (root level) as the App Router, ignoring `src/app/` where all actual pages live. `tsconfig.json` has `@/* → ./src/*`, confirming `src/` is the intended source root.

**Fix plan:**
- Migrate `/app/page.tsx` → `src/app/page.tsx` (login page, currently only in root)
- Migrate `/app/layout.tsx` content → verify `src/app/layout.tsx` is complete (currently missing — root layout is the only one)
- Move `/app/dashboard/loading.tsx` → `src/app/dashboard/loading.tsx`
- Delete root `/app/` directory

**Files affected:**
- `/app/page.tsx` — moved to `src/app/page.tsx`, fixed broken relative import on `useLanguage`
- `/app/layout.tsx` — moved to `src/app/layout.tsx`
- `/app/dashboard/loading.tsx` — moved to `src/app/dashboard/loading.tsx`
- `/app/` — deleted

**Status: Complete. App runs locally on `npm run dev`.**

---

### 2026-03-15 — iPad kiosk UX improvements

**Context:** App is used on a shared iPad in-person at a pharmacy counter by patients picking up prescriptions.

**Changes:**
- `src/components/signature-pad.tsx` — canvas height `h-[200px]` → `h-[50vh]`, stroke width 2 → 3 for finger drawing
- `src/app/signature/page.tsx` — card width `max-w-md` → `max-w-2xl` to fill iPad width
- `src/app/confirmation/page.tsx` — added 60-second countdown timer that auto-redirects to `/` to reset the kiosk for the next patient

**Committed and pushed to `main` (5358fba).**

---

## Current Status (end of 2026-03-15 session)

- **Frontend:** Complete, runs locally
- **Backend:** None — all data is mocked/static
- **Auth:** None — login forms exist but don't validate
- **Database:** None

## Backlog / Next Up

- Step progress indicator on patient flow (verify → consent → signature → confirmation)
- Larger touch targets / custom numeric pad for RX code and DOB inputs
- Session timeout on other patient pages (not just confirmation)
- Consent page accordion to reduce wall-of-text
- Dashboard empty/loading states
- Language switcher moved into header instead of absolute positioned
