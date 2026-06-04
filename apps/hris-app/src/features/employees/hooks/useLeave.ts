import { request } from "@/lib/http"
import { ApiRoutes } from "@/types/api-routes"
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import type { AdjustmentLeaveSchemaTypes, EmployeeBatchLeaveSetupSchemaTypes, EmployeeSingleSchemaTypes } from "../types/schema"

export const employeesLeaveMutation = () => {
    return useMutation({
        mutationFn: async (data: EmployeeBatchLeaveSetupSchemaTypes) => {
            const url = ApiRoutes.EMPLOYEES.LEAVES
            const response = await request.post(url, data)
            return response
        },
        onSuccess: () => {
            toast.success("Leave setup successfully")
        },
        onError: () => {
            toast.error("Failed to setup leave")
        }
    })
}

export const employeesLeaveQueryOptions = (employeeId: string) => {
    return queryOptions({
        queryKey: ["employees-leave", employeeId],
        queryFn: async () => {
            const url = ApiRoutes.EMPLOYEES.LEAVES_BY_ID(employeeId)
            const response = await request.get<EmployeeLeaveHistoryTypes[]>(url)
            return response
        }
    })
}

export const createSingleOpeningBalanceMutation = () => {
    return useMutation({
        mutationFn: async ({ employeeId, singleLeaveBalance }: { employeeId: string, singleLeaveBalance: EmployeeSingleSchemaTypes }) => {
            const url = ApiRoutes.EMPLOYEES.LEAVES_SINGLE(employeeId);
            const response = request.post(url, singleLeaveBalance);
        }
    })
}

export const useAdjustLeaveMutation = () => {
    return useMutation({
        mutationFn: async ({ employeeId, adjustment }: { employeeId: string, adjustment: AdjustmentLeaveSchemaTypes }) => {
            const url = ApiRoutes.EMPLOYEES.LEAVES_BY_ID(employeeId);

            //convert entitlement string to number
            const entitlementNumber = parseInt(adjustment.leaveEntitlement as string, 10);
            const adjustmentWithNumberEntitlement = { ...adjustment, leaveEntitlement: entitlementNumber }
            const response = request.put(url, adjustmentWithNumberEntitlement);
        }
    })
}
