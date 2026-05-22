---
name: react-vite-auth-component-library
description: 'Build and evolve a React + Vite authentication component library. Use when scaffolding an auth UI package, defining provider/hooks/components, wiring packaging and exports, adding theming and accessibility, and validating build, typecheck, and consumer readiness.'
argument-hint: 'Describe the library goal, auth flows, target package manager, and any required components'
user-invocable: true
---

# React Vite Auth Component Library

## What This Skill Produces

This skill produces or extends a reusable authentication component library built with React and Vite. It is intended for packages that expose composable UI, provider state, hooks, and supporting build configuration for use by one or more consuming applications.

Default assumptions for this skill:

- The library is backend-agnostic and integrates through typed callbacks or adapters.
- The library ships ready-made UI, not just headless primitives.
- The default flow set includes sign-in, sign-up, password reset, and session/profile management.

## When to Use

- Create a new authentication UI library in a workspace package.
- Add login, registration, password reset, MFA, session, or profile components.
- Standardize auth state management through a provider and hooks.
- Prepare a package for internal reuse with exports, types, and build output.
- Tighten accessibility, theming, form validation, and consumer integration.

## Inputs To Confirm

Confirm these inputs before making substantial edits:

- Target package manager and workspace conventions.
- Library name and package scope.
- Auth flows to support now: sign-in, sign-up, password reset, MFA, magic link, social sign-in, session/profile.
- Whether the library owns API calls, delegates to callbacks, or wraps an existing SDK. Default to callbacks or adapters.
- Styling approach: CSS modules, plain CSS, Tailwind, design system tokens, or headless components. Default to shipping styled components with a clear theming surface.
- Output expectations: ESM only or dual ESM/CJS, declarations, CSS bundle, peer dependencies.
- Required quality gates: test framework, linting, story/demo app, accessibility checks.

If any of these are missing, stop and ask before locking in architecture.

## Procedure

1. Establish the package boundary.
   - Verify the target folder is the library package root.
   - Inspect existing workspace tooling before adding config.
   - Prefer the repo's existing package manager, TypeScript settings, linting, and test stack.
   - If the workspace is empty, scaffold the smallest Vite React library structure that can build, typecheck, and export components.

2. Define the library contract first.
   - List the public exports before implementation: provider, hooks, types, components, and utilities.
   - Separate stable public API from internal implementation details.
   - Prefer a small surface such as `AuthProvider`, `useAuth`, `SignInForm`, `SignUpForm`, `PasswordResetForm`, `SessionProfile`, and shared field/button primitives.
   - Default to callback-driven or adapter-driven auth actions so the library stays backend-agnostic.

3. Model auth state and side effects.
   - Define the session shape, user shape, loading states, error states, and auth actions.
   - Keep async auth operations behind a provider or adapter boundary.
   - Avoid coupling UI components directly to fetch logic when the package must work across multiple backends.
   - Expose typed callbacks and result states so consuming apps can integrate routing, analytics, and notifications.

4. Build the provider and hooks.
   - Implement a provider that owns auth state, initialization, and actions.
   - Add hooks for the common read/write paths, such as `useAuth`, `useSession`, or `useRequireAuth` only if the routing responsibility belongs in the library.
   - Guard hooks so they fail fast when used outside the provider.
   - Keep provider props explicit and typed.

5. Build components around the contract.
   - Implement shared form primitives only when they reduce duplication.
   - Build auth components as controlled or semi-controlled components with clear props and event contracts.
   - Design for loading, success, empty, and error states from the start.
   - Ship opinionated but overridable UI with explicit theming hooks such as CSS variables, slots, or class names.
   - Support accessibility: labels, descriptions, error messaging, keyboard flow, focus management, and semantic buttons/forms.

6. Package for reuse.
   - Configure `package.json` exports, types, peer dependencies, and side effects intentionally.
   - Use Vite library mode or the workspace's established build approach.
   - Ensure React and React DOM are peer dependencies unless the repo standard says otherwise.
   - Export only supported entry points and avoid deep imports.
   - Include generated declarations and any required CSS entry.

7. Add validation at the package level.
   - Add or align build, typecheck, lint, and test scripts.
   - Prefer focused tests for provider logic, hook behavior, and form state transitions.
   - Add at least one consumer-style check that verifies the package can be imported as intended.
   - If the repo uses stories or demos, add a minimal auth flow example there.

8. Validate consumer readiness.
   - Check the public export barrel and emitted artifacts.
   - Confirm prop names, defaults, and event contracts are consistent.
   - Confirm styles do not leak globally unless global styles are intentional.
   - Confirm the library works without hidden app-level assumptions.

## Decision Points

### API ownership

- If the package must be backend-agnostic, prefer provider callbacks or an adapter interface.
- If the package is tied to one auth service, isolate the SDK behind a thin internal service layer.

### Styling depth

- If the repo already has a design system, use its tokens and patterns.
- If reuse across multiple branded apps matters, define theme variables and document overridable class names or slots.
- If shipping ready-made UI is the goal, ensure the defaults look complete without forcing consumers to replace core markup.

### Routing responsibility

- If consumers use different routers, avoid embedding route transitions in core components.
- If route guards are required, expose optional integration helpers instead of making the provider router-specific.

### State persistence

- If session persistence varies by app, keep storage strategy configurable.
- If secure persistence is mandatory, document that token storage policy is owned by the consuming app unless the platform standard is explicit.

## Quality Criteria

The skill is complete when all of the following are true:

- The package builds without consumer-specific hacks.
- Public exports are intentional, typed, and documented through names and structure.
- Auth state, loading, and error transitions are represented explicitly.
- Core components are accessible and handle validation and async states cleanly.
- The library can be consumed by another app in the workspace, or by a minimal local verification path.
- Build, typecheck, and any existing lint or tests pass for the touched package.

## Completion Checks

Run the narrowest relevant checks after edits:

- Package build
- Package typecheck
- Package tests for provider/hooks/components touched
- Consumer import smoke check if available

If a requested feature would force undocumented API, hidden global state, or router/backend lock-in, pause and clarify before implementing.

## Prompt Examples

- Build a React Vite auth component library in this package with `AuthProvider`, `useAuth`, and sign-in/sign-up/reset forms.
- Extend this auth package with MFA components and typed provider callbacks while keeping it backend-agnostic.
- Set up Vite library mode, exports, peer dependencies, and a smoke test for a reusable auth UI package.