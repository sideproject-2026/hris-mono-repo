//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'


export default [
   {
      ignores: [
         '**/node_modules/**',
         '**/dist/**',
         '**/build/**',
         '**/.vite/**',
         '**/coverage/**',
         '**/.turbo/**',
         '**/routeTree.gen.ts',
      ]
   },
   ...tanstackConfig,
   {
      rules: {
         '@typescript-eslint/no-unused-vars': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         '@typescript-eslint/ban-ts-comment': 'off',
         '@typescript-eslint/no-non-null-assertion': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
         '@typescript-eslint/no-empty-function': 'off',
      }
   }
]
