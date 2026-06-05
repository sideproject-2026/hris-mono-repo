import { createFileRoute, redirect } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import { employeeSearchInitialParser } from '@/features/employee-master/employees/types/search'
import EmployeeListProvider from '@/features/employee-master/employees/components/employee-master-profile/providers/employee-list-provider'
import EmployeePage from '@/features/employee-master/employees/components/employee-page'
import { isAuthenticated } from '@/lib/hooks/authentication'

export const Route = createFileRoute('/_app/employees/')({
  validateSearch: createStandardSchemaV1(employeeSearchInitialParser, {
    partialOutput: true,
  }),
  component: () => {
    return (
      <EmployeeListProvider>
        <EmployeePage />
      </EmployeeListProvider>
    )
  },
  errorComponent: () => <div>Error loading employees.</div>,
})
