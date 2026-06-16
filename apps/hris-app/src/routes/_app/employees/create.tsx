import EmployeeMasterForm from '@/features/employee-master/employees/components/employee-master-profile/employee-master-form'
import EmployeePersonalProvider from '@/features/employee-master/employees/components/employee-master-profile/providers/employee-personal-provider'
import { queryOptionsInitial } from '@/features/employee-master/employees/hooks/queries/useEmployee'
import { getEmployeeProfilelQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'
import { employeeSearchInitialParser } from '@/features/employee-master/employees/types/search'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'

export const Route = createFileRoute('/_app/employees/create')({
  validateSearch: createStandardSchemaV1(employeeSearchInitialParser, {
    partialOutput: true,
  }),
  loader: async ({ context }) => {
    const initialLoaderData = await context.queryClient.ensureQueryData(queryOptionsInitial());
    await context.queryClient.ensureQueryData(getEmployeeProfilelQueryOptions(undefined));
    return {
      initialLoaderData
    }
  },
  component: () => {
    return (
      <EmployeePersonalProvider>
        <EmployeeMasterForm disabled={true} />
      </EmployeePersonalProvider>
    )
  },
  errorComponent: () => <div>Failed to load employee creation form.</div>,
})
