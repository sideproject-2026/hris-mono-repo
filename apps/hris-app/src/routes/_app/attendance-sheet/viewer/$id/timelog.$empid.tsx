
import AttendanceDetailProvider from '@/features/attendance-modules/attendance-management/attendance-details/providers/attendance-detail-provider'
import TimeLogContainer from '@/features/attendance-modules/attendance-management/attendance-reports/time-log-pdf'
import { getAttendanceDetailOptions } from '@/features/attendance-modules/attendance-management/hooks/useAttendanceDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/attendance-sheet/viewer/$id/timelog/$empid',
)({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(
      getAttendanceDetailOptions({
        periodId: params.id,
        employeeNo: Number(params.empid),
      }),
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id, empid } = Route.useParams()

  return (
    <AttendanceDetailProvider periodId={id} employeeNumber={Number(empid)}>
      <TimeLogContainer />
    </AttendanceDetailProvider>
  )
}
