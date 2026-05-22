import { TimePicker, TimeSpanField } from '@/components/custom/inputs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatDate } from 'date-fns'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAttendanceDetailContext } from '../providers/attendance-detail-provider'
import DropdownField from '@/components/custom/inputs/DropdownField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { dtrFormSchema, type DtrSchemaValue } from '../../types/schema'
import { useUpdateDtrMutation } from '../../hooks/useAttendanceDetail'
import { toast } from 'sonner'

interface EmployeeDtrDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: AttendanceSheetDetail
  periodId: string
  employeeId: number
}

const EmployeeDtrDialog = ({
  open,
  onOpenChange,
  initialData,
  periodId,
  employeeId,
}: EmployeeDtrDialogProps) => {
  const { dtrStatuses, onRefresh } = useAttendanceDetailContext()
  const { mutateAsync: updateDtr, isPending: isUpdatingDtr } =
    useUpdateDtrMutation()

  const form = useForm<DtrSchemaValue>({
    resolver: zodResolver(dtrFormSchema),
    defaultValues: {
      detailId: initialData?.id || '',
      timeIn: initialData?.timeIn || '',
      timeOut: initialData?.timeOut || '',
      dtrStatus: initialData?.dtrStatus || '',
      regularOvertime: initialData?.regularOvertime || '00:00',
      restdayOvertime: initialData?.restdayOvertime || '00:00',
      holidayOvertime: initialData?.holidayOvertime || '00:00',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        timeIn: initialData?.timeIn ?? '',
        timeOut: initialData?.timeOut ?? '',
        dtrStatus: initialData?.dtrStatus ?? '',
        regularOvertime: initialData?.regularOvertime ?? '00:00',
        restdayOvertime: initialData?.restdayOvertime ?? '00:00',
        holidayOvertime: initialData?.holidayOvertime ?? '00:00',
      })
    }
  }, [initialData])

  const handleSubmit = async (data: DtrSchemaValue) => {
    try {
      await updateDtr({
        periodId,
        employeeId,
        value: data,
      })
      toast.success('DTR updated successfully')
      onRefresh()
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to update DTR')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee DTR</DialogTitle>
          <DialogDescription>
            {formatDate(initialData?.date || '', 'MMM dd, yyyy')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="flex flex-col gap-2">
                <Label>Time In</Label>
                <TimePicker
                  control={form.control}
                  name="timeIn"
                  intervalMinutes={1}
                  displayFormat="hh:mm aa"
                  placeholder="HH:MM"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Time Out</Label>
                <TimePicker
                  control={form.control}
                  name="timeOut"
                  intervalMinutes={1}
                  displayFormat="hh:mm aa"
                  placeholder="HH:MM"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="w-full flex flex-col gap-2">
                <Label>DTR Status</Label>
                <DropdownField
                  control={form.control}
                  data={dtrStatuses}
                  name="dtrStatus"
                  placeholder="Select DTR Status"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 my-3 w-full">
              <div className="flex flex-col gap-2">
                <Label>Regular Overtime</Label>
                <TimeSpanField control={form.control} name="regularOvertime" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Restday Overtime</Label>
                <TimeSpanField control={form.control} name="restdayOvertime" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Holiday Overtime</Label>
                <TimeSpanField control={form.control} name="holidayOvertime" />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <ButtonLoading
            loading={isUpdatingDtr}
            textLoading="Saving..."
            text="Save"
            onClick={form.handleSubmit(handleSubmit)}
            variant="default"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeDtrDialog
