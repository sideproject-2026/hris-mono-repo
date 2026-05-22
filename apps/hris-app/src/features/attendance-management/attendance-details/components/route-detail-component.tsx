import { format } from 'date-fns'
import { useAttendanceDetailContext } from '../providers/attendance-detail-provider'
import EmployeeProfile from './employee-profile'
import EmployeeTimesheet from './employee-timesheet'
import MenuAction from './menu-action'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { ROUTE } from '@/types/router'
import { setFullName } from '@/lib/utils'
import PageContainer from '@/components/custom/containers/page-container'

const RouteDetailComponent = () => {
  const { period, sheets, loading } = useAttendanceDetailContext()

  const fullName = setFullName(
    sheets?.[0]?.avatar.firstName || '',
    sheets?.[0]?.avatar.lastName || '',
  )
  const periodId = period?.id || ''
  const periodFrom = period?.periodFrom
    ? format(period.periodFrom, 'MM/dd/yyyy')
    : 'N/A'
  const periodTo = period?.periodTo
    ? format(period.periodTo, 'MM/dd/yyyy')
    : 'N/A'

  return (
    <>
      <HeaderContainer loading={loading}>
        <HeaderText
          title="Employee Timesheet Details"
          subtitle={`Period covered ${periodFrom} to ${periodTo} - Employee ${fullName}`}
        >
          <HeaderBackButton to={ROUTE.ATTENDANCE_SHEET_ROUTE(periodId)} />
        </HeaderText>
        <div className="flex flex-row items-center"></div>
      </HeaderContainer>
      <PageContainer loading={loading} className="flex flex-col gap-5 relative">
        <MenuAction />
        <EmployeeProfile />
        <EmployeeTimesheet />
      </PageContainer>
    </>
  )
}

export default RouteDetailComponent
