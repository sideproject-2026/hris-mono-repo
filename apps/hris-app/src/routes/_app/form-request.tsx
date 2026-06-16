import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import FormRequest from '@/features/attendance-modules/form-request/components/request-form-page'
import { filterSearchRequestParser } from '@/features/attendance-modules/form-request/types/search'
import RequestFormProvider from '@/features/attendance-modules/form-request/components/request-form-provider'
import RequestFormContent from '@/features/attendance-modules/form-request/components/request-form-page'

export const Route = createFileRoute('/_app/form-request')({
  validateSearch: createStandardSchemaV1(filterSearchRequestParser, {
    partialOutput: true,
  }),
  component: () => (
    <RequestFormProvider>
      <RequestFormContent />
    </RequestFormProvider>
  ),
})
