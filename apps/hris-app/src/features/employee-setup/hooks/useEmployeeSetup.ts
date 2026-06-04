import { queryOptions, useMutation } from "@tanstack/react-query"
import type { QueryOptions } from "@tanstack/react-query"
import type { EmployeeSetupValues } from "../types/schema";
import { request } from "@/lib/http";
import type { FilterSearchEmployeeType } from "../types/search";


interface EmployeeQueryOptionsParams {
   params?: FilterSearchEmployeeType;
   submitted?: boolean;
   options?: Partial<Omit<QueryOptions<PaginatedResponse<EmployeeSetupTypes>>, 'queryKey' | 'queryFn'>>;
}

export const employeeQueryOptions = ({ params, options, submitted = false }: EmployeeQueryOptionsParams) => {
   return queryOptions({
      queryKey: ['setup', params],
      queryFn: async () => {
         let url = `/attendances/employee-setup`;
         if (params) {
            const queryString = new URLSearchParams(
               Object.entries(params)
                  .filter(([_, value]) => value !== undefined && value !== null)
                  .map(([key, value]) => [key, String(value)])
            ).toString();

            if (queryString) {
               url += `?${queryString}`;
            }
         }
         const response = await request.get<PaginatedResponse<EmployeeSetupTypes>>(url);
         return response.data;
      },
      staleTime: 5 * 60 * 1000,
      enabled: !!submitted !== undefined ? submitted : false,
     
   })
}

export const initialQueryOptions = (options?: Partial<Omit<QueryOptions<APIResponse<EmployeSetupInitial>>, 'queryKey' | 'queryFn'>>) => {

   return queryOptions({
      queryKey: ['setup-initial'],
      queryFn: async () => {
         const response = await request.get<APIResponse<EmployeSetupInitial>>('/attendances/employee-setup/initial');
         return response.data;
      },
   });
}

export const syncLegacyEmployeesMutation = () => {
   return useMutation({
      mutationFn: async () => {
         const url = `/attendances/employee-setup/sync`;
         const response = await request.post(url, { syncType: 3, employeeIds: [] });
         return response;
      }
   })
}

export const useCreateUpdateMutationAsync = () => {
   return useMutation({
      mutationFn: async ({ id, data }: { id: string, data: EmployeeSetupValues }) => {
         if (id) {
            // Update existing employee
            const response = await request.put(`/attendances/employee-setup/${id}`, data);
            return response;
         }
      },
      onSuccess: (data, variables, onMutateResult, context) => {
         context.client.invalidateQueries({ queryKey: ['setup'] });
      }
   })
}

export const useToggleEmployeeStatusMutation = () => {
   return useMutation({
      mutationFn: async ({ id  }: { id: string }) => {
         const response = await request.put(`/attendances/employee-setup/${id}/toggle`);
         return response;
      },
      onSuccess: (data, variables, onMutateResult, context) => {
         context.client.invalidateQueries({ queryKey: ['setup'] });
      }
   });
}