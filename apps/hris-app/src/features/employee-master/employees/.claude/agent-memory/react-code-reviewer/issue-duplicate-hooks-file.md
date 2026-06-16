---
name: issue-duplicate-hooks-file
description: Two useEmployee.ts files exist in the employees feature hooks directory
metadata:
  type: project
---

As of 2026-06-15 there are two `useEmployee.ts` files in the employees feature:
- `hooks/useEmployee.ts` — root level; exports `employeeInitialQueryOptions`, `getEmployeeProfilelQueryOptions` (note typo: "Profilel"). Used by `employee-personal-provider.tsx`.
- `hooks/queries/useEmployee.ts` — new subfolder; exports `getEmployeePhotoQueryOptions`, `getEmployeeProfilelQueryOptions`, `queryOptionsInitial`, `mapEmployeeToFormValues`, `useEmployeeProfile`. Used by `view-photo.tsx`.

There is duplication: `getEmployeeProfilelQueryOptions` is defined in both files. The root file is the source of truth for the provider; the queries/ file has its own copy. This risks divergence over time.

**Why:** The new photo query options were added to the queries/ subfolder following the new convention, but the old root file was not cleaned up.
**How to apply:** Flag if new queries are added to the root file instead of queries/. Recommend consolidating — migrate root file exports into queries/ and update the provider import.
