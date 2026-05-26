import type { ChangeEvent } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'

const DEFAULT_VALUE = '00:00:00'

interface TimeSpanFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  orientation?: 'horizontal' | 'vertical'
}

const sanitizeDigits = (value: string) =>
  value.replace(/[^0-9]/g, '').slice(0, 6)

const formatWithSeparators = (digits: string) => {
  if (!digits.length) return ''
  if (digits.length <= 2) return digits
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}:${digits.slice(2)}`
  }
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4)}`
}

const normalizeToTime = (digits: string) => {
  const padded = digits.padEnd(6, '0')
  return `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(4, 6)}`
}

const TimeSpanField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  inputClassName,
  orientation = 'vertical',
}: TimeSpanFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isVertical = orientation === 'vertical'
        const showInlineLabel = Boolean(label && !isVertical)
        const inlineLabelId = showInlineLabel
          ? `${String(name).replace(/\./g, '-')}-inline-label`
          : undefined
        const getRawValue = () =>
          typeof field.value === 'string' ? field.value : ''
        const currentDigits = sanitizeDigits(getRawValue())
        const displayValue = currentDigits
          ? formatWithSeparators(currentDigits)
          : getRawValue()

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const digits = sanitizeDigits(event.target.value)
          const formatted = formatWithSeparators(digits)
          field.onChange(formatted)
        }

        const handleBlur = () => {
          const digits = sanitizeDigits(getRawValue())
          if (!digits) {
            field.onChange(DEFAULT_VALUE)
            return
          }
          field.onChange(normalizeToTime(digits))
        }

        return (
          <FormItem
            className={cn(
              'w-full max-w-[280px]',
              isVertical ? 'space-y-2' : 'space-y-0',
              className,
            )}
          >
            {label && isVertical && (
              <FormLabel className="font-sans text-sm font-semibold text-foreground-primary">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative w-full">
                {showInlineLabel && (
                  <span
                    id={inlineLabelId}
                    className="pointer-events-none absolute left-2 top-[-1px] -translate-y-1/2 text-xs font-medium text-muted-foreground"
                  >
                    {label}
                  </span>
                )}
                <Input
                  value={displayValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disabled}
                  placeholder="__:__:__"
                  inputMode="numeric"
                  maxLength={8}
                  className={cn(
                    'h-10 rounded-xl border border-border bg-background/70 px-4 font-medium tracking-[0.2em] focus-visible:ring-2',
                    showInlineLabel ? 'w-full text-center' : 'w-[110px]',
                    inputClassName,
                  )}
                  aria-label={
                    showInlineLabel ? undefined : 'Enter time span in HH:MM:SS'
                  }
                  aria-labelledby={inlineLabelId}
                />
              </div>
            </FormControl>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            <FormMessage
              className={cn('text-red-500', !isVertical && 'mt-2')}
            />
          </FormItem>
        )
      }}
    />
  )
}

export default TimeSpanField
