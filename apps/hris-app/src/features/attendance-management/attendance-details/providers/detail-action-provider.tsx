import { createContext, useContext, useEffect, useMemo } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  type EmployeeTimesheetFormValues,
  employeeAttendanceSheetSchema,
} from '../../types/schema'
import { useAttendanceDetailContext } from './attendance-detail-provider'
import { useConfirmationContext } from '@hris/shared-ui'
import { useUpdateDetailMutation } from '../../hooks/useAttendanceDetail'
import { toast } from 'sonner'

interface DetailSaveContextType {
  form: UseFormReturn<EmployeeTimesheetFormValues>
  onSubmit: (data: EmployeeTimesheetFormValues) => void
  employeeSheet: Array<AttendanceSheetDetail>
  saving: boolean
}

const DetailActionContext = createContext<DetailSaveContextType | undefined>(
  undefined,
)

export const useDetailActionContext = () => {
  const context = useContext(DetailActionContext)
  if (!context) {
    throw new Error(
      'useDetailSaveContext must be used within a DetailSaveProvider',
    )
  }
  return context
}

export const DetailActionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { sheets, period, onRefresh, employeeNumber, periodId } =
    useAttendanceDetailContext()
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync, isPending } = useUpdateDetailMutation()

  const employeeSheet = useMemo(() => {
    if (!sheets) return []
    return sheets
      .flatMap((sheet) =>
        Array.isArray(sheet.employeeSheet)
          ? sheet.employeeSheet
          : [sheet.employeeSheet],
      )
      .filter(Boolean)
  }, [sheets])

  const form = useForm<EmployeeTimesheetFormValues>({
    resolver: zodResolver(employeeAttendanceSheetSchema),
    defaultValues: {
      rows: [],
    },
  })

  useEffect(() => {
    if (employeeSheet && employeeSheet.length > 0) {
      form.reset({
        rows: employeeSheet.map((sheet) => ({
          detailId: sheet.id,
          date: format(new Date(sheet.date), 'yyyy-MM-dd'),
          timeIn: sheet.timeIn ?? '',
          timeOut: sheet.timeOut ?? '',
          scheduleTimeIn: sheet.scheduleTimeIn,
          scheduleTimeOut: sheet.scheduleTimeOut,
          actualWorkingHour: sheet.actualWorkingHour?.toString(),
          dtrStatus: sheet.dtrStatus || '',
          earlyInMinute: sheet.earlyInMinute?.toString(),
          lateOutMinute: sheet.lateOutMinute?.toString(),
          lateMinute: sheet.lateMinute?.toString(),
          underTimeMinute: sheet.underTimeMinute?.toString(),
          absent: sheet.absent?.toString(),
          regularOvertime: sheet.regularOvertime?.toString(),
          restdayOvertime: sheet.restdayOvertime?.toString(),
          holidayOvertime: sheet.holidayOvertime?.toString(),
          remarks: sheet.remarks,
        })),
      })
    }
  }, [employeeSheet, form])

  const onSubmit = async (data: EmployeeTimesheetFormValues) => {
    const confirmed = await requestConfirmation({
      title: 'Save Attendance Period',
      description: 'Are you sure you want to save this attendance period?',
      onConfirm: async () => {
        try {
          await mutateAsync({
            periodId: periodId!,
            employeeId: employeeNumber!,
            data,
          })
          toast.success('Attendance period saved successfully')
          onRefresh()
        } catch (error) {
          console.log(error)
          toast.error('Failed to save attendance period')
        }
      },
    })
  }

  return (
    <DetailActionContext.Provider
      value={{ form, onSubmit, employeeSheet, saving: isPending }}
    >
      {children}
    </DetailActionContext.Provider>
  )
}
