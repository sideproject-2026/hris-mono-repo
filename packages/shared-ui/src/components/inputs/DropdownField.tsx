import { X } from 'lucide-react'
import type { ReactNode } from 'react'
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

interface DropdownFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  type?: string
  data: SelectionItem<string>[] // Ensure this is never undefined when passed
  baseClassName?: string
  inputClassName?: string
  placeholder?: string
  disabled?: boolean
  icon?: ReactNode
  hideCloseButton?: boolean
}

const DropdownField = <T extends FieldValues>({
  control,
  name,
  label,
  data = [], // 2. Default to empty array to prevent .length or .map errors
  placeholder,
  baseClassName,
  icon,
  disabled = false,
  hideCloseButton = false,
}: DropdownFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {

        // 3. Ensure value is a string for Shadcn Select, handle null/undefined safely
        const safeValue = field.value?.toString() ?? ''

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
                  onValueChange={field.onChange}
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
                          key={item?.value}
                          value={item?.value?.toString()}
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
                    field.onChange('')
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
