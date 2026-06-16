---
name: pattern-blob-object-url
description: How the team caches Blobs in TanStack Query and derives object URLs in view-photo component
metadata:
  type: project
---

Pattern used in `view-photo.tsx`: cache the raw Blob in TanStack Query (staleTime 5 min, refetchOnWindowFocus: false), then derive a per-render object URL in a `useEffect` that revokes it on cleanup. This avoids refetching on tab switch and avoids the URL-expiry problem.

Key correctness detail: `URL.createObjectURL` is called in the effect (not render), so the URL is always valid when the `<img>` first paints after the effect fires. The effect dependency is `[photoBlob]` — correct because a new Blob reference means a new upload has occurred.

Known gap (found in first review, 2026-06-15): The `<img onError>` fallback mutates `e.currentTarget.src` directly. If the revoke fires before the browser finishes decoding (rare), this could produce a flash. Not a hard bug under normal conditions.

**Why:** Caching Blobs survives tab switches without extra network requests. The design is intentional.
**How to apply:** The pattern is correct as designed. Only flag if the Blob is stored as a data URL in state (anti-pattern) or if revoke happens synchronously on the same tick as `src` assignment.
