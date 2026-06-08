# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use `pnpm` exclusively — never `npm` or `yarn`. Required version: pnpm 10.14.0.

## Common Commands

```bash
# Install all dependencies
pnpm install

# Dev servers
pnpm dev                          # apps/hris-app (default root target)
pnpm dev:hris-app                 # apps/hris-app (explicit)
pnpm dev:portal                   # apps/e-portal
pnpm --filter <name> dev          # any specific workspace package

# Build & lint (root targets apps/hris-app only — does NOT validate the full monorepo)
pnpm build
pnpm lint

# Validate individual apps/packages
pnpm --filter hris-app build
pnpm --filter hris-app test
pnpm --filter e-portal build      # runs vite build && tsc (includes type check)
pnpm --filter e-portal test
pnpm --filter <package-name> build

# Add shadcn components (run from inside the target app directory)
pnpx shadcn@latest add <component>
```

## Workspace Structure

```
apps/
  hris-app/     - Main HRIS admin application (port 3000); root build/lint target
  e-portal/     - Employee self-service portal
  web/          - Smaller legacy app (no longer the root build target)
packages/
  auth-package/ - @cwmsi/auth-package — AuthProvider and auth state/schema
  shared-ui/    - @hris/shared-ui — Shadcn-style UI primitives and composed components
```

## Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Routing**: TanStack Router v1 — file-based routes under `src/routes/`; `src/routeTree.gen.ts` is auto-generated — **never edit it manually**
- **Server state**: TanStack Query
- **Client state**: Zustand, Jotai, Nuqs (URL state)
- **Styling**: Tailwind CSS v4 + Radix UI + Shadcn-style component composition
- **Forms**: React Hook Form + Zod

---

## Architecture Conventions

### hris-app Route Layout

Routes live under `src/routes/`. The layout split:
- `__root.tsx` — root wrapper, injects `queryClient` via `createRootRouteWithContext`
- `_login.tsx` / `_login/` — unauthenticated login flow
- `_app.tsx` / `_app/` — authenticated shell (wraps `AuthProvider`, `SidebarProvider`, `ConfirmDialogProvider`, `JobStatusTrackingProvider`)

All authenticated pages go under `_app/`. The `_app.tsx` layout renders the sidebar and header — pages don't need to include these themselves.

### hris-app Feature Domains

Features under `src/features/`:
- `admin`, `attendance-management`, `attendance-policy`, `auth`, `calendar`, `dashboard`
- `employee-master` (sub-feature: `employees`)
- `employee-setup`, `form-request`, `hr-forms`, `layouts`, `leave`, `reports`, `work-schedules`

### Feature Structure (per app)
```
src/
  routes/          - Route definitions only (no business logic)
  features/<name>/ - Domain screens, hooks, types
    components/    - Feature-local components
    hooks/         - Feature hooks and query options
    types/         - Zod schemas, enums, model types
  components/ui/   - Shadcn-style primitives
  components/      - Shared composed components
  hooks/           - App-wide hooks
  lib/             - Shared utilities
  types/           - Global constants and types
```

### Routing
- Add/change routes by creating/editing files under `src/routes/`
- e-portal route shell: `__root.tsx` (root wrapper), `_auth.tsx` (auth layout), `_main.tsx` (main shell)
- Dynamic segments: `$param.tsx`; pathless layout groups: `_layout.tsx`

### Monorepo Boundaries
- Keep app-specific code inside its app
- Move code to `packages/` only when 2+ apps need it
- Prefer existing Shadcn primitives and composed components before adding new UI building blocks
- Preserve public entry points and exports when editing packages

### Validation After Changes
- Changes in `apps/hris-app` → run `pnpm --filter hris-app build`
- Changes in `apps/e-portal` → run `pnpm --filter e-portal build`
- Changes in shared packages → validate the package directly with `pnpm --filter <name> build`
- When app changes touch workspace packages, also check `@cwmsi/auth-package` and `@hris/shared-ui`

---

## Code Style

- Prettier: no semicolons, single quotes, trailing commas
- ESLint base: `@tanstack/eslint-config` (many strict rules relaxed)

---

## API & HTTP

### HTTP Client (`src/lib/http.ts`)

