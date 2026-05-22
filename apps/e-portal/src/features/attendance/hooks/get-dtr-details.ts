import { request } from "@/lib/http";
import { queryOptions } from "@tanstack/react-query"


export const getDtrDetails = (employeeId: number,month: number, year: number) => {
    return queryOptions({
        queryKey: ['dtr-details', employeeId, month, year],
        queryFn: async () => {
            const response = await request.get<ApiResponse<AttendanceResult>>(`/portal/attendance?month=${month}&year=${year}`)
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    })
}