import HRFormList from '@/features/employee-master/hr-forms/components/hr-form-list'
import HRFormProvider from '@/features/employee-master/hr-forms/components/hr-form-provider'
import { hrFormSearchInitialParser } from '@/features/employee-master/hr-forms/types/search'
import { employeeInitialQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'


export const Route = createFileRoute('/_app/hr-forms/')({
  validateSearch: createStandardSchemaV1(hrFormSearchInitialParser, {
    partialOutput: true,
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(employeeInitialQueryOptions()),
  errorComponent: () => <div>Error loading hr forms.</div>,
  component: () => (
    <HRFormProvider>
      <HRFormList />
    </HRFormProvider>
  ),
  
})
