import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from '@hris/shared-ui'

import React, { useState } from 'react'
import {
  adjustmentSchema,
  type AdjustmentFormValues,
} from '../../../types/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@hris/shared-ui'
import { InputField, TimeSpanField } from '@hris/shared-ui'
import { ButtonLoading } from '@hris/shared-ui'
import { UploadIcon } from 'lucide-react'
import {
  useAdjustmentMutation,
} from '../../../hooks/useAttendanceProcess'
import { usePeriodSheetContext } from '../sheet-provider'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import type { ColumnDef, RowSelectionState } from '@tanstack/react-table'
import {
  TextCell,
  TextCenterColumn,
} from '@hris/shared-ui'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'
import { formatDate } from 'date-fns'
import { DatePickerField } from '@hris/shared-ui'
import { usePendingOTFilter } from '@/features/attendance-management/hooks/useAdjustment'

const columns: ColumnDef<OvertimePending>[] = [
  {
    accessorKey: 'requestNo',
    header: () => <TextCenterColumn>Request No</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">{row.original.requestNo}</TextCell>
    ),
  },
  {
    accessorKey: 'requestedDate',
    header: () => <TextCenterColumn>Requested Date</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">
        {formatDate(new Date(row.original.requestedDate), 'dd-MM-yyyy')}
      </TextCell>
    ),
  },
  {
    accessorKey: 'approvedDate',
    header: () => <TextCenterColumn>Approved Date</TextCenterColumn>,
    cell: ({ row }) => {
      const approvedDate = row.original.approvedDate
      return (
        <TextCell alignment="center">
          {approvedDate
            ? formatDate(new Date(approvedDate), 'dd-MM-yyyy')
            : 'N/A'}
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'otDate',
    header: () => <TextCenterColumn>OT Date</TextCenterColumn>,
    cell: ({ row }) => {
      const otDate = row.original.otDate
      return (
        <TextCell alignment="center">
          {otDate ? formatDate(new Date(otDate), 'dd-MM-yyyy') : 'N/A'}
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'weekDay',
    header: () => <TextCenterColumn>Week Day</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">{row.original.weekDay}</TextCell>
    ),
  },
  {
    accessorKey: 'timeIn',
    header: () => <TextCenterColumn>Time In</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">{row.original.timeIn}</TextCell>
    ),
  },
  {
    accessorKey: 'timeOut',
    header: () => <TextCenterColumn>Time Out</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">{row.original.timeOut}</TextCell>
    ),
  },
  {
    accessorKey: 'totalHours',
    header: () => <TextCenterColumn>Total Hours</TextCenterColumn>,
    cell: ({ row }) => (
      <TextCell alignment="center">{row.original.totalOT}</TextCell>
    ),
  },
]

const OvertimePendingGrid = ({ employeeId }: { employeeId: number }) => {
  const { form, pendingOT, isLoading, handleSubmit } =
    usePendingOTFilter(employeeId)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [totalOTHour, setTotalOTHour] = useState('00:00:00')

  const handleSelectionChange = (updater: RowSelectionState) => {
    const dataFilter = Object.keys(updater).map(
      (key) => pendingOT?.[Number(key)],
    )

    const totalHours = dataFilter.reduce((acc, item) => {
      if (item) {
        const [hours, minutes, seconds] = item.totalOT.split(':').map(Number)
        console.log('Parsed OT:', { hours, minutes, seconds })
        const totalSeconds = hours * 3600 + minutes * 60
        return acc + totalSeconds
      }
      return acc
    }, 0)
    const hours = Math.floor(totalHours / 3600)
    const minutes = Math.floor((totalHours % 3600) / 60)
    const seconds = totalHours % 60

    setTotalOTHour(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    )

    setRowSelection(updater)
  }

  return (
    <>
      <div className="flex w-full items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full py-4"
          >
            <div className="flex items-end gap-4">
              <DatePickerField
                label="Date From"
                control={form.control}
                name="dateFrom"
                className="w-full"
              />
              <DatePickerField
                label="Date To"
                control={form.control}
                name="dateTo"
                className="w-full"
              />
              <ButtonLoading
                type="submit"
                variant="default"
                text="Filter"
                textLoading="Filtering.."
                loading={isLoading}
                icon={<UploadIcon className="h-4 w-4" />}
              />
            </div>
          </form>
        </Form>
      </div>
      <DGridProvider
        data={pendingOT || []}
        isLoading={isLoading}
        columns={columns}
        type="basic"
        emptyMessage="No pending overtime adjustments."
        withCheckboxes
        rowSelection={rowSelection}
        onRowSelectionChange={handleSelectionChange}
      >
        <DGridTable>
          <DGridColumns />
          <DGridRows />
        </DGridTable>
      </DGridProvider>
      <div className="flex justify-end gap-2 mt-2 items-center">
        <span className="font-medium">Total OT Hours: </span>
        <span className="ml-2">{totalOTHour}</span>
      </div>
    </>
  )
}

interface AdjustmentDialogProps {
  children: React.ReactNode
  initialValue?: {
    employeeId: number
    employeeName: string
    periodId: string
    default: AdjustmentFormValues
  }
}

const AdjustmentDialog = ({
  children,
  initialValue,
}: AdjustmentDialogProps) => {
  const { onRefresh } = usePeriodSheetContext()

  const form = useForm<AdjustmentFormValues>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues: initialValue?.default || {
      period: '',
      regularOT: '00:00:00',
      restDayOT: '00:00:00',
      holidayOT: '00:00:00',
      absent: 0,
    },
  })

  const { mutateAsync, isPending: loading } = useAdjustmentMutation()

  const handleSubmit = async (data: AdjustmentFormValues) => {
    try {
      await mutateAsync({
        periodId: initialValue?.periodId || '',
        employeeId: initialValue?.employeeId || 0,
        data,
      })
      toast.success('Attendance adjustment submitted successfully')
      onRefresh()
    } catch (error: any) {
      const errorMesage = getErrorMessage(error)
      toast.error(`Error submitting attendance adjustment: ${errorMesage}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-7xl">
        <DialogHeader>
          <DialogTitle>
            {initialValue?.employeeName} Overtime Adjustment
          </DialogTitle>
          <DialogDescription>
            This is where the adjustment form will be displayed.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col">
              <Form {...form}>
                <form>
                  <div className="grid grid-cols-4 space-y-2 gap-3 mb-3">
                    <TimeSpanField
                      label="Regular Overtime"
                      control={form.control}
                      name="regularOT"
                      className="w-full"
                      orientation="horizontal"
                    />
                    <TimeSpanField
                      label="Rest Day Overtime"
                      control={form.control}
                      name="restDayOT"
                      className="w-full"
                      orientation="horizontal"
                    />
                    <TimeSpanField
                      label="Holiday Overtime"
                      control={form.control}
                      name="holidayOT"
                      className="w-full"
                      orientation="horizontal"
                    />
                    <InputField
                      type="number"
                      label="Absent Days"
                      control={form.control}
                      name="absent"
                      baseClassName="space-y-2"
                      orientation="float"
                    />
                  </div>
                </form>
              </Form>
            </div>
            <div className="flex-1">
              <OvertimePendingGrid employeeId={initialValue?.employeeId || 0} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex items-center justify-end">
            <ButtonLoading
              variant="default"
              className="mt-5"
              onClick={form.handleSubmit(handleSubmit)}
              text="Update"
              textLoading="Updating.."
              loading={loading}
              icon={<UploadIcon className="h-4 w-4" />}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdjustmentDialog
