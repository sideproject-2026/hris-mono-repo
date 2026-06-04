import { queryOptions, useMutation } from "@tanstack/react-query"
import type { AttendancePolicyFormValue } from "../types/schema";
import { request } from "@/lib/http"
import { ApiRoutes } from "@/types/api-routes"


export const policiesQueryOptions = () => {
   return queryOptions({
      queryKey: ['attendance-policies'],
      queryFn: async () => {
         const response = await request.get<APIResponse<Array<AttendancePolicy>>>(ApiRoutes.POLICIES.LIST);
         return response;
      }
   })
}

export const useAttendancePolicyMutation = () => {
   return useMutation({
      mutationFn: async ({id, data}: {id?: string, data: AttendancePolicyFormValue}) => {
         if(id){
            const response = await request.put(ApiRoutes.POLICIES.BY_ID(id), data);
            return response;
         }
         const response = await request.post(ApiRoutes.POLICIES.LIST, data);
         return response;
      },
      onSuccess: (data,variables,onMutateResult,context) => {
         context.client.invalidateQueries({queryKey: ['attendance-policies']});
      }
   });
}
