import { Button } from '@/components/ui/button';
import AttendanceDateInput from '@/features/attendance/components/attendance-date-input';
import AttendanceGrid from '@/features/attendance/components/attendance-grid';
import { AttendanceProvider } from '@/features/attendance/provider/attendance-provider';
import { createFileRoute } from '@tanstack/react-router'
import { DocumentDownload } from 'iconsax-reactjs';

import { createStandardSchemaV1, parseAsIndex, useQueryStates } from 'nuqs'


// Define search parameters for the route
// month: defaults to the current month if not provided, and should be in the format 'YYYY-MM'
//year: defaults to the current year if not provided, and should be in the format 'YYYY'

const defaultMonthAndYear = (() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  return { month: parseInt(currentMonth, 10), year: currentYear };
})();


const searchParams = {
  month: parseAsIndex.withDefault(defaultMonthAndYear.month),
  year: parseAsIndex.withDefault(defaultMonthAndYear.year),
}

export const Route = createFileRoute('/_main/attendance/')({
  component: AttendanceRoute,
  validateSearch: createStandardSchemaV1(searchParams,{
    partialOutput: true,
  })
})

function AttendanceRoute() {

  const [{month, year},setSearchParams] = useQueryStates(searchParams);

  return (
    <AttendanceProvider searchParams={{month, year}} setSearchParams={setSearchParams}>
      <div className="w-full min-h-screen p-3">
        <div className="bg-background rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-sans text-md text-secondary font-semibold">
              Attendance Overview
            </h1>
            <div className="flex gap-3 items-center">
              <Button
                variant={"outline"}
                className="rounded-lg font-sans text-secondary text-sm border-gray-400 hover:ring-1"
              >
                <DocumentDownload variant={"Bold"} size={20} color="#004663" />
                Download
              </Button>
              <AttendanceDateInput />
            </div>
          </div>
          <AttendanceGrid />
        </div>
    </div>
    </AttendanceProvider>
  )
  
}
