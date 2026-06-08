import { request } from "@/lib/http";
import { ApiRoutes } from "@/types/api-routes";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmployeeModel } from "../../types/model";
import { useCallback } from "react";



export const useEmployeeProfile = ({id}: {id?: string}) => {

   const query = useQuery(getEmployeeProfilelQueryOptions(id));
   const queryClient = useQueryClient();
   const onRefresh = () => {
       queryClient.invalidateQueries({
         queryKey: ['employee-personal', id],
       })
     }

   return {query,onRefresh};
}


export const getEmployeeProfilelQueryOptions = (id?: string) => {
   return queryOptions({
      queryKey: ['employee-personal', id],
      queryFn: async () => {
         if (!id) return null;

         let url = ApiRoutes.EMPLOYEES.BY_ID(id);
         const response = await request.get<ApiResponse<EmployeeModel>>(url);
         return response.data;
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
   })
}





export const queryOptionsInitial = () => {
   return queryOptions({
      queryKey: ['employees-initial'],
      queryFn: async () => {
         let url = ApiRoutes.EMPLOYEES.INITIAL;
         const response = await request.get<APIResponse<EmployeeInitials>>(url);
         return response.data;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
   })
}

