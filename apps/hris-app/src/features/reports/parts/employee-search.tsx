import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useEffect, useState } from 'react'
import { employeesActiveReportQueryOptions } from '../hooks/useReport'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { ChevronsUpDown, Loader2, X } from 'lucide-react'
import {
  CommandInput,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Check } from 'iconsax-reactjs'

interface IProps {
  employeeId: number | string
  setEmployeeId: (id: number) => void
  label?: string
  placeholder?: string
}

const EmployeeSearch: React.FC<IProps> = ({
  employeeId,
  setEmployeeId,
  label,
  placeholder,
}) => {
  const [open, setOpen] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [debouncedSearchName, setDebouncedSearchName] = useState<string>('')

  const { data: employees = [], isFetching } = useQuery(
    employeesActiveReportQueryOptions({ fullName: debouncedSearchName }),
  )

  console.log('Employees:', employees);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchName(searchName), 400)
    return () => clearTimeout(handler)
  }, [searchName])

  const selectedEmployee = employees.find(
    (e) => e.employeeID === Number(employeeId),
  )

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <h3 className="text-md text-muted-foreground">{label}</h3>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 py-2 px-3"
          >
            <div className="flex items-center gap-1 flex-wrap">
              {employeeId && (selectedEmployee || employeeId !== 0) ? (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  <span>
                    {selectedEmployee
                      ? `${selectedEmployee.lastName}, ${selectedEmployee.firstName} ${selectedEmployee.middleName || ''}`
                      : `Employee ID: ${employeeId}`}
                  </span>
                  <div
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEmployeeId(0)
                    }}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 cursor-pointer"
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ) : (
                <span className="text-sm font-normal text-muted-foreground">
                  {placeholder || 'Select an employee...'}
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
                  const isSelected = Number(employeeId) === employee.employeeID
                  return (
                    <CommandItem
                      key={employee.id}
                      onSelect={() => {
                        setEmployeeId(employee.employeeID)
                        setOpen(false)
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {`${employee.lastName}, ${employee.firstName} ${employee.middleName || ''}`}
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

export default EmployeeSearch
