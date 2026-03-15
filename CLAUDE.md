# MedSign — Claude Code Configuration

## Project Overview

MedSign is a HIPAA-compliant electronic signature system for pharmacies. It captures patient signatures for prescription verification with bilingual (EN/ES) support.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom pharmacy color palette
- **Components:** Radix UI primitives + custom components
- **Icons:** Lucide React

## Directory Structure

```
src/
  app/          ← All pages live here (App Router)
  components/   ← Reusable components (ui/ for primitives)
  contexts/     ← React context (language-context.tsx)
  lib/          ← Utilities
```

**Important:** `@/*` path alias maps to `./src/*` (see tsconfig.json).

## Conventions

- All new pages go in `src/app/`
- All new components go in `src/components/`
- Use `useLanguage()` hook for any user-facing text (EN/ES support required)
- No backend yet — app is currently frontend-only with mock data
- Pharmacy color tokens: `pharmacy-primary`, `pharmacy-secondary`, `pharmacy-accent`, `pharmacy-light`

## Running Locally

```bash
npm run dev    # starts on localhost:3000 with Turbopack
npm run build
npm run lint
```

## Known Issues / Decisions

- Root `/app/` directory was removed in favor of `src/app/` — do not recreate it
