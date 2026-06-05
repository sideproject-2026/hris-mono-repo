import React from 'react'
import {
    type FieldValues,
    type UseFormReturn,
} from 'react-hook-form'
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
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { employeesActiveQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'
import type { HRFormSchemaType } from '../types/schema'

interface HRSearchEmployeeProps<
    T extends FieldValues = HRFormSchemaType,
> {
    form: UseFormReturn<T>
    initialEmployeeName?: string
}

const HRSearchEmployee = ({
    form,
    initialEmployeeName,
}: HRSearchEmployeeProps) => {
    const [open, setOpen] = React.useState(false)
    const [searchName, setSearchName] = React.useState('')
    const [debouncedSearchName, setDebouncedSearchName] =
        React.useState<string>('')
    const [selectedName, setSelectedName] = React.useState(
        initialEmployeeName || ''
    )

    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchName(searchName), 400)
        return () => clearTimeout(handler)
    }, [searchName])

    const { data, isFetching } = useQuery(
        employeesActiveQueryOptions({ fullName: debouncedSearchName }),
    )

    const employees = data ?? []

    const currentEmployeeId = form.watch('employeeId' as any)

    // Use useEffect to sync initialEmployeeName when it changes
    React.useEffect(() => {
        if (initialEmployeeName) {
            setSelectedName(initialEmployeeName)
        }
    }, [initialEmployeeName])

    // Sync selectedName when an employee is found in search results
    React.useEffect(() => {
        const found = employees.find((e) => e.id === currentEmployeeId)
        if (found) {
            setSelectedName(found.fullName)
        }
    }, [employees, currentEmployeeId])

    return (
        <div className="flex flex-col gap-2 w-full">
            <h3 className="text-md font-normal text-muted-foreground">Employee</h3>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between min-h-11 py-2 px-3"
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
                                <CommandEmpty>
                                    {debouncedSearchName ? 'No employees found.' : 'Type to search employees...'}
                                </CommandEmpty>
                            )}
                            <CommandGroup>
                                {employees.map((employee) => {
                                    const isSelected = form.watch('employeeId' as any) === employee.id
                                    return (
                                        <CommandItem
                                            key={employee.id}
                                            onSelect={() => {
                                                form.setValue('employeeId' as any, employee.id)
                                                setSelectedName(employee.fullName)
                                                setOpen(false)
                                            }}
                                            className="flex items-center justify-between cursor-pointer"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">
                                                    {`${employee.fullName}`}
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

export default HRSearchEmployee
