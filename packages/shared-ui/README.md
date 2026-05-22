# @hris/shared-ui

Shared UI primitives for apps in this monorepo.

## Current exports

- `Button`
- `buttonVariants`
- `cn`

## Migration pattern

1. Move a generic component from an app into `src/components` in this package.
2. Export it from `src/index.ts`.
3. Keep temporary re-export wrappers inside each app to avoid breaking imports.
4. Replace app-local imports gradually with `@hris/shared-ui` imports.
