import type { UseFormReturn } from "react-hook-form";
import type { RequestFormSchemaType } from "../types/schema";
import DatePickerField from "@/components/form-components/datepicker-fields";
import TextareaField from "@/components/form-components/textarea-fields";
import DropdownField from "@/components/form-components/dropdown-fields";

const leaveType = [
  {
    value: 1,
    text: "Vacation Leave",
  },
  {
    value: 2,
    text: "Sick Leave",
  },
  {
    value: 3,
    text: "Emergency Leave",
  },
  {
    value: 4,
    text: "Paternity Leave",
  },
  {
    value: 5,
    text: "Maternity Leave",
  },
  {
    value: 6,
    text: "Solo Parent Leave",
  },
  {
    value: 7,
    text: "Bereavement Leave",
  },
];

const leavePeriodType = [
  {
    value: 1,
    text: "Morning Half",
  },
  {
    value: 2,
    text: "Afternoon Half",
  },
  {
    value: 3,
    text: "Whole Day",
  },
];
interface LeaveFormProps {
  form: UseFormReturn<RequestFormSchemaType>;
}

const LeaveForm = ({ form }: LeaveFormProps) => {
  return (
    <form className="space-y-3">
      <DropdownField
        control={form.control}
        name="requestLeaveType"
        label="Leave Type"
        data={leaveType}
        placeholder="Select a type of leave"
      />
      <DropdownField
        control={form.control}
        name="leavePeriodType"
        label="Leave Period"
        data={leavePeriodType}
        placeholder="Select a period of leave"
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
        placeholder="Enter the reason for your overtime"
      />
    </form>
  );
};

export default LeaveForm;
