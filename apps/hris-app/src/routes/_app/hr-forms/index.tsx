import { createFileRoute } from '@tanstack/react-router'
import HRFormProvider from '@/features/hr-forms/components/hr-form-provider'
import HRFormList from '@/features/hr-forms/components/hr-form-list'
import { createStandardSchemaV1 } from 'nuqs'
import { hrFormSearchInitialParser } from '@/features/hr-forms/types/search'

export const Route = createFileRoute('/_app/hr-forms/')({
  validateSearch: createStandardSchemaV1(hrFormSearchInitialParser, {
    partialOutput: true,
  }),
  errorComponent: () => <div>Error loading hr forms.</div>,
  component: () => (
    <HRFormProvider>
      <HRFormList />
    </HRFormProvider>
  ),
  
})
