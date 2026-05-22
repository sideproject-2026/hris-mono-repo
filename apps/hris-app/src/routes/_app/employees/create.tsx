import EmployeeMasterForm from '@/features/employees/components/employee-master-profile/employee-master-form'
import EmployeePersonalProvider from '@/features/employees/components/employee-master-profile/employee-personal/employee-personal-provider'
import { employeeSearchInitialParser } from '@/features/employees/types/search'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'

export const Route = createFileRoute('/_app/employees/create')({
  validateSearch: createStandardSchemaV1(employeeSearchInitialParser, {
    partialOutput: true,
  }),
  component: () => {
    return (
      <EmployeePersonalProvider>
        <EmployeeMasterForm disabled={true} />
      </EmployeePersonalProvider>
    )
  },
  errorComponent: () => <div>Failed to load employee creation form.</div>,
})
