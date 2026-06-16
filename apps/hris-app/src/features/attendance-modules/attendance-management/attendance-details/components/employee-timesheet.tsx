import { formatDate } from 'date-fns'
import { useDetailActionContext } from '../providers/detail-action-provider'
import type { ColumnDef } from '@tanstack/react-table'
import {
  TimePicker,
  TimeSpanField,
  Form,
  TextCell,
  TextCenterColumn,
  TextWithTooltipCell,
  ToolTipTextCell,
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
  ScrollArea,
  Button,
  DropdownField
} from '@hris/shared-ui'
import { cn } from '@/lib/utils'

import RequestDetail from './request-detail'
import { useState } from 'react'
import { useAttendanceDetailContext } from '../providers/attendance-detail-provider'


const EmployeeTimesheet = () => {
  const { onRefresh, periodId, employeeNumber, dtrStatuses } =
    useAttendanceDetailContext()

  const { form, employeeSheet } = useDetailActionContext()

  const [openRequestDetail, setOpenRequestDetail] = useState(false)
  const [seletedRequestId, setSelectedRequestId] = useState<string | undefined>(
    undefined,
  )
  const [openDtrDialog, setOpenDtrDialog] = useState(false)
  const [selectedDtr, setSelectedDtr] = useState<
    AttendanceSheetDetail | undefined
  >(undefined)
  const [day, setDay] = useState('')

  const handleSelectRequest = (id: string, selectedDay: string) => {
    setSelectedRequestId(id)
    setDay(selectedDay)
    setOpenRequestDetail(true)
  }

  const handleSelectDtr = (data: AttendanceSheetDetail) => {
    setSelectedDtr(data)
    setOpenDtrDialog(true)
  }

  const columns: Array<ColumnDef<AttendanceSheetDetail>> = [
    {
      accessorKey: 'date',
      header: () => {
        return <TextCenterColumn>DATE</TextCenterColumn>
      },
      cell: ({ row }) => {
        const date = formatDate(row.original.date, 'MM/dd/yyyy')
        const calendarRemarks = row.original.calendarRemarks
        const weekDay = row.original.weekDay ? ` (${row.original.weekDay})` : ''
        const isHoliday = row.original.isHoliday
        const isRestday = row.original.isRestday
        const colorPick = isHoliday
          ? 'text-red-500 font-semibold'
          : isRestday
            ? 'text-blue-500 font-semibold'
            : 'text-gray-900 font-medium'

        const icon = isHoliday ? '🎉' : isRestday ? '🛌' : '🕧'
        return (
          <ToolTipTextCell
            alignment="start"
            description={`${weekDay} - ${calendarRemarks}`}
          >
            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <p>{icon}</p>
                <p className={cn(colorPick)}>{date}</p>
              </div>
            </div>
          </ToolTipTextCell>
        )
      },
    },
    {
      accessorKey: 'timeIn',
      header: () => {
        return <TextCenterColumn>TIME IN</TextCenterColumn>
      },
      cell: ({ row }) => {
        return (
          <TimePicker
            control={form.control}
            name={`rows.${row.index}.timeIn`}
            intervalMinutes={1}
            displayFormat="hh:mm aa"
            placeholder="HH:MM"
          />
        )
      },
    },
    {
      accessorKey: 'timeOut',
      header: () => {
        return <TextCenterColumn>TIME OUT</TextCenterColumn>
      },
      cell: ({ row }) => {
        return (
          <TimePicker
            control={form.control}
            name={`rows.${row.index}.timeOut`}
            intervalMinutes={1}
            displayFormat="hh:mm aa"
            placeholder="HH:MM"
          />
        )
      },
    },
    {
      header: 'WORKING HOURS',
      size: 150,
      cell: ({ row }) => {
        return (
          <TextCell
            alignment="center"
            className="w-full font-bold text-md text-gray-500"
          >
            {form.getValues(`rows.${row.index}.actualWorkingHour`)}
          </TextCell>
        )
      },
    },
    {
      header: 'DTR Status',
      size: 100,
      cell: ({ row }) => {
        return (
          <DropdownField
            control={form.control}
            data={dtrStatuses}
            name={`rows.${row.index}.dtrStatus`}
            placeholder="Select DTR Status"
          />
        )
      },
    },
    {
      header: 'LATE',
      cell: ({ row }) => {
        return (
          <TextCell
            alignment="center"
            className="w-full font-bold text-md text-gray-500"
          >
            {form.getValues(`rows.${row.index}.lateMinute`)}
          </TextCell>
        )
      },
    },
    {
      header: 'UNDERTIME',
      cell: ({ row }) => {
        return (
          <TextCell
            alignment="center"
            className="w-full font-bold text-md text-gray-500"
          >
            {form.getValues(`rows.${row.index}.underTimeMinute`)}
          </TextCell>
        )
      },
    },
    {
      header: 'ABSENT',
      cell: ({ row }) => {
        return (
          <TextCell
            alignment="center"
            className="w-full font-bold text-md text-gray-500"
          >
            {form.getValues(`rows.${row.index}.absent`)}
          </TextCell>
        )
      },
    },
    {
      header: 'REGULAR OVERTIME',
      cell: ({ row }) => {
        return (
          <TimeSpanField
            control={form.control}
            name={`rows.${row.index}.regularOvertime`}
          />
        )
      },
    },
    {
      header: 'REST DAY OVERTIME',
      cell: ({ row }) => {
        return (
          <TimeSpanField
            control={form.control}
            name={`rows.${row.index}.restdayOvertime`}
          />
        )
      },
    },
    {
      header: 'HOLIDAY OVERTIME',
      cell: ({ row }) => {
        return (
          <TimeSpanField
            control={form.control}
            name={`rows.${row.index}.holidayOvertime`}
          />
        )
      },
    },
    {
      header: 'REMARKS',
      cell: ({ row }) => {
        const remarks = row.original.remarks || 'N/A'
        const id = row.original.id
        const day = formatDate(row.original.date, 'MM/dd/yyyy')
        return remarks !== 'N/A' ? (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => handleSelectRequest(id, day)}
          >
            <TextWithTooltipCell text={remarks} limit={10} alignment="center" />
          </Button>
        ) : (
          <TextWithTooltipCell text={remarks} limit={10} alignment="center" />
        )
      },
    },
  ]

  return (
    <>
      <Form {...form}>
        <ScrollArea className="flex flex-col w-full h-[600px]">
          <DGridProvider data={employeeSheet} columns={columns} type="basic">
            <DGridTable>
              <DGridColumns />
              <DGridRows />
            </DGridTable>
          </DGridProvider>
        </ScrollArea>
      </Form>
      <div className="flex gap-2 items-center -mt-5"></div>
      <RequestDetail
        detailId={seletedRequestId}
        day={day}
        open={openRequestDetail}
        onOpenChange={setOpenRequestDetail}
      />
    </>
  )
}

export default EmployeeTimesheet
