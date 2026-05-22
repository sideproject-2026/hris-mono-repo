import { useQuery } from "@tanstack/react-query"
import { request } from "../http"


export const getUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const response = await request.get<ApiResponse<UserProfileType>>('/employee/profile')
            const data = response.data
            return data
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}