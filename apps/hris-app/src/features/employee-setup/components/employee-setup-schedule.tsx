import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
  Checkbox,
} from '@hris/shared-ui'
import type { ColumnDef } from '@tanstack/react-table'

interface EmployeeSetupScheduleProps {
  workSchedule: WorkSchedule
}

const EmployeeSetupSchedule = ({
  workSchedule,
}: EmployeeSetupScheduleProps) => {
  const columns: ColumnDef<WorkDetail>[] = [
    {
      accessorKey: 'scheduleDay',
      header: 'SCHEDULE DAY',
      cell: ({ row }) => {
        const scheduleDay = row.original.scheduleDay
        return (
          <span className="font-medium text-sm truncate uppercase">
            {scheduleDay}
          </span>
        )
      },
    },
    {
      accessorKey: 'breakTime',
      header: 'BREAK TIME',
      cell: ({ row }) => {
        const breakTime = row.original.breakTime
        return (
          <span className="font-medium text-sm truncate uppercase">
            {breakTime} hour
          </span>
        )
      },
    },
    {
      accessorKey: 'timeIn',
      header: 'TIME IN',
      cell: ({ row }) => {
        const timeIn = row.original.timeIn
        return (
          <span className="font-medium text-sm truncate uppercase">
            {timeIn || '00:00:00'}
          </span>
        )
      },
    },
    {
      accessorKey: 'timeOut',
      header: 'TIME OUT',
      cell: ({ row }) => {
        const timeOut = row.original.timeOut
        return (
          <span className="font-medium text-sm truncate uppercase">
            {timeOut || '00:00:00'}
          </span>
        )
      },
    },
    {
      accessorKey: 'fixedSchedule',
      header: 'FIXED SCHEDULE',
      cell: ({ row }) => {
        return <Checkbox checked={row.original.fixedSchedule} />
      },
    },
    {
      accessorKey: 'active',
      header: 'ACTIVE',
      cell: ({ row }) => {
        return <Checkbox checked={row.original.active} />
      },
    },
  ]

  return (
    <div className="relative">
      <DGridProvider
        data={workSchedule.workDetails}
        columns={columns}
        type="basic"
        emptyMessage="No request found."
        stickyFirstColumn
      >
        <DGridTable>
          <DGridColumns />
          <DGridRows />
        </DGridTable>
      </DGridProvider>
    </div>
  )
}

export default EmployeeSetupSchedule
