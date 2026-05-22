import DropdownField from "@/components/form-components/dropdown-fields";
import DateTimePickerField from "@/components/form-components/datetime-fields";
import TextareaField from "@/components/form-components/textarea-fields";
import { type RequestFormSchemaType } from "../types/schema";
import type { UseFormReturn } from "react-hook-form";

const OB_TYPES = [
  { value: 1, text: "Morning" },
  { value: 2, text: "Afternoon" },
  { value: 3, text: "Whole Day" },
];

interface OfficialBusinessFormProps {
  form: UseFormReturn<RequestFormSchemaType>;
}

const OfficialBusinessForm = ({ form }: OfficialBusinessFormProps) => {
  return (
    <form className="space-y-3">
      <DropdownField
        control={form.control}
        name="requestOBType"
        label="OB Type"
        data={OB_TYPES}
        placeholder="Select OB Type"
      />
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

export default OfficialBusinessForm;
