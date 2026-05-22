import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area' // Add Shadcn ScrollArea
import {
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns'
import { Clock } from 'lucide-react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

interface DateTimePickerFieldProps<T extends FieldValues> {
  label?: string
  control: Control<T>
  name: Path<T>
  placeholder?: string
  disableFutureDates?: boolean
  disablePastDates?: boolean
}

export default function DateTimePickerField<T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  disableFutureDates,
  disablePastDates,
}: DateTimePickerFieldProps<T>) {
  // Helper to update the time on an existing date
  const handleTimeChange = (
    type: 'hour' | 'minute',
    value: number,
    currentDate: Date | undefined,
    onChange: (date: Date) => void,
  ) => {
    const date = currentDate || new Date()
    const newDate =
      type === 'hour' ? setHours(date, value) : setMinutes(date, value)
    onChange(newDate)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          <FormLabel className="font-sans text-md text-muted-foreground font-normal">
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className="w-full flex items-center justify-between text-sm font-normal dark:bg-background bg-background h-11"
                >
                  {field.value ? (
                    format(field.value, 'PPP HH:mm')
                  ) : (
                    <span className="text-muted-foreground">
                      {placeholder || 'Pick a date & time'}
                    </span>
                  )}
                  <Clock className="h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 flex flex-row" align="start">
              {/* DATE PICKER SIDE */}
              <div className="border-r">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (!date) return
                    // Preserve existing time if a date is changed
                    const newDate = field.value
                      ? setHours(
                          setMinutes(date, field.value.getMinutes()),
                          field.value.getHours(),
                        )
                      : date
                    field.onChange(newDate)
                  }}
                  disabled={
                    disableFutureDates && disablePastDates
                      ? (date) =>
                          isAfter(endOfDay(date), endOfDay(new Date())) ||
                          isBefore(startOfDay(date), startOfDay(new Date()))
                      : disableFutureDates
                        ? (date) =>
                            isAfter(endOfDay(date), endOfDay(new Date()))
                        : disablePastDates
                          ? (date) =>
                              isBefore(startOfDay(date), startOfDay(new Date()))
                          : undefined
                  }
                  initialFocus
                />
              </div>

              {/* TIME PICKER SIDE */}
              <div className="flex flex-col p-3">
                <div className="flex gap-2 h-64">
                  {/* Hours */}
                  <ScrollArea className="w-14 border rounded-md">
                    <div className="flex flex-col p-1">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <Button
                          key={i}
                          size="sm"
                          variant={
                            field.value && field.value.getHours() === i
                              ? 'default'
                              : 'ghost'
                          }
                          className="text-xs shrink-0"
                          onClick={() =>
                            handleTimeChange(
                              'hour',
                              i,
                              field.value,
                              field.onChange,
                            )
                          }
                        >
                          {i.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                  {/* Minutes */}
                  <ScrollArea className="w-14 border rounded-md">
                    <div className="flex flex-col p-1">
                      {Array.from({ length: 60 }).map((_, i) => (
                        <Button
                          key={i * 1}
                          size="sm"
                          variant={
                            field.value && field.value.getMinutes() === i * 5
                              ? 'default'
                              : 'ghost'
                          }
                          className="text-xs shrink-0"
                          onClick={() =>
                            handleTimeChange(
                              'minute',
                              i * 1,
                              field.value,
                              field.onChange,
                            )
                          }
                        >
                          {(i * 1).toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="mt-2 text-center text-[10px] text-muted-foreground">
                  Time (HH:mm)
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
