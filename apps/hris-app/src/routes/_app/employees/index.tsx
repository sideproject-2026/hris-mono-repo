import { createFileRoute, redirect } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import { employeeSearchInitialParser } from '@/features/employees/types/search'
import EmployeeProvider from '@/features/employees/components/employee-provider'
import EmployeePage from '@/features/employees/components/employee-page'
import { isAuthenticated } from '@/lib/hooks/authentication'

export const Route = createFileRoute('/_app/employees/')({
  validateSearch: createStandardSchemaV1(employeeSearchInitialParser, {
    partialOutput: true,
  }),
  component: () => {
    return (
      <EmployeeProvider>
        <EmployeePage />
      </EmployeeProvider>
    )
  },
  errorComponent: () => <div>Error loading employees.</div>,
})
