import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DropdownInput from "./DropdownInput";

interface DropZoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  type?: string;
}

const DropZoneField = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  type,
}: DropZoneFieldProps<T>) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-sans text-md font-normal text-gray-500">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <DropdownInput onDrop={(acceptedFiles) => {
                field.onChange(acceptedFiles[0]);
              }} />
              <FormMessage className="text-md text-warning font-poppins" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default DropZoneField;
