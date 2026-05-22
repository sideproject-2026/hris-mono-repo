# E-Portal Agent Guide

## Scope
- This file applies to `apps/e-portal`.
- Follow the workspace-wide rules in [../../AGENTS.md](../../AGENTS.md) first, then use the app-specific guidance below.

## Stack
- React 19 + TypeScript + Vite.
- TanStack Router with file-based routes under `src/routes` and generated output in `src/routeTree.gen.ts`.
- React Query is wired in `src/main.tsx`.
- Tailwind CSS v4 and Shadcn-style UI primitives back the UI layer.
- The app consumes workspace packages `@cwmsi/auth-package` and `@hris/shared-ui`.

## Commands
- Install dependencies from the repo root: `pnpm install`
- Start this app from the repo root: `pnpm --filter e-portal dev`
- Build this app from the repo root: `pnpm --filter e-portal build`
- Run this app's tests from the repo root: `pnpm --filter e-portal test`

## Routing
- Add and change routes through files in `src/routes`.
- Do not manually edit `src/routeTree.gen.ts`; the TanStack Router plugin regenerates it.
- Keep route work focused on the smallest relevant route file, parent layout route, or router setup.
- Preserve the current route shell split:
	- `src/routes/__root.tsx` for the root wrapper
	- `src/routes/_auth.tsx` for auth layout/routes
	- `src/routes/_main.tsx` for the main application shell

## Structure
- Put reusable primitives in `src/components/ui`.
- Put shared composed components in `src/components/*`.
- Put domain behavior, screens, and domain-specific hooks/types under `src/features/<feature>`.
- Put app-wide hooks in `src/hooks`, shared utilities in `src/lib`, and global constants/types in `src/types`.
- Keep route definitions in `src/routes`, not in feature folders.

## UI And State
- Prefer composing existing Shadcn-style components from `src/components/ui` before adding new primitives.
- Prefer existing shared components from `src/components/*` before creating feature-local reusable UI.
- Keep generic reusable UI out of `src/features`.
- Reuse the existing React Query provider setup in `src/main.tsx` instead of introducing parallel app-wide providers.

## Workspace Dependencies
- `src/features/auth` integrates with `@cwmsi/auth-package`; keep auth state and schema changes aligned with that package's public exports.
- If an import or type issue points into a workspace package, validate the package itself before changing app-side workarounds.

## References
- Scripts: [package.json](package.json)
- Entry point: [src/main.tsx](src/main.tsx)
- Starter docs: [README.md](README.md)