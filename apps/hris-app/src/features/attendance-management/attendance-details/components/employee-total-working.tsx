import InputLabels from '@/components/custom/labels/InputLabels';
import React from 'react'

interface EmployeeTotalWorkingProps {
    totalWorkingDays: number;
    totalLateMinutes: number;
    totalUndertimeMinutes: number;
    totalAbsentDays: number;
    totalRestdayOvertime: number;
    totalRegularOvertime: number;
    totalHolidayOvertime: number;
}

const EmployeeTotalWorking = ({ totalWorkingDays, totalLateMinutes, totalUndertimeMinutes, totalAbsentDays, totalRestdayOvertime, totalRegularOvertime, totalHolidayOvertime }: EmployeeTotalWorkingProps) => {
  return (
    <div className='flex gap-3 w-full h-[100px]'>
        <InputLabels label='Total Working Days' text={totalWorkingDays ?? '0.00'} />
        <InputLabels label='Total Late Minutes' text={totalLateMinutes ?? '0.00'} />
        <InputLabels label='Total Undertime Minutes' text={totalUndertimeMinutes ?? '0.00'} />
        <InputLabels label='Total Absent Days' text={totalAbsentDays ?? '0.00'} />
        <InputLabels label='Total Restday Overtime' text={totalRestdayOvertime ?? '0.00'} />
        <InputLabels label='Total Regular Overtime' text={totalRegularOvertime ?? '0.00'} />
        <InputLabels label='Total Holiday Overtime' text={totalHolidayOvertime ?? '0.00'} />
    </div>
  )
}

export default EmployeeTotalWorking