import { X } from "lucide-react";
import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type?: string;
  data: Array<SelectionItem<string | number>>;
  baseClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
  hideCloseButton?: boolean;
}

const DropdownField = <T extends FieldValues>({
  control,
  name,
  label,
  data,
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
        return (
          <FormItem className={baseClassName}>
            <FormLabel className="font-sans">{label}</FormLabel>
            <div className="relative flex items-center w-full">
              <div className="relative w-full">
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString() ?? ""}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger className="w-full h-11!">
                      {/* Clear button on the left */}
                      {/* Icon, if present, shifted right to avoid overlap */}
                      {icon && (
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {icon}
                        </span>
                      )}
                      <SelectValue
                        className={`w-full ${
                          field.value && icon
                            ? "pl-14"
                            : field.value
                              ? "pl-8"
                              : icon
                                ? "pl-10"
                                : ""
                        }`}
                        placeholder={placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {data.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value.toString()}
                      >
                        {item.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!hideCloseButton && field.value && (
                <Button
                  type="button"
                  size={"sm"}
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange("");
                  }}
                  tabIndex={-1}
                  aria-label="Clear selection"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        );
      }}
    />
  );
};

export default DropdownField;
