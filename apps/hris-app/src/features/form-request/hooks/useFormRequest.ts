import { queryOptions, useMutation } from '@tanstack/react-query'
import type { RequestFilterSchemaType } from '../types/search'
import { request } from '@/lib/http'
import type { FormRequestTypes, LeaveBalanceType, RequestFormInitial } from '../types/global'
import type { SyncRequestFormSchemaType } from '../types/schema'

export const requestFormsQueryOptions = ({params,submitted = false} : {params?: RequestFilterSchemaType,submitted?: boolean}) => {

  return queryOptions({
    queryKey: ['request-forms', params],
    
    queryFn: async () => {
      let url = '/form-request'

      if (params?.pageSize && params.pageNumber) {
        url += url.includes('?')
          ? `&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
          : `?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
      }
      if (params?.fieldName && params.fieldValue) {
        url += url.includes('?')
          ? `&fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
          : `?fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
      }
      if (params?.requestFor) {
        url += url.includes('?')
          ? `&requestFor=${params.requestFor}`
          : `?requestFor=${params.requestFor}`
      }
      
      
      const response =
        await request.get<PaginatedResponse<FormRequestTypes>>(url)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: submitted !== undefined ? submitted : false,
  })
}

export const requestFormInitialsQueryOptions = () => {
  return queryOptions({
    queryKey: ['request-form-initials'],
    queryFn: async () => {
      const url = '/form-request/initial'
      const response = await request.get<{ data: RequestFormInitial }>(url)
      return response
    },
  })
}

export const useSyncLegacyMutation = () => {
  return useMutation({
    mutationFn: async ({month,year} : SyncRequestFormSchemaType) => {
      const url = '/form-request/sync-legacy'
      const response = await request.post(url, {month,year})
      return response
    },
  })
}

export const useRequestFormMutation = <T>() => {
  return useMutation({
    mutationFn: async (data: T) => {
      const response = await request.post('/form-request', {
        ...data,
        isAutoApproved: true,
      })
      return response
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ['request-forms'] })
    },
  })
}

export const useLeaveBalanceQueryOptions = ({ employeeId }: { employeeId: number }) => {
  return queryOptions({
    queryKey: ['leave-balance', employeeId],
    queryFn: async () => {
      const url = `/employees/leave/${employeeId}/balance`
      const response = await request.get<{ data: LeaveBalanceType[] }>(url)
      return response
    },
    enabled: !!employeeId,
  })
}

export const useRequestFormCancelMutation = () => {
  return useMutation({
    mutationFn: async ({ formId, cancelReason }: { formId: string, cancelReason: string }) => {
      const response = await request.put(`/form-request/cancel`, { formId, cancelReason })
      return response
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ['request-forms'] })
    },
  })
}
