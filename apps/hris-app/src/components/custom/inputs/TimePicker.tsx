import { useMemo, useState } from 'react'
import { Check, Clock } from 'lucide-react'
import { addMinutes, format, parse, startOfDay } from 'date-fns'
import type { Control, FieldValues, Path } from 'react-hook-form'

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
import { cn } from '@/lib/utils'

const ZERO_TIME = '00:00:00'
const STORAGE_FORMAT = 'HH:mm:ss'

type TimeOption = {
  value: string
  label: string
}

interface TimePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  intervalMinutes?: number
  disabled?: boolean
  displayFormat?: string
  emptyDisplayText?: string
}

const buildTimeOptions = (
  intervalMinutes: number,
  displayFormat: string,
): Array<TimeOption> => {
  const startDate = startOfDay(new Date())
  const options: Array<TimeOption> = []

  for (let minutes = 0; minutes < 24 * 60; minutes += intervalMinutes) {
    const date = addMinutes(startDate, minutes)
    options.push({
      value: format(date, STORAGE_FORMAT),
      label: format(date, displayFormat),
    })
  }

  return options
}

const formatTime = (value: string, displayFormat: string) => {
  const parsed = parse(value, STORAGE_FORMAT, new Date())
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return format(parsed, displayFormat)
}

const TimePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Search time...',
  intervalMinutes = 30,
  disabled,
  displayFormat = STORAGE_FORMAT,
  emptyDisplayText = '--:--:--',
}: TimePickerProps<T>) => {
  const [open, setOpen] = useState(false)

  const timeOptions = useMemo(
    () => buildTimeOptions(intervalMinutes, displayFormat),
    [intervalMinutes, displayFormat],
  )

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const shouldShowPlaceholder = !field.value || field.value === ZERO_TIME
        const buttonLabel = shouldShowPlaceholder
          ? emptyDisplayText
          : formatTime(field.value, displayFormat)

        return (
          <FormItem className="w-full space-y-2">
            {label && (
              <FormLabel className="font-sans text-sm font-semibold text-foreground-primary">
                {label}
              </FormLabel>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-between text-sm h-10 px-4 font-normal',
                      shouldShowPlaceholder && 'text-muted-foreground',
                    )}
                  >
                    <span>{buttonLabel}</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[260px] p-0" align="start">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>No time found.</CommandEmpty>
                    <CommandGroup>
                      {timeOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => {
                            field.onChange(option.value)
                            setOpen(false)
                          }}
                        >
                          <span>{option.label}</span>
                          {field.value === option.value && (
                            <Check className="ml-auto h-4 w-4" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage className="text-red-500" />
          </FormItem>
        )
      }}
    />
  )
}

export default TimePicker
