import EmployeeListComponent from '@/features/employee-setup/components/employee-setup-list'
import EmployeeProvider from '@/features/employee-setup/components/employee-setup-provider'
import { employeeQueryOptions } from '@/features/employee-setup/hooks/useEmployeeSetup'
import {
  filterSearchEmployeeParser,
  type FilterSearchEmployeeType,
} from '@/features/employee-setup/types/search'
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
