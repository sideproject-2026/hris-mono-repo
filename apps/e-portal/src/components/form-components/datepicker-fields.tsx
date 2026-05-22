import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { endOfDay, format, isAfter, isBefore, startOfDay } from "date-fns";
import { type Control, type FieldValues, type Path } from "react-hook-form";

interface DatePickerFieldProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  icon?: React.ReactNode;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

export default function DatePickerField<T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  icon,
  disableFutureDates,
  disablePastDates,
}: DatePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          {label && <FormLabel className="text-sm font-normal">{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full flex items-center justify-between text-sm font-normal bg-background h-11 border-gray-400 px-3 rounded-md transition-all hover:bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  {icon ? (
                    <div className="flex items-center justify-center">
                      {icon}
                    </div>
                  ) : null}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={
                  disableFutureDates && disablePastDates
                    ? (date) =>
                        isAfter(endOfDay(date), endOfDay(new Date())) ||
                        isBefore(startOfDay(date), startOfDay(new Date()))
                    : disableFutureDates
                    ? (date) => isAfter(endOfDay(date), endOfDay(new Date()))
                    : disablePastDates
                    ? (date) => isBefore(startOfDay(date), startOfDay(new Date()))
                    : undefined
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}