import { request } from '@/lib/http'
import { ApiRoutes } from '@/types/api-routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import type { HRFormCreateSchemaType } from '../types/create-schema'

// C# DateOnly format ("yyyy-MM-dd").
const toDateOnly = (date?: Date | null) =>
  date ? format(date, 'yyyy-MM-dd') : null

// Maps the form values into the backend Employee Action Request payload.
const toPayload = (data: HRFormCreateSchemaType) => ({
  type: data.type,
  effectiveDate: toDateOnly(data.effectiveDate),
  justification: data.justification,
  attachment: data.attachment?.name ?? null,
  details: data.details.map((detail) => ({
    employeeId: detail.employeeId,
    dateHired: toDateOnly(detail.dateHired),
    regularDate: toDateOnly(detail.regularDate),
    probationStart: toDateOnly(detail.probationStart),
    probationEnd: toDateOnly(detail.probationEnd),
    designationId: detail.designationId || null,
    rank: detail.rank ?? null,
    companyId: detail.companyId || null,
    branchId: detail.branchId || null,
    departmentId: detail.departmentId || null,
    managerId: detail.managerId || null,
    resignationType: detail.resignationType ?? null,
    lastWorkingDay: toDateOnly(detail.lastWorkingDay),
    isEligibleForRehire: detail.isEligibleForRehire,
  })),
})

export const useCreateHRForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: HRFormCreateSchemaType) => {
      const payload = toPayload(data)
      return request.post(ApiRoutes.HR_FORMS.CREATE, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrForms'] })
    },
  })
}
