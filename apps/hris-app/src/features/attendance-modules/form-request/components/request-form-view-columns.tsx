import { formatLongDate, formatLongDateTime, getDisplayText } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

export const COLUMN_CONFIG: Record<string, ColumnDef<any>[]> = {
  LEAVE: [
    { accessorKey: 'requestLeaveType', header: 'LEAVE TYPE' },
    {
      accessorKey: 'leavePeriod',
      header: 'PERIOD',
      cell: ({ row }) => {
        return (
          <span>{getDisplayText(row.original.leavePeriod.toUpperCase())}</span>
        )
      },
    },
    {
      accessorKey: 'paidLeave',
      header: 'PAID LEAVE',
      cell: ({ row }) => {
        return (
          <div className="flex w-full items-center">
            <Checkbox checked={row.original.paidLeave} />
          </div>
        )
      },
    },
    {
      accessorKey: 'from',
      header: 'FROM',
      cell: ({ row }) => {
        return (
          <span>{formatLongDateTime(row.original.from).toUpperCase()}</span>
        )
      },
    },
    {
      accessorKey: 'to',
      header: 'TO',
      cell: ({ row }) => {
        return <span>{formatLongDateTime(row.original.to).toUpperCase()}</span>
      },
    },
    {
      accessorKey: 'resumeDate',
      header: 'RESUME DATE',
      cell: ({ row }) => {
        return (
          <span>{formatLongDateTime(row.original.resumeDate ?? 'N/A')}</span>
        )
      },
    },
    {
      accessorKey: 'purpose',
      header: 'PURPOSE',
      cell: ({ row }) => {
        return (
          <span className="text-wrap">
            {row.original.purpose.toUpperCase()}
          </span>
        )
      },
    },
  ],
  OFFICIAL_BUSINESS: [
    { accessorKey: 'obType', header: 'TYPE' },
    {
      accessorKey: 'from',
      header: 'FROM',
      cell: ({ row }) => {
        return (
          <span>{formatLongDateTime(row.original.from).toUpperCase()}</span>
        )
      },
    },
    {
      accessorKey: 'to',
      header: 'TO',
      cell: ({ row }) => {
        return <span>{formatLongDateTime(row.original.to).toUpperCase()}</span>
      },
    },
    {
      accessorKey: 'purpose',
      header: 'PURPOSE',
      cell: ({ row }) => {
        return (
          <span className="text-wrap">
            {row.original.purpose.toUpperCase()}
          </span>
        )
      },
    },
  ],
  OT: [
    {
      accessorKey: 'otDate',
      header: 'DATE',
      cell: ({ row }) => {
        return <span>{formatLongDate(row.original.otDate).toUpperCase()}</span>
      },
    },
    { accessorKey: 'timeIn', header: 'TIME-IN' },
    { accessorKey: 'timeOut', header: 'TIME-OUT' },
    { accessorKey: 'totalOT', header: 'TOTAL' },
    {
      accessorKey: 'purpose',
      header: 'PURPOSE',
      cell: ({ row }) => {
        return (
          <span className="text-wrap">
            {row.original.purpose.toUpperCase()}
          </span>
        )
      },
    },
  ],
  TIME_REQUEST: [
    {
      accessorKey: 'timeRequestType',
      header: 'REQUEST TYPE',
      cell: ({ row }) => {
        return <span>{getDisplayText(row.original.timeRequestType)}</span>
      },
    },
    {
      accessorKey: 'trDate',
      header: 'DATE',
      cell: ({ row }) => {
        return <span>{formatLongDate(row.original.trDate).toUpperCase()}</span>
      },
    },
    { accessorKey: 'timeIn', header: 'TIME-IN' },
    { accessorKey: 'timeOut', header: 'TIME-OUT' },
    {
      accessorKey: 'purpose',
      header: 'PURPOSE',
      cell: ({ row }) => {
        return <span>{row.original.purpose.toUpperCase()}</span>
      },
    },
  ],
}
