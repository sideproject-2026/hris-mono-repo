import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { ReactNode } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  data: string[]
  type?: string
  baseClassName?: string
  placeholder?: string
  disabled?: boolean
  icon?: ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export default function SelectField<T extends FieldValues>({
  control,
  name,
  data,
  placeholder,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <div className="flex w-full gap-1 border-b p-2  dark:border-secondary border-secondary items-center">
                <SelectTrigger className="w-full font-poppins border-none focus:ring-0 focus:border-none focus-visible:ring-0 shadow-none dark:bg-background bg-background">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </div>
            </FormControl>
            <SelectContent className="w-full text-md font-poppins mt-2 h-auto dark:bg-background bg-background">
              {data.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  )
}
