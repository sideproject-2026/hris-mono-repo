import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

// 1. Added the missing interface definition
interface SelectionItem<T> {
  value: T
  text: string
}

type DropdownValueType = 'string' | 'int' | 'object'

interface DropdownFieldProps<T extends FieldValues, TValue = string> {
  control: Control<T>
  name: Path<T>
  label?: string
  type?: string
  data: SelectionItem<TValue>[] // Ensure this is never undefined when passed
  /**
   * How the selected option should be written back into the form:
   * - 'string' (default) — the option value as a string
   * - 'int' — the option value parsed/kept as a number
   * - 'object' — the original option value object, untouched
   */
  valueType?: DropdownValueType
  baseClassName?: string
  inputClassName?: string
  placeholder?: string
  disabled?: boolean
  icon?: ReactNode
  hideCloseButton?: boolean
  defaultValue?: string;
}

const DropdownField = <T extends FieldValues, TValue = string>({
  control,
  name,
  label,
  data = [], // 2. Default to empty array to prevent .length or .map errors
  placeholder,
  baseClassName,
  icon,
  disabled = false,
  hideCloseButton = false,
  valueType = 'string',
  defaultValue
}: DropdownFieldProps<T, TValue>) => {
  // Radix Select only works with string values, so each option is serialized
  // to a string key, and on change we map back to the original typed value.
  const serialize = (value: unknown): string => {
   
    if (value === null || value === undefined) return ''
    return valueType === 'object' ? JSON.stringify(value) : String(value)
  }

 
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        
        // 3. Ensure value is a string for Shadcn Select, handle null/undefined safely
        const safeValue = serialize(field.value)

        const handleValueChange = (selected: string) => {
          // Radix Select emits onValueChange('') spuriously (e.g. on the
          // StrictMode dev remount via its hidden native select). No option
          // ever has an empty value — clearing is handled by the X button —
          // so an empty selection is always noise and must not wipe the field.
          if (selected === '') return

          if (valueType === 'string') {
            field.onChange(selected)
            return
          }
          const match = data.find((item) => serialize(item?.value) === selected)
          if (match) {
            field.onChange(match.value)
          } else if (valueType === 'int') {
            field.onChange(Number(selected))
          } else {
            field.onChange(null)
          }
        }

        return (
          <FormItem className={baseClassName}>
            {label && (
              <FormLabel className="font-sans text-md text-muted-foreground font-normal">
                {label}
              </FormLabel>
            )}
            <div className="relative flex items-center w-full border rounded-md">
              <div className="relative w-full">
                <Select
                  onValueChange={handleValueChange}
                  value={safeValue}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger className="text-wrap text-ellipsis h-10! border-none shadow-none min-w-[160px] relative w-full focus-visible:ring-0">
                      {icon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {icon}
                        </span>
                      )}
                      <SelectValue
                        className={`w-full ${safeValue && icon
                          ? 'pl-10'
                          : safeValue
                            ? 'pl-2'
                            : icon
                              ? 'pl-10'
                              : ''
                          }`}
                        placeholder={placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {data.length > 0 ? (
                      data.map((item) => (
                        <SelectItem
                          key={serialize(item?.value)}
                          value={serialize(item?.value)}
                        >
                          {item?.text}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-muted-foreground text-center">
                        No options available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {(!hideCloseButton) && (
                <Button
                  type="button"
                  size={'icon'}
                  variant="ghost"
                  className="h-8 w-8 px-0" // Added sizing for the clear button
                  onClick={(e) => {
                    e.preventDefault() // Better than stopPropagation for form elements
                    field.onChange(valueType === 'string' ? '' : null)
                  }}
                  tabIndex={-1}
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4 stroke-gray-500" />
                </Button>
              )}
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )
      }}
    />
  )
}

export default DropdownField
