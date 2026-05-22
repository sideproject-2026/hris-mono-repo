'use client'

import * as React from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface SelectionItem<T> {
  value: T
  text: string
}

interface ComboboxFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  data: Array<SelectionItem<string | number>>
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  baseClassName?: string
  disabled?: boolean
}

const ComboboxField = <T extends FieldValues>({
  control,
  name,
  label,
  data = [],
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  baseClassName,
  disabled = false,
}: ComboboxFieldProps<T>) => {
  const [open, setOpen] = React.useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', baseClassName)}>
          {label && (
            <FormLabel className="text-md text-muted-foreground font-sans font-normal">
              {label}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    'w-full justify-between h-11 font-sans font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? data?.find((item) => item.value === field.value)?.text
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-0">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup className="font-sans text-md">
                    {data?.map((item) => (
                      <CommandItem
                        value={item.text}
                        key={item.value}
                        onSelect={() => {
                          field.onChange(item.value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 font-sans text-md',
                            item.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {item.text}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ComboboxField
