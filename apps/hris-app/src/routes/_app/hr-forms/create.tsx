import HRFormCreate from '@/features/employee-master/hr-forms/components/create/hr-form-create'
import { employeeInitialQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/hr-forms/create')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(employeeInitialQueryOptions()),
  errorComponent: () => <div>Error loading the request form.</div>,
  component: HRFormCreate,
})
