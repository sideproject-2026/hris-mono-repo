import { request } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";



export const getDtrSummary =  (employeeId: number,) => {
    return useQuery({
        queryKey: ['dtr-summary', employeeId],
        queryFn: async () => {
            const response = await request.get<{data: DtrSummaryType}>(`/dtr/summary/${employeeId}`);
            return response.data;
        },
        enabled: !!employeeId,
        staleTime: 1000 * 60 * 5,
    })
}

export const getLeaveSummary = (employeeId: number) => {
    return useQuery({
        queryKey: ['leave-summary', employeeId],
        queryFn: async () => {
            const response = await request.get<ApiResponse<LeaveSummaryType[]>>(`leave/${employeeId}/summary`);
            return response.data;
        },
        enabled: !!employeeId,
        staleTime: 1000 * 60 * 5,
    })
}

export const getPendingRequest = (emmployeeId: number, dateFrom: string, dateTo: string) => {
    return useQuery({
        queryKey: ['pending-request', emmployeeId],
        queryFn: async () => {
            const data = await request.get<ApiResponse<RequestStatusType[]>>(`/request/${emmployeeId}/?dateFrom=${dateFrom}&dateTo=${dateTo}&pageSize=100&pageNumber=1`)
            return data
        },
        enabled: !!emmployeeId && !!dateFrom && !!dateTo,
        staleTime: 1000 * 60 * 5,
    })
}

export const getTardiness = (employeeId: number) => {
    return useQuery({
        queryKey: ['tardiness', employeeId],
        queryFn: async () => {
            const response = await request.get<{data: {tardinessRecords: UndertimeType[]}}>(`/dtr/tardiness/${employeeId}`)
            return response.data.tardinessRecords;
        },
        enabled: !!employeeId,
        staleTime: 1000 * 60 * 5,
    })
}

export const getOvertime = (employeeId: number) => {
    return useQuery({
        queryKey: ['overtime', employeeId],
        queryFn: async () => {
            const response = await request.get<{data: {overtimeRecords: OvertimeType[]}}>(`/dtr/overtime/${employeeId}`)
            return response.data.overtimeRecords;
        },
        enabled: !!employeeId,
        staleTime: 1000 * 60 * 5,
    })
}