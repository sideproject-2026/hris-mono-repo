import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { endOfDay, format, isAfter, isBefore, startOfDay } from 'date-fns'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

interface DatePickerFieldProps<T extends FieldValues> {
  label?: string
  control: Control<T>
  name: Path<T>
  placeholder?: string
  icon?: React.ReactNode
  disableFutureDates?: boolean
  disablePastDates?: boolean
  baseClassName?: string
}

export default function DatePickerField<T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  icon,
  disableFutureDates,
  disablePastDates,
  baseClassName,
}: DatePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'w-full border-b flex flex-col dark:border-secondary border-secondary',
            baseClassName,
          )}
        >
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
                    format(field.value, 'PPP')
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {placeholder}
                    </span>
                  )}
                  {icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full">
                      {icon}
                    </div>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="dark:bg-secondary bg-white w-full p-0 border-0">
              <Calendar
                className="w-full pointer-events-auto"
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={
                  disableFutureDates && disablePastDates
                    ? (date) =>
                      isAfter(endOfDay(date), endOfDay(new Date())) ||
                      isBefore(startOfDay(date), startOfDay(new Date()))
                    : disableFutureDates
                      ? (date) => isAfter(endOfDay(date), endOfDay(new Date()))
                      : disablePastDates
                        ? (date) =>
                          isBefore(startOfDay(date), startOfDay(new Date()))
                        : undefined
                }
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
