import type { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import type { ReactNode } from "react";

interface InputFieldsProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    type?: string;
    placeholder?: string;
    icon?: ReactNode;
}

const InputFields = <T extends FieldValues>({ control, name, label, type, placeholder, icon }: InputFieldsProps<T>) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="text-sm text-gray-700">{label}</FormLabel>
                <FormControl>
                    <div className="relative w-full">
                        {icon && <div className="absolute top-0 bottom-0 pl-2 flex items-center pointer-events-none">
                            {icon}
                        </div>}
                        <Input type={type} placeholder={placeholder} {...field} className="h-11 pl-9 font-sans text-secondary" />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default InputFields