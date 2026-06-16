---
name: project-conventions
description: Key utility locations and confirmed conventions for hris-app employee-master feature
metadata:
  type: project
---

- HTTP helper: `src/lib/http.ts` exports `request` object. `request.getBlob(url)` returns `Promise<Blob>` (responseBody strips the AxiosResponse wrapper). Never call axios directly.
- API routes: `src/types/api-routes.ts` — `ApiRoutes.EMPLOYEES.VIEW_PHOTO(id)` and `UPLOAD_PHOTO(id)` both resolve to `/employees/:id/photo` (same endpoint, different HTTP verbs).
- Query factory pattern: `queryOptions(...)` factories defined in `hooks/queries/useEmployee.ts` (subfolder). Route loader and component hooks consume the same factory.
- Mutation pattern: `useMutation` in `hooks/mutations/`, `onSuccess` invalidates query keys, caller handles toast.
- Provider: `EmployeePersonalProvider` at `components/employee-master-profile/providers/employee-personal-provider.tsx` exposes `employeeId?: string` via context.
- Global types available without import: `APIResponse<T>`, `SelectionItem<T>`, `AuthState`, `PageType`, `CodeValue`, `JobStatus`. Note: file uses `ApiResponse<T>` (lowercase 'pi') in some spots — watch for typo vs. global.

**Why:** Confirms conventions are consistent with CLAUDE.md. Apply these as the baseline when reviewing any employee-master code.
**How to apply:** Flag any direct axios calls, hardcoded URL strings, or inline queryOptions in components as convention violations.
