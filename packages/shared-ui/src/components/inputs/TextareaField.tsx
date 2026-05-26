import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { cn } from '../../lib/utils'
import { Textarea } from '../ui/textarea'

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string // The label for the textarea field.
  baseClassName?: string // Optional class name for the FormItem container.
  inputClassName?: string // Optional class name for the Textarea component.
  placeholder?: string // The placeholder text for the textarea.
  disabled?: boolean // Whether the textarea is disabled.
  icon?: ReactNode // An optional icon to display inside the textarea.
  variant?: 'default' | 'outline' | 'inset' // The visual variant of the textarea.
  orientation?: 'horizontal' | 'vertical' // The orientation of the label and textarea.
}

// cva for input variants
const inputFieldVariants = cva('bg-slate-50 text-black w-full font-sans', {
  variants: {
    variant: {
      default: 'border border-gray-300',
      outline:
        'border-none bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      inset: 'border-none shadow-inner bg-gray-100',
    },
    size: {
      small: 'p-2 text-sm min-h-[80px]',
      medium: 'p-3 text-md min-h-[100px]',
      large: 'p-4 text-lg min-h-[120px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'small',
  },
})

const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  baseClassName,
  inputClassName,
  icon,
  disabled = false,
  variant = 'default',
  orientation = 'vertical',
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            baseClassName,
            orientation === 'vertical'
              ? 'flex flex-col'
              : 'flex items-center gap-2',
          )}
        >
          <FormLabel className="font-sans text-md text-muted-foreground font-normal">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative w-full group">
              {icon && (
                <div className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-sky-500">
                  {icon}
                </div>
              )}
              <Textarea
                className={cn(
                  inputFieldVariants({ variant, size: 'small' }),
                  inputClassName,
                  { 'pl-10': !!icon },
                )}
                {...field}
                placeholder={placeholder}
                disabled={disabled}
              />
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}

export default TextareaField
