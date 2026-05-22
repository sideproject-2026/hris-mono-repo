import type { UseFormReturn } from "react-hook-form";
import type { RequestFormSchemaType } from "../types/schema";
import DropdownField from "@/components/form-components/dropdown-fields";
import DatePickerField from "@/components/form-components/datepicker-fields";
import TextareaField from "@/components/form-components/textarea-fields";

const dtrType = [
  {
    value: 1,
    text: "Morning",
  },
  {
    value: 2,
    text: "Afternoon",
  },
  {
    value: 3,
    text: "Whole Day",
  },
];

interface DtrCorrectionFormProps {
  form: UseFormReturn<RequestFormSchemaType>;
}

const DtrCorrectionForm = ({ form }: DtrCorrectionFormProps) => {
  return (
    <form className="space-y-3">
      <DropdownField
        control={form.control}
        name="requestTimeType"
        label="Type of DTR Correction"
        data={dtrType}
        placeholder="Select DTR Type"
      />
      <DatePickerField
        control={form.control}
        name="dateFrom"
        label="Date From"
        placeholder="Select a date"
      />
      <DatePickerField
        control={form.control}
        name="dateTo"
        label="Date To"
        placeholder="Select a date"
      />
      <TextareaField
        control={form.control}
        name="purpose"
        label="Purpose"
        placeholder="Enter the reason for your DTR correction"
      />
    </form>
  );
};

export default DtrCorrectionForm;
