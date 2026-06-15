
import EmployeeProvider from '@/features/attendance-modules/employee-setup/components/employee-setup-provider'
import { filterSearchEmployeeParser } from '@/features/attendance-modules/employee-setup/types/search'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'

export const Route = createFileRoute('/_app/employee-setup')({
  validateSearch: createStandardSchemaV1(filterSearchEmployeeParser, {
    partialOutput: true,
  }),
  component: () => {
    return (
      <EmployeeProvider>
        <EmployeeListComponent />
      </EmployeeProvider>
    )
  },
  errorComponent: () => <div>Error loading employees.</div>,
})
