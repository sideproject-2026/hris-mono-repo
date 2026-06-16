
import { Calendar1Icon } from 'lucide-react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { InputField, DatePickerField, DropdownField, Skeleton } from '@hris/shared-ui';
import { useQuery } from '@tanstack/react-query';
import { getPeriodInitialOptions } from '@/features/attendance-modules/attendance-management/hooks/useAttendanceProcess';


/**
 * Component: Step1
 * Description: This component represents Step 1 of the Attendance Period creation wizard.
 * It captures basic details about the attendance period such as name, description, type, start date, and end date. 
 * TODO: (Done) 
 * - Input field for Period Name.
 * - Input field for Period Description.
 * - Dropdown to select Period Type from predefined options.
 * - Date picker for Period Start date.
 * - Date picker for Period End date.
 * - Next button to proceed to Step 2.
 */


interface Step1Props<T extends FieldValues> {
  form: UseFormReturn<T>;
}


const Step1 = <T extends FieldValues>({ form }: Step1Props<T>) => {

  const { data, isFetching } = useQuery(getPeriodInitialOptions())

  if (isFetching) {
    return (<Skeleton className='h-40 w-full rounded-md' />)
  }

  const employeeTypes = data?.employeeTypes || [];
  const companies = data?.companies || [];
  console.log('Companies Data in Step1:', companies);
  console.log('Employee Types Data in Step1:', employeeTypes);
  return (
    <>
      <div className='text-sm text-gray-400'>Step 1 Enter Attendance Period Details</div>
      <InputField
        name="name"
        control={form.control}
        label="Period Name"
        placeholder="Enter period name"
      />
      <InputField
        name="description"
        control={form.control}
        label="Period Description"
        placeholder="Enter period description"
      />
      <DropdownField
        control={form.control}
        name="periodType"
        data={employeeTypes}
        label="Employee Type"
        hideCloseButton
      />

      <DropdownField
        control={form.control}
        name="company"
        data={companies}
        label="Company"
        hideCloseButton
      />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
        <DatePickerField
          control={form.control}
          name="periodStart"
          label="Period Start"
          icon={<Calendar1Icon className="size-4" />}
        />
        <DatePickerField
          control={form.control}
          name="periodEnd"
          label="Period End"
          icon={<Calendar1Icon className="size-4" />}
        />
      </div>
    </>
  )
}

export default Step1
