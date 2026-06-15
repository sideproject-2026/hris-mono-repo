import AttendancePolicyComponent from '@/features/attendance-modules/attendance-policy/components/attendance-policy'
import { policiesQueryOptions } from '@/features/attendance-modules/attendance-policy/hooks/useAttendancePolicy'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_app/attendance-policy')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(policiesQueryOptions())
  },
  component: AttendancePolicyComponent,
})
