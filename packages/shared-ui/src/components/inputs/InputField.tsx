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
import { Input } from '@hris/shared-ui'
import { cn } from '../../lib/utils'

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  type?: string
  baseClassName?: string
  inputClassName?: string
  placeholder?: string
  disabled?: boolean
  icon?: ReactNode
  variant?: 'default' | 'outline' | 'inset'
  orientation?: 'horizontal' | 'vertical' | 'float'
}

// cva for input variants
const inputFieldVariants = cva('py-5 text-black w-full', {
  variants: {
    variant: {
      default: 'border border-gray-300 ',
      outline:
        'border-none bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      inset: 'border-none shadow-inner bg-gray-100',
    },
    size: {
      small: 'px-3 h-11 text-sm',
      medium: 'px-4 h-14 text-md',
      large: 'px-5 h-15 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
})

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
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
      render={({ field }) => {
        const isHorizontal = orientation === 'horizontal'
        const isFloat = orientation === 'float'
        const floatingLabelId =
          isFloat && label
            ? `${String(name).replace(/\./g, '-')}-floating-label`
            : undefined

        return (
          <FormItem
            className={cn(
              baseClassName,
              isHorizontal ? 'flex items-center gap-2' : 'flex flex-col',
            )}
          >
            {label && (
              <FormLabel
                className={cn(
                  'font-sans text-md text-muted-foreground font-normal',
                  isFloat && 'sr-only',
                )}
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative w-full">
                {icon && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {icon}
                  </div>
                )}
                {isFloat && label && (
                  <span
                    id={floatingLabelId}
                    className={cn(
                      'pointer-events-none absolute top-[-9px] text-xs font-medium text-muted-foreground',
                      icon ? 'left-[50px]' : 'left-2',
                    )}
                  >
                    {label}
                  </span>
                )}
                <Input
                  className={cn(
                    'w-full font-sans text-sm! h-10!',
                    inputFieldVariants({ variant, size: 'small' }),
                    icon ? 'pl-10' : 's',
                    isFloat && 'pt-6',
                    inputClassName,
                  )}
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-labelledby={floatingLabelId}
                  aria-label={!label && placeholder ? placeholder : undefined}
                />
              </div>
            </FormControl>
            <FormMessage
              className={cn(
                'text-red-500',
                (isHorizontal || isFloat) && 'mt-2',
              )}
            />
          </FormItem>
        )
      }}
    />
  )
}

export default InputField
