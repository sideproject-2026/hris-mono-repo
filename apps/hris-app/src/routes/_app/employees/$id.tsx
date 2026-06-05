import { createFileRoute } from '@tanstack/react-router'
import EmployeeMasterForm from '@/features/employee-master/employees/components/employee-master-profile/employee-master-form'
import { employeeSearchInitialParser } from '@/features/employee-master/employees/types/search'
import { createStandardSchemaV1 } from 'nuqs'
import {
  employeeInitialQueryOptions,
  getEmployeeProfilelQueryOptions,
} from '@/features/employee-master/employees/hooks/useEmployee'
import EmployeePersonalProvider from '@/features/employee-master/employees/components/employee-master-profile/employee-personal/employee-personal-provider'

export const Route = createFileRoute('/_app/employees/$id')({
  validateSearch: createStandardSchemaV1(employeeSearchInitialParser, {
    partialOutput: true,
  }),
  loader: async ({ context, params }) => {
    const queryId = params.id
    const data = await context.queryClient.ensureQueryData(
      getEmployeeProfilelQueryOptions(queryId),
    )

    const initialLoaderData = await context.queryClient.ensureQueryData(employeeInitialQueryOptions())
    return {
      data,
      initialLoaderData,
    }
  },
  component: () => {
    const { id } = Route.useParams()
    return (
      <EmployeePersonalProvider id={id}>
        <EmployeeMasterForm disabled={false} />
      </EmployeePersonalProvider>
    )
  },
})
