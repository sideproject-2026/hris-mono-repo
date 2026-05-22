import React from "react";
import { TrashIcon } from "lucide-react";
import {   useFieldArray } from "react-hook-form";
import { periodTypes } from "../../../types/constants";
import type {FieldValues, UseFormReturn} from "react-hook-form";
import type { AttendancePeriodFormValues } from "../../../types/schema";

import ListView from "@/components/custom/lists/ListView";
import { SelectField } from "@/components/custom/inputs";
import SwitchField from "@/components/custom/inputs/SwitchField";
import { Button } from "@/components/ui/button";


/**
 * Component: Step3
 * Description: Summary review component for Step 3 of the Attendance Period creation wizard.
 * It displays a summary of the attendance period details and the list of employees added.
 * as well as an option to enable or disable automation for the period.
 * TODO: (Done) 
 * - ✅ Display summary of attendance period details (name, description, type, start date, end date).
 * - ✅ Display list of employees added to the attendance period.
 * - ✅ Provide option to remove employees from the list.
 * - ✅ Include a switch to enable/disable automation for the attendance period.
 */

interface Step3Props<T extends FieldValues = AttendancePeriodFormValues> {
  form: UseFormReturn<T>;
}

const formatDate = (value?: Date | string | null) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const Step3 = ({ form }: Step3Props) => {
  const values = form.watch() as Partial<AttendancePeriodFormValues>;
  const employees = values.employeeIds ?? [];

  const {remove} = useFieldArray({
    control: form.control,
    name: "employeeIds",
  })

  const periodTypeLabel = React.useMemo(() => {
    if (values.periodType === undefined) return "—";
    const numericValue = Number(values.periodType);
    return periodTypes.find((item) => item.value === numericValue)?.text ?? "—";
  }, [values.periodType]);

  const summaryItems = [
    { label: "Period Name", value: values.name || "—" },
    { label: "Description", value: values.description || "—" },
    { label: "Period Type", value: periodTypeLabel },
    {label: "Company", value: values.company || "—" },
    { label: "Start Date", value: formatDate(values.periodStart) },
    { label: "End Date", value: formatDate(values.periodEnd) },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">Step 3 Review Summary</div>

      <div className="rounded-md border bg-card p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {summaryItems.map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground">{label}</p>
              <p className="text-sm font-medium text-foreground break-words">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-foreground">
            Employees Added ({employees.length})
          </p>

          <ListView
            data={employees}
            maxHeight={220}
            emptyState={<p className="text-sm text-muted-foreground">No employees added yet.</p>}
            getKey={(employee, index) => employee.id ?? employee.employeeId ?? index}
            renderItem={(employee, index) => (
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-0.5 flex flex-row items-center gap-4">
                  <p className="font-medium">Employee #{index + 1}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {employee.employeeId || employee.id || "Pending"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                  <TrashIcon className="font-medium text-red-800" />
                </Button>
              </div>
            )}
          />
        </div>
        <div className="mt-4">
          <SwitchField 
            control={form.control}
            name="automate"
            label="Automate"
            description="Enable or disable automation for this attendance period."
          />

        </div>
      </div>
    </div>
  );
};

export default Step3;