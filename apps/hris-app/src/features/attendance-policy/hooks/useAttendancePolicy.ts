import { queryOptions, useMutation } from "@tanstack/react-query"
import type { AttendancePolicyFormValue } from "../types/schema";
import { request } from "@/lib/http"


export const policiesQueryOptions = () => {
   return queryOptions({
      queryKey: ['attendance-policies'],
      queryFn: async () => {
         const response = await request.get<APIResponse<Array<AttendancePolicy>>>('/policies');
         return response;
      }
   })
}

export const useAttendancePolicyMutation = () => {
   return useMutation({
      mutationFn: async ({id, data}: {id?: string, data: AttendancePolicyFormValue}) => {
         if(id){
            const response = await request.put(`/policies/${id}`, data);
            return response;
         }
         const response = await request.post('/policies', data);
         return response;
      },
      onSuccess: (data,variables,onMutateResult,context) => {
         context.client.invalidateQueries({queryKey: ['attendance-policies']});
      }
   });
}