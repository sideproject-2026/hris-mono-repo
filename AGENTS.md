# HRIS Monorepo Agent Guide

## Scope
- This repository is a pnpm workspace with apps under `apps/*` and shared packages under `packages/*`.
- Prefer workspace-root commands unless you are intentionally working inside a single package.
- Use `pnpm`, not `npm`, for install, dev, build, and filter workflows.

## Workspace Map
- `apps/e-portal`: main HRIS portal app built with React, Vite, TanStack Router, Tailwind CSS v4, and Shadcn-style UI primitives.
- `apps/web`: smaller React + TanStack Router app used as the current root-level build and lint target.
- `packages/shared-ui`: shared components.
- `packages/auth-package`: authentication package exposing `<AuthProvider>`.

## Commands
- Install all dependencies: `pnpm install`
- Run the default web app: `pnpm dev`
- Run the portal app: `pnpm dev:portal`
- Build the default root target: `pnpm build`
- Lint the default root target: `pnpm lint`
- Build one workspace package directly: `pnpm --filter <name> build`
- Run one workspace package directly: `pnpm --filter <name> dev`

## Validation
- Root `build` and `lint` only target `apps/web`; they do not validate the whole monorepo.
- For changes in `apps/e-portal`, prefer `pnpm --filter e-portal build` or `pnpm --filter e-portal test`.
- For changes in shared packages, validate the touched package directly with `pnpm --filter <package-name> build`.
- When `e-portal` changes rely on workspace packages, check `@cwmsi/auth-package` and `@hris/shared-ui` rather than assuming the app is the only failing surface.

## Frontend Conventions
- TanStack Router is file-based. Add or change routes through files in each app's `src/routes` folder.
- Do not manually edit generated router output such as `src/routeTree.gen.ts`.
- Keep route structure in route files, feature behavior in feature folders, and reusable presentation components in shared component folders.
- Prefer existing Shadcn-style primitives and composed components before adding new UI building blocks.

## Monorepo Boundaries
- Keep app-specific code inside its owning app unless the code is intentionally shared.
- Put cross-app reusable code in `packages/*` only when more than one workspace consumer needs it.
- Preserve package public entry points and exports when editing shared packages.

## References
- Root scripts: [package.json](package.json)
- Workspace layout: [pnpm-workspace.yaml](pnpm-workspace.yaml)
- Portal app notes: [apps/e-portal/AGENTS.md](apps/e-portal/AGENTS.md)
- Portal starter docs: [apps/e-portal/README.md](apps/e-portal/README.md)
- Web app starter docs: [apps/web/README.md](apps/web/README.md)