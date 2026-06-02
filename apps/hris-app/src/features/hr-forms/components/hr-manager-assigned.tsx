import React from 'react'
import {
    useFieldArray,
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
import { employeesActiveQueryOptions } from '@/features/employees/hooks/useEmployee'
import { type HRFormSchemaType } from '../types/schema'

interface HRManagerAssignedProps<
    T extends FieldValues = HRFormSchemaType,
> {
    form: UseFormReturn<T>
    fieldName: string
    label: string
    initialManagerName?: string
}

const HRManagerAssigned = ({
    form,
    fieldName,
    label,
    initialManagerName,
}: HRManagerAssignedProps) => {
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
        employeesActiveQueryOptions({ fullName: debouncedSearchName }),
    )

    const employees = data ?? []

    const currentManagerId = form.watch(fieldName as any)

    // Use useEffect to sync initialManagerName when it changes
    React.useEffect(() => {
        if (initialManagerName) {
            setSelectedName(initialManagerName)
        }
    }, [initialManagerName])

    // Sync selectedName when an employee is found in search results
    React.useEffect(() => {
        const found = employees.find((e) => e.id === currentManagerId)
        if (found) {
            setSelectedName(found.fullName)
        }
    }, [employees, currentManagerId])

    return (
        <div className="flex flex-col gap-2 w-full">
            <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between min-h-11 py-2 px-3"
                    >
                        <div className="flex items-center gap-1 flex-wrap">
                            {currentManagerId ? (
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1 pr-1"
                                >
                                    <span className="text-sm uppercase">
                                        {selectedName || 'Selected Manager'}
                                    </span>
                                    <div
                                        role="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            form.setValue(fieldName as any, '')
                                            setSelectedName('')
                                        }}
                                        className="ml-1 rounded-full hover:bg-muted-foreground/20 cursor-pointer"
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </div>
                                </Badge>
                            ) : (
                                <span className="text-sm font-normal text-muted-foreground">
                                    Select a manager...
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
                                    const isSelected = form.watch(fieldName as any) === employee.id
                                    return (
                                        <CommandItem
                                            key={employee.id}
                                            onSelect={() => form.setValue(fieldName as any, employee.id)}
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

export default HRManagerAssigned
