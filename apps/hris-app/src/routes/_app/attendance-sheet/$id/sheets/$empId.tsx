import { createFileRoute, useRouter } from '@tanstack/react-router'
import NotFoundErrors from '@/components/custom/misc/NotFoundErrors'
import { getAttendanceDetailOptions } from '@/features/attendance-modules/attendance-management/hooks/useAttendanceDetail'
import AttendanceDetailProvider from '@/features/attendance-modules/attendance-management/attendance-details/providers/attendance-detail-provider'
import { DetailActionProvider } from '@/features/attendance-modules/attendance-management/attendance-details/providers/detail-action-provider'
import RouteDetailComponent from '@/features/attendance-modules/attendance-management/attendance-details/components/route-detail-component'
import { ROUTE } from '@/types/router'


export const Route = createFileRoute(
  '/_app/attendance-sheet/$id/sheets/$empId',
)({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(
      getAttendanceDetailOptions({
        periodId: params.id,
        employeeNo: Number(params.empId),
      }),
    )
  },
  component: () => {
    const { id, empId } = Route.useParams()

    return (
      <AttendanceDetailProvider periodId={id} employeeNumber={Number(empId)}>
        <DetailActionProvider>
          <RouteDetailComponent />
        </DetailActionProvider>
      </AttendanceDetailProvider>
    )
  },
  errorComponent: () => {
    const router = useRouter()
    const { id } = Route.useParams()

    return (
      <NotFoundErrors
        className="h-screen"
        title="Attendance Detail Not Found"
        description="The attendance detail you are looking for does not exist."
        primaryAction={{
          label: 'Go back ',
          onClick: () =>
            router.navigate({ to: ROUTE.ATTENDANCE_SHEET_ROUTE(id) }),
        }}
      />
    )
  },
})
