import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
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
  disabled?: boolean
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
  disabled,
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
                  disabled={disabled}
                  className="w-full flex items-center justify-between text-sm font-normal dark:bg-background bg-background h-10"
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
                captionLayout='dropdown'
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
