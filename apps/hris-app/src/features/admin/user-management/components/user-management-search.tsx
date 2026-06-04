import React from 'react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react'


import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@hris/shared-ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hris/shared-ui'
import { Badge } from '@hris/shared-ui'
import { getSearchUserManagementOptions } from '../hooks/useUserManagement'
import type { EmployeeAppointmentSchemaTypes } from '@/features/employees/types/schema'

interface EmployeeListAppointmentProps<
  T extends FieldValues = EmployeeAppointmentSchemaTypes,
> {
  form: UseFormReturn<T>
  initialManagerName?: string
}

const UserManagementSearch = ({
  form,
  initialManagerName,
}: EmployeeListAppointmentProps) => {
  const [open, setOpen] = React.useState(false)
  const [searchName, setSearchName] = React.useState('')
  const [debouncedSearchName, setDebouncedSearchName] =
    React.useState<string>('')
  const [selectedName, setSelectedName] = React.useState(
    initialManagerName || '',
  )

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchName(searchName), 400)
    return () => clearTimeout(handler)
  }, [searchName])

  const { data, isFetching } = useQuery(
    getSearchUserManagementOptions({ name: debouncedSearchName }),
  )

  const employees = data ?? []

  const currentEmployeeId = form.watch('employeeId' as any)

  // Use useEffect to sync initialManagerName when it changes
  React.useEffect(() => {
    if (initialManagerName) {
      setSelectedName(initialManagerName)
    }
  }, [initialManagerName])

  // Sync selectedName when an employee is found in search results
  React.useEffect(() => {
    const found = employees.find((e) => e.id === currentEmployeeId)
    if (found) {
      setSelectedName(found.firstName + ' ' + found.lastName)
    }
  }, [employees, currentEmployeeId])

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-md font-normal text-muted-foreground">
        Search Employee
      </h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-11 py-2 px-3"
          >
            <div className="flex items-center gap-1 flex-wrap">
              {currentEmployeeId ? (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  <span className="text-sm uppercase">
                    {selectedName || 'Selected Employee'}
                  </span>
                  <div
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      form.setValue('employeeId' as any, '')
                      form.setValue('firstName' as any, '')
                      form.setValue('lastName' as any, '')
                      form.setValue('companyName' as any, '')
                      form.setValue('department' as any, '')
                      form.setValue('jobTitle' as any, '')
                      setSelectedName('')
                    }}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 cursor-pointer"
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ) : (
                <span className="text-sm font-normal text-muted-foreground">
                  Select an employee...
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search employee name..."
              value={searchName}
              onValueChange={setSearchName}
            />
            <CommandList>
              {isFetching && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
              {!isFetching && employees.length === 0 && (
                <CommandEmpty>No employees found.</CommandEmpty>
              )}
              <CommandGroup>
                {employees.map((employee) => {
                  // Check against employeeCode, not the RHF internal ID
                  const isSelected =
                    form.watch('employeeId') === employee.employeeID
                  return (
                    <CommandItem
                      key={employee.id}
                      onSelect={() => {
                        form.setValue('employeeId' as any, employee.employeeID)
                        form.setValue('firstName' as any, employee.firstName)
                        form.setValue('lastName' as any, employee.lastName)
                        form.setValue('companyName' as any, employee.company)
                        form.setValue('department' as any, employee.department)
                        form.setValue('jobTitle' as any, employee.designation)
                        form.setValue(
                          'userName' as any,
                          `${employee.firstName[0]}${employee.lastName}`,
                        )
                        setOpen(false)
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {`${employee.firstName} ${employee.lastName}`}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {employee.company || 'No Company'}
                        </span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserManagementSearch
