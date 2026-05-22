import { formatDate } from 'date-fns'

import { SheetMainMenu, SheetMenuAction } from './sheet-menu-action'
import { usePeriodSheetContext } from './sheet-provider'
import { SheetAutomateSwitch } from './sheet-automate-switch'
import SheetFilter from './sheet-filter'
import type { ColumnDef } from '@tanstack/react-table'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import PageContainer from '@/components/custom/containers/page-container'
import { ROUTE } from '@/types/router'
import {
  TextCell,
  TextCenterColumn,
  UserAvatarCell,
} from '@/components/custom/grid/columns/column-type'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'

const columns: Array<ColumnDef<AttendanceSheet>> = [
  {
    id: 'avatar',
    size: 30,
    cell: ({ row }) => {
      const photo = row.original.avatar.avatarPhoto ?? ''
      const fullName = `${row.original.avatar.lastName} ${row.original.avatar.firstName}`
      return (
        <UserAvatarCell
          className="w-full justify-center"
          name={fullName}
          avatarUrl={photo}
          hideName={true}
        />
      )
    },
  },
  {
    id: 'fullName',
    header: 'Name',
    cell: ({ row }) => {
      const fullName = `${row.original.avatar.lastName} ${row.original.avatar.firstName}`
      const position = row.original.position
      return (
        <TextCell alignment="start">
          <div className="flex flex-col">
            <span className="font-medium">{fullName}</span>
            <span className="text-muted-foreground text-xs">{position}</span>
          </div>
        </TextCell>
      )
    },
  },
  {
    id: 'company',
    header: 'Company',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <TextCell alignment="start">{row.original.company}</TextCell>
          <TextCell alignment="start" className="text-muted-foreground text-xs">
            {row.original.department}
          </TextCell>
        </div>
      )
    },
  },
  {
    accessorKey: 'totalWorkingDays',
    header: () => <TextCenterColumn>W.Days</TextCenterColumn>,
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center">
        <span className="font-bold">{row.original.totalWorkingDays}</span>
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalAbsentDays',
    header: () => <TextCenterColumn>Absents</TextCenterColumn>,
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-rose-500">
        {row.original.totalAbsentDays}
      </TextCell>
    ),
  },
  {
    accessorKey: 'absentAdjustment',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Absent</span>
          <span>Adjustment</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-rose-500">
        {row.original.absentAdjustment}
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalLateMinutes',
    header: () => <TextCenterColumn>Late</TextCenterColumn>,
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-rose-500">
        {row.original.totalLateMinutes}
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalUndertimeMinutes',
    header: () => <TextCenterColumn>Undertime</TextCenterColumn>,
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-rose-500">
        {row.original.totalUndertimeMinutes}
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalRegularOvertime',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Regular</span>
          <span>Overtime</span>
        </div>
      </TextCenterColumn>
    ),

    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.totalRegularOvertime}
      </TextCell>
    ),
  },
  {
    accessorKey: 'regularOvertimeAdjustment',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Regular</span>
          <span>Adjustment</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.regularOvertimeAdjustment}
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalRestdayOvertime',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Rest Day</span>
          <span>Overtime</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.totalRestdayOvertime}
      </TextCell>
    ),
  },
  {
    accessorKey: 'restdayOvertimeAdjustment',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Rest Day</span>
          <span>Adjustment</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.restdayOvertimeAdjustment}
      </TextCell>
    ),
  },
  {
    accessorKey: 'totalHolidayOvertime',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Holiday</span>
          <span>Overtime</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.totalHolidayOvertime}
      </TextCell>
    ),
  },
  {
    accessorKey: 'holidayOvertimeAdjustment',
    header: () => (
      <TextCenterColumn>
        <div className="flex flex-col justify-center items-center gap-1">
          <span>Holiday</span>
          <span>Adjustment</span>
        </div>
      </TextCenterColumn>
    ),
    size: 80,
    cell: ({ row }) => (
      <TextCell alignment="center" className="font-bold text-sky-500">
        {row.original.holidayOvertimeAdjustment}
      </TextCell>
    ),
  },

  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      return <SheetMenuAction sheet={row.original} />
    },
  },
]

const RouteSheetComponent = () => {
  const { sheets, period, loading } = usePeriodSheetContext()
  console.log('grid', '')
  return (
    <>
      <HeaderContainer loading={loading}>
        <HeaderText
          title="Attendance Sheet"
          subtitle={`Period covered ${formatDate(period.periodFrom, 'MMM dd, yyyy')} - ${formatDate(period.periodTo, 'MMM dd, yyyy')}`}
        >
          <HeaderBackButton to={ROUTE.ATTENDANCE_PERIOD_ROUTE} />
        </HeaderText>
        {/* TODO: Display the automate switch */}
        <div>
          {!period.posted && (
            <SheetAutomateSwitch
              value={period.isAutomate}
              periodId={period.id}
            />
          )}
          <p className="text-sm text-red-800 font-bold mt-1">
            <span>Status</span>: {period.status}
          </p>
        </div>
      </HeaderContainer>
      <PageContainer>
        <SheetMainMenu />
        <SheetFilter />
        <DGridProvider
          isLoading={loading}
          data={sheets ?? []}
          columns={columns}
          type="basic"
          emptyMessage="No attendance sheets found."
          stickyFirstColumn
        >
          <DGridTable className="h-[520px]">
            <DGridColumns />
            <DGridRows />
          </DGridTable>
        </DGridProvider>
      </PageContainer>
    </>
  )
}

export default RouteSheetComponent