Use the `request` helper — never call `axios` directly in feature code:

```ts
request.get<T>(url)
request.post<T>(url, body)
request.put<T>(url, body)
request.patch<T>(url, body)
request.del(url)
request.fullDelete(url, body)          // DELETE with a JSON body
request.postFormData<T>(url, formData) // multipart/form-data
request.exportExcel(url, filename)     // triggers file download
```

The client attaches Bearer tokens from `LocalStorageAuth`, handles 401s with a single shared refresh promise, and reads `VITE_API_URL` for the base URL.

### API Routes (`src/types/api-routes.ts`)

All endpoint strings live in the `ApiRoutes` constant — never hardcode URL strings in feature code:

```ts
import { ApiRoutes } from '@/types/api-routes'

ApiRoutes.EMPLOYEES.LIST               // '/employees'
ApiRoutes.EMPLOYEES.BY_ID(id)          // '/employees/:id'
ApiRoutes.ATTENDANCE_PERIODS.SHEETS(periodId)
```

### Global Type Declarations (`src/types/global.d.ts`)

These are available everywhere without importing:

```ts
APIResponse<T>     // { data: T; time: Date }
SelectionItem<T>   // { value: T; text: string }
AuthState          // full auth token state shape
PageType           // { pageNumber: number; pageSize: number }
CodeValue          // { code: number; strCode: string }
JobStatus          // async job tracking shape
```

---

## Shadcn / Radix UI

**Adding components** (run from within the target app directory):
```bash
pnpx shadcn@latest add <component>
```

**Component pattern** — all primitives wrap Radix UI and follow this structure:
- Use `class-variance-authority` (CVA) for variant definitions
- Use `cn()` from `@hris/shared-ui` (clsx + tailwind-merge) for class merging
- Accept `asChild` via Radix `Slot` for polymorphic composition

```tsx
import { cn } from '@hris/shared-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva('base-classes', {
  variants: { variant: { default: '...', outline: '...' } },
  defaultVariants: { variant: 'default' },
})

function Button({ className, variant, asChild, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />
}
```

---

## `@hris/shared-ui`

`shared-ui` has a **single barrel export** — always import from `'@hris/shared-ui'`, never from subpaths:

```tsx
// Correct
import { Button, Badge, DropdownMenu } from '@hris/shared-ui'
import { InputField, SelectField, DatePickerField } from '@hris/shared-ui'
import { PageContainer, HeaderContainer, HeaderBackButton } from '@hris/shared-ui'
import { ConfirmDialogProvider, useConfirmationContext } from '@hris/shared-ui'
import { DataTable, DGridProvider, DGridTable } from '@hris/shared-ui'

// Wrong — subpath exports do not exist
import { Button } from '@hris/shared-ui/button'
```

**Form-integrated inputs** — use shared-ui field components inside React Hook Form contexts. They render `FormField > FormItem > FormLabel > FormControl > FormMessage` internally:

```tsx
import { InputField, SelectField, DatePickerField, ComboboxField } from '@hris/shared-ui'

<InputField control={control} name="firstName" label="First Name" />
<SelectField control={control} name="status" label="Status" items={options} />
```

**Available composed components** worth knowing:
- `PageContainer`, `HeaderContainer`, `HeaderBackButton`, `HeaderText`, `CollapsibleContainer`, `GroupContainer`
- `ConfirmDialogProvider` / `useConfirmationContext` — imperative confirm dialogs
- `DataTable`, `DGridProvider/Table/Columns/Rows/Pagination` — data grid with pagination
- `ListView`, `LeaveBalanceTable`
- `SwitchStep`, `NavMenu`, `Status`, `StatusLabel`

---

## Tailwind CSS v4

Both apps use **CSS-first configuration** — there is no `tailwind.config.js` for theme tokens (v4 moved this into CSS). The Vite plugin handles integration:
```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
plugins: [tailwindcss(), ...]
```

**Theme tokens** are defined in the app's main CSS entry via `@theme` and CSS custom properties:
```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', ui-sans-serif, ...;
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: #111827;
  --color-primary: #004663;
}
```

