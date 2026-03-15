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
- `/app/page.tsx` — move to `src/app/page.tsx`
- `/app/layout.tsx` — move to `src/app/layout.tsx`
- `/app/dashboard/loading.tsx` — move to `src/app/dashboard/loading.tsx`
- `/app/` — delete after migration
