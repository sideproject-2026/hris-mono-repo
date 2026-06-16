---
name: pattern-upload-photo-hook
description: useUploadPhoto hook pattern — RHF + zod + useMutation, issues found 2026-06-15
metadata:
  type: project
---

`useUploadPhoto` in `hooks/mutations/useUploadPhoto.ts` combines React Hook Form (with zod resolver) and TanStack Query `useMutation`. The hook exposes `{ mutation, form, onSubmit, setPhotoFile }`.

Caller pattern in `webcam-capture.tsx`:
1. Call `setPhotoFile(file)` to set the RHF field value (with validate + dirty).
2. Await `onSubmit()` — which is `form.handleSubmit(async (data) => mutation.mutateAsync(data))`.

Issues found (2026-06-15):
- `setPhotoFile` + `await onSubmit()` called in the same synchronous tick: `form.setValue` with `shouldValidate: true` is asynchronous in RHF (validation runs async). `handleSubmit` fires immediately after `setValue`, before validation resolves, so the submit can race with the validation. Should use `form.trigger('photo')` and await it, or restructure to call `mutate` directly.
- `onSuccess`/`onError` callbacks from the caller are passed through `try/catch` around `mutateAsync`, but the hook's own `onSuccess` (which does `invalidateQueries`) fires before the caller's `onSuccess`. That ordering is fine, but `onError` in the hook is not defined — errors only surface through the `try/catch`. Mutation errors will not trigger TanStack Query's error boundary.
- `resolver: zodResolver(...) as any` suppresses a type error that may hide a real resolver mismatch.

**Why:** Identified during first photo feature review. The race condition is the most likely source of intermittent "upload succeeded but photo doesn't update" bugs.
**How to apply:** Flag any pattern where `form.setValue` and `form.handleSubmit` are called in the same tick without awaiting validation.
