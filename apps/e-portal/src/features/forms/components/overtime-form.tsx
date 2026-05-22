import DateTimePickerField from "@/components/form-components/datetime-fields";
import TextareaField from "@/components/form-components/textarea-fields";
import type { UseFormReturn } from "react-hook-form";
import { type RequestFormSchemaType } from "../types/schema";

interface OvertimeFormProps {
  form: UseFormReturn<RequestFormSchemaType>;
}
const OvertimeForm = ({ form }: OvertimeFormProps) => {
  return (
    <form className="space-y-3">
      <DateTimePickerField
        control={form.control}
        name="dateFrom"
        label="Date From"
        placeholder="Select a date"
      />
      <DateTimePickerField
        control={form.control}
        name="dateTo"
        label="Date To"
        placeholder="Select a date"
      />
      <TextareaField
        control={form.control}
        name="purpose"
        label="Purpose"
        placeholder="Enter purpose"
      />
    </form>
  );
};

export default OvertimeForm;
