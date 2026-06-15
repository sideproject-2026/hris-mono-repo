import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import { attendanceManagementQueryParsers } from '@/features/attendance-modules/attendance-management/types/search'
import RoutePeriodComponent from '@/features/attendance-modules/attendance-management/attendance-periods/components/route-component'

import AttendancePeriodProvider from '@/features/attendance-modules/attendance-management/attendance-periods/components/attendance-period-provider'

export const Route = createFileRoute('/_app/attendance-period')({
  validateSearch: createStandardSchemaV1(attendanceManagementQueryParsers, {
    partialOutput: true,
  }),
  
  component: () => (
    <AttendancePeriodProvider>
      <RoutePeriodComponent />
    </AttendancePeriodProvider>
  ),
})