Colors use **oklch** color space and semantic CSS variables — reference tokens via `var(--token)` in CSS, or use the mapped Tailwind utilities (`bg-primary`, `text-foreground`, etc.).

**Dark mode** uses the class strategy via `@custom-variant`:
```css
@custom-variant dark (&:is(.dark *));
```

**Custom utilities/components** go in `@layer components`:
```css
@layer components {
  .btn-warning { @apply bg-gradient-to-r from-orange-400 to-orange-600 ...; }
}
```

`hris-app` also has a `tailwind.config.js` for **HeroUI** (date-picker, calendar) — do not remove it.

---

## TanStack Router

Routes are **file-based** under `src/routes/`. The Vite plugin auto-generates `src/routeTree.gen.ts` — never edit that file.

**Naming conventions:**
- `__root.tsx` — root layout; use `createRootRouteWithContext` to inject `queryClient`
- `_layout.tsx` — pathless layout group (underscore prefix = no URL segment)
- `_layout/page.tsx` — page nested under that layout
- `$param.tsx` — dynamic segment

**Root route** wires QueryClient into context so loaders can pre-fetch:
```tsx
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: () => <NotFoundErrors />,
  errorComponent: () => <InternalError />,
})
```

**Page route with loader and search params:**
```tsx
export const Route = createFileRoute('/_app/employees/$id')({
  validateSearch: createStandardSchemaV1(mySearchSchema, { partialOutput: true }),
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(getQueryOptions(params.id))
  },
  component: () => {
    const { id } = Route.useParams()
    const data = Route.useLoaderData()
    return <MyPage id={id} />
  },
})
```

**Search params** use `nuqs` with `createStandardSchemaV1` for Zod-based type safety. Define schemas in the feature's `types/` folder.

---

## TanStack Query

**Query options factory pattern** — define reusable `queryOptions` in feature hooks files, not inline in components. This enables reuse in both route loaders and component hooks:
```ts
// src/features/employees/hooks/useEmployee.ts
export const getEmployeeQueryOptions = (id?: string) =>
  queryOptions({
    queryKey: ['employee', id],
    queryFn: () => request.get<APIResponse<Employee>>(`/employees/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
  })
```

**Mutations** — use `toast.success` / `toast.error` (sonner) in `onSuccess`/`onError`, and `queryClient.invalidateQueries` to bust stale cache:
```ts
export const useUpdateEmployee = () =>
  useMutation({
    mutationFn: ({ id, data }) => request.put(ApiRoutes.EMPLOYEES.BY_ID(id), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employee', id] })
      toast.success('Saved')
    },
    onError: () => toast.error('Failed to save'),
  })
```

**HTTP client** — use the `request` helper from `src/lib/http.ts`. Never call `axios` directly in feature code.

**Route loaders** — use `context.queryClient.ensureQueryData(queryOptions(...))` to pre-fetch before the component renders.

---

## Zod Schemas

Feature schemas live in `src/features/<name>/types/`. Two shared Zod validators handle C# backend date formats:

```ts
// For C# DateOnly ("yyyy-MM-dd")
export const dateOnly = z.iso.date()

// For C# DateTime (UTC "Z", offset, or Kind=Unspecified — accepts all three)
export const dateTime = z.iso.datetime({ offset: true, local: true })
```

---

## Monorepo

**Workspace packages:**
| Package | Name | Build step required |
|---|---|---|
| `packages/shared-ui` | `@hris/shared-ui` | No — direct `src/` imports |
| `packages/auth-package` | `@cwmsi/auth-package` | Yes — run `pnpm --filter @cwmsi/auth-package build` |

**Adding a workspace dependency:**
```json
// In the app's package.json
"@hris/shared-ui": "workspace:*"
```

**Exporting from shared-ui** — add a new export to `packages/shared-ui/src/index.ts`, then re-export from the appropriate `src/components/` subfolder. No subpath exports exist; everything goes through the barrel.

**Auth package public API** (`packages/auth-package/src/index.ts`):
```ts
export { AuthProvider, useAuthContext }
export { useAuthStore, LocalStorageAuth }
export { authSchema, type AuthSchemaType }
export type { AuthState, LoginResponse, UserType }
```
Keep auth state and schema changes aligned with these exports — don't import from deep paths inside the package.
