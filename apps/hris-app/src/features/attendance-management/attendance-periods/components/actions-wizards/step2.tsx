import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import type { FieldValues, UseFormReturn } from 'react-hook-form'
import type { AttendancePeriodFormValues } from '../../../types/schema'
import { Input, ListView, Button } from '@hris/shared-ui'
import { getListEmployeeOptions } from '@/features/attendance-management/hooks/useAttendanceProcess'

/**
 * Component: Step2
 * Description: This component represents Step 2 of the Attendance Period creation wizard.
 * It allows user to search and add employees to the attendance period for inclusion or exclusion.
 * TODO: (Done)
 * - ✅ Search input to filter employees by name.
 * - ✅ ListView to display employees based on search input.
 * - ✅ Add button to include employee in the attendance period.
 * - ✅  When select employee to add, should have a badge or indicator in the list that the employee is already added.
 * - ✅ Should prevent adding duplicate employees by disabling add button if the employee is already in the list.
 * - ✅ Should have a way to remove employees from the selected list.
 */

interface Step2Props<T extends FieldValues = AttendancePeriodFormValues> {
  form: UseFormReturn<T>
}

const Step2 = ({ form }: Step2Props) => {
  const [searchName, setSearchName] = React.useState<string>('')
  const [debouncedSearchName, setDebouncedSearchName] =
    React.useState<string>('')

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'employeeIds',
  })

  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedSearchName(searchName.trim())
    }, 400)

    return () => {
      window.clearTimeout(handler)
    }
  }, [searchName])

  const { data, isFetching } = useQuery(
    getListEmployeeOptions({ name: debouncedSearchName }),
  )
  const employees = data ?? []

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const handleAddEmployee = (employeeId: number) => {
    append({ id: employeeId.toString(), employeeId: employeeId.toString() })
  }

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="text-sm text-gray-400">
          Step 2 Add Employee to include or exclude
        </div>
        <div className="flex flex-row">
          <Input
            type="text"
            placeholder="Search Employee"
            className="flex-1"
            value={searchName}
            onChange={handleSearchChange}
          />
        </div>
        <ListView
          data={employees}
          isLoading={isFetching}
          scrollAreaClassName="h-[222px]"
          header={`Employees (${employees.length})`}
          emptyState={
            debouncedSearchName ? (
              <p>No employees found for "{debouncedSearchName}".</p>
            ) : (
              <p>Start typing to search employees.</p>
            )
          }
          getKey={(employee, index) => `${employee.employeeID}`}
          renderItem={(employee) => (
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {[employee.firstName, employee.middleName, employee.lastName]
                    .filter(Boolean)
                    .join(' ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {employee.company || 'No company assigned'}
                </span>
              </div>
              {employee.isActive ? (
                fields.filter(
                  (e) => e.employeeId === employee.employeeID.toString(),
                ).length === 0 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => handleAddEmployee(employee.employeeID)}
                  >
                    Add
                  </Button>
                ) : (
                  <span className="text-sm text-green-600 font-medium">
                    Added
                  </span>
                )
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Inactive
                </span>
              )}
            </div>
          )}
        />
      </div>
    </>
  )
}

export default Step2
