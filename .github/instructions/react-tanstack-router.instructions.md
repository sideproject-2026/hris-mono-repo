---
applyTo: "apps/*/src/**/*.{ts,tsx}"
description: "Use when working in React app source files in this monorepo, especially for TanStack Router routes, Shadcn-style UI, shared components, and app/package boundaries."
---

# React App Source Rules

- This workspace uses React + Vite + TypeScript with TanStack Router file-based routing.
- Treat `src/routeTree.gen.ts` as generated output and never edit it manually.
- Keep route structure in `src/routes`; do not hide route definitions inside feature folders.
- Prefer the smallest route-local change first before widening edits into layout or app bootstrap files.

# UI Composition

- Prefer existing Shadcn-style primitives in `src/components/ui` before creating new UI primitives.
- Prefer existing composed components in `src/components/*` before creating feature-local reusable components.
- Keep generic reusable UI out of `src/features`; feature folders should own domain behavior, not app-wide primitives.

# Shared Package Boundaries

- Use workspace packages through their public exports rather than deep-importing internal files.
- If app code depends on `@cwmsi/auth-package` or `@hris/shared-ui`, fix package exports or package code at the source instead of duplicating logic in the app.

# Validation

- For app changes, prefer `pnpm --filter <app-name> build` or the narrowest package-specific command over root scripts.
- Root `pnpm build` and `pnpm lint` currently validate `apps/web`, not every workspace package.