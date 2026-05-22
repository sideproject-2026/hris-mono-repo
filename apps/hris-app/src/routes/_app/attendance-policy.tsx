import { createFileRoute } from '@tanstack/react-router'
import AttendancePolicyComponent from '@/features/attendance-policy/components/attendance-policy'
import { policiesQueryOptions } from '@/features/attendance-policy/hooks/useAttendancePolicy'

export const Route = createFileRoute('/_app/attendance-policy')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(policiesQueryOptions())
  },
  component: AttendancePolicyComponent,
})
