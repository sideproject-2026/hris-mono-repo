import { Checkbox } from '../ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

interface SelectionItem<T> {
  value: T
  text: string
}

interface CheckboxFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  data: Array<SelectionItem<string>>
}

const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  data,
}: CheckboxFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-md text-muted-foreground font-sans font-normal">
              {label}
            </FormLabel>
          </div>
          <div className="grid grid-cols-1 gap-4 border rounded-lg p-4 bg-muted/5 -mt-3">
            {data.map((item) => (
              <FormField
                key={item.value}
                control={control}
                name={name}
                render={({ field }) => {
                  const values = (
                    Array.isArray(field.value) ? field.value : []
                  ) as string[]
                  return (
                    <FormItem
                      key={item.value}
                      className="flex flex-row items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={values.includes(item.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...values, item.value])
                              : field.onChange(
                                values.filter(
                                  (value: string) => value !== item.value,
                                ),
                              )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-md font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        {item.text}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CheckboxField
