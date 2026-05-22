import { queryOptions, useMutation } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'
import type {
  DtrSchemaValue,
  EmployeeTimesheetFormValues,
} from '../types/schema'
import { request } from '@/lib/http'
import { string } from 'zod'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'

export const useDetailExport = () => {
  const [isPending, startTransition] = useTransition()

  const handleDetailSheetExport = (periodId: string, employeeNo: number) => {
    startTransition(async () => {
      try {
        const url = `/attendances/exports/sheets/${periodId}/${employeeNo}`
        await request.exportExcel(
          url,
          `Attendance_Detail_Sheet_${periodId}_${employeeNo}.xlsx`,
        )
        toast.success('Attendance detail sheet exported successfully.')
      } catch (error) {
        console.error('Error exporting attendance detail sheet:', error)
        toast.error(
          'Failed to export attendance detail sheet. Please try again.',
        )
      }
    })
  }

  return { handleDetailSheetExport, isPending }
}

export const useGetRequestDetailOptions = (detailId?: string) => {
  return queryOptions({
    queryKey: ['attendance-detail', detailId],
    queryFn: async () => {
      const response = await request.get<APIResponse<RequestDetail[]>>(
        `/attendances/details/${detailId}/requests`,
      )
      console.log('API Response for Request Details:', response)
      return response.data
    },
    enabled: false,
    staleTime: 30000, // 30 seconds
  })
}

export const getAttendanceDetailOptions = ({
  periodId,
  employeeNo,
}: {
  periodId: string
  employeeNo: number
}) => {
  return queryOptions({
    queryKey: ['attendance-detail', periodId, employeeNo],
    queryFn: async () => {
      const response = await request.get<
        APIResponse<{
          period: AttendancePeriod
          dtrStatuses: SelectionItem<string>[]
        }>
      >(`/attendances/periods/${periodId}/sheets/${employeeNo}`)
      return response
    },
    select: (res) => {
      return {
        dtrStatuses: res.data.dtrStatuses,
        period: {
          ...res.data.period,
          sheets: res.data.period.sheets.map((sheet) => {
            return {
              ...sheet,
              employeeSheet: sheet.employeeSheet.map((detail) => {
                return {
                  ...detail,
                  isHoliday: detail.dtrStatus.toLowerCase() === 'holiday',
                  isRestday: detail.dtrStatus.toLowerCase() === 'restday',
                }
              }),
            }
          }),
        },
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 seconds
    enabled: Boolean(periodId && employeeNo),
  })
}

export const useManualProcess = () => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync, isPending: isProcessing } = useMutation({
    mutationFn: async ({
      periodId,
      employeeId,
    }: {
      periodId: string
      employeeId: number
    }) => {
      const response = await request.put(
        '/attendances/periods/manual-process',
        {
          periodId,
          employeeId,
        },
      )
      return response
    },
  })

  const handleManualProcessClick = async ({
    periodId,
    employeeId,
    subtitle,
    callback,
  }: {
    periodId: string
    employeeId: number
    subtitle?: string
    callback?: () => void
  }) => {
    try {
      requestConfirmation({
        title: 'Manual Process',
        description: `Are you sure you want to process ${subtitle} sheet?`,
        onConfirm: async () => {
          await mutateAsync({ periodId, employeeId })
          callback?.()
        },
      })
    } catch (error) {
      toast.error(
        'Failed to process attendance detail sheet. Please try again.',
      )
    }
  }

  return { handleManualProcessClick, isProcessing }
}

export const useUpdateDtrMutation = () => {
  return useMutation({
    mutationFn: async ({
      periodId,
      employeeId,
      value,
    }: {
      periodId: string
      employeeId: number
      value: DtrSchemaValue
    }) => {
      const data = {
        ...value,
        late: 0,
        underTime: 0,
        absent: 0,
      }
      const response = await request.put(
        `/attendances/periods/${periodId}/sheets/${employeeId}/details`,
        {
          details: [data],
        },
      )
      return response
    },
  })
}

export const useUpdateDetailMutation = () => {
  return useMutation({
    mutationFn: async ({
      periodId,
      employeeId,
      data,
    }: {
      periodId: string
      employeeId: number
      data: EmployeeTimesheetFormValues
    }) => {
      const response = await request.put(
        `/attendances/periods/${periodId}/sheets/${employeeId}/details`,
        { details: data.rows },
      )
      return response
    },
  })
}
