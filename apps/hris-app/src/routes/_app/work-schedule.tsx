import { createFileRoute } from '@tanstack/react-router'
import WorkScheduleComponent from '@/features/work-schedules/components/work-schedule'
import { workScheduleOptions } from '@/features/work-schedules/hooks/useWorkSchedule'
import WorkScheduleProvider from '@/features/work-schedules/components/work-schedule-provider'

export const Route = createFileRoute('/_app/work-schedule')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(workScheduleOptions())
  },
  component: () => (
    <WorkScheduleProvider>
      <WorkScheduleComponent />
    </WorkScheduleProvider>
  ),
})
