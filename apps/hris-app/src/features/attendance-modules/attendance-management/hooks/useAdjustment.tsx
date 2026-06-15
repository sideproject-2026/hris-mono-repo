import { useState } from 'react'
import {
  overtimePendingSchema,
  type OvertimePendingFormValues,
} from '../types/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetPendingOTQuery } from './useAttendanceProcess'

export const usePendingOTFilter = (employeeId: number) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [formValue, setFormValue] = useState<OvertimePendingFormValues | null>(
    null,
  )

  const { data: pendingOT, isLoading } = useGetPendingOTQuery({
    formValue: formValue,
    isSubmit,
  })

  const form = useForm<OvertimePendingFormValues>({
    resolver: zodResolver(overtimePendingSchema),
    defaultValues: {
      employeeId: employeeId,
      dateFrom: new Date(),
      dateTo: new Date(),
    },
  })

  const handleSubmit = (data: OvertimePendingFormValues) => {
    setFormValue(data)
    setIsSubmit(true)
  }

  return { form, handleSubmit, pendingOT, isLoading }
}
