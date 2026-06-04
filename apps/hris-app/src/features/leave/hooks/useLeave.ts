import type { LeaveBalanceType } from "@/features/form-request/types/global"
import { request } from "@/lib/http"
import { ApiRoutes } from "@/types/api-routes"
import { queryOptions, useMutation } from "@tanstack/react-query"
import type { SearchLeaveBalanceSchemaType } from "../types/search"
import type { LeaveAdjustmentSchemaType } from "../types/schema"

export const leaveBalanceQueryOptions = (params?: SearchLeaveBalanceSchemaType) => {
    return queryOptions({
        queryKey: ['leave-balance', params],
        queryFn: async () => {
            let url = ApiRoutes.LEAVE_SETUP.LIST
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

            const response = await request.get<PaginatedResponse<LeaveBalanceType>>(url)
            return response
        },
        staleTime: 5 * 60 * 1000,
    })
}

export const leaveBalanceEmployeeQueryOptions = (employeeId: number) => {
    return queryOptions({
        queryKey: ['leave-balance-employee', employeeId],
        queryFn: async () => {
            const url = ApiRoutes.LEAVE_SETUP.LEDGER(employeeId)
            const response = await request.get<{ data: LeaveTypes }>(url)
            return response.data
        },
        enabled: !!employeeId,
    })
}

export const leaveBalanceInitialsQueryOptions = () => {
    return queryOptions({
        queryKey: ['leave-balance-initials'],
        queryFn: async () => {
            const url = ApiRoutes.LEAVE_SETUP.INITIAL
            const response = await request.get<{ data: LeaveInitial }>(url)
            return response.data
        },
    })
}

export const leaveBalanceAdjustmentMutation = () => {
    return useMutation({
        mutationFn: async (data: LeaveAdjustmentSchemaType) => {
            const url = ApiRoutes.LEAVE_SETUP.ADJUSTMENT
            const response = await request.post(url, data)
            return response
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ['leave-balance'] })
        },
    })
}
