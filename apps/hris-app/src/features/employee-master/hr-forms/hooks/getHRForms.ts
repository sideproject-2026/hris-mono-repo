import { request } from "@/lib/http"
import { ApiRoutes } from "@/types/api-routes"
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { CONVERTED_APPOINTMENT_DATA, CONVERTED_EMPLOYEERANKS_DATA } from "../types/constant"
import type { HRFormSchemaType } from "../types/schema"

export const useGetHRForms = ({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }) => {

   const query = useQuery({
      queryKey: ['hrForms', pageNumber, pageSize],
      queryFn: async () => {
         const url = `${ApiRoutes.HR_FORMS.LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}`
         const response = await request.get<PaginatedResponse<HRFormTypes>>(url);
         return response;
      }
   })

   return query;
}

export const queryOptionInitial = () => {
   return queryOptions({
      queryKey: ['hrInitials'],
      queryFn: async () => {
         const url = ApiRoutes.HR_FORMS.INITIAL;
         const response = await request.get<{ data: HRInitialTypes }>(url);
         return response.data;
      },
      select: (data): HRInitialTypes => {
         return {
            appointments: data.appointments?.map(item => {
               const match = CONVERTED_APPOINTMENT_DATA.find(i => i.value === Number(item.value))
               return {
                  value: item.value,
                  text: match?.text ?? item.text
               }
            }) ?? [],
            employeeRanks: data.employeeRanks?.map(item => {
               const match = CONVERTED_EMPLOYEERANKS_DATA.find(i => i.value === Number(item.value))
               return {
                  value: item.value,
                  text: match?.text ?? item.text
               }
            }) ?? []
         }
      }
   })
}


export const useHRFormMutation = () => {
   return useMutation({
      mutationFn: async ({ employeeId, data }: { employeeId: string, data: HRFormSchemaType }) => {
         const url = ApiRoutes.HR_FORMS.BY_EMPLOYEE(employeeId);

         const formData = new FormData();
         formData.append('employeeId', data.employeeId ?? '');
         formData.append('type', String(data.type));
         formData.append('dateFiled', data.dateFiled instanceof Date ? data.dateFiled.toISOString() : String(data.dateFiled));
         formData.append('effectivityDate', data.effectivityDate instanceof Date ? data.effectivityDate.toISOString() : String(data.effectivityDate));
         formData.append('description', data.description);
         formData.append('rank', String(data.rank));
         if (data.designationFrom != null) formData.append('designationFrom', data.designationFrom);
         if (data.designationTo != null) formData.append('designationTo', data.designationTo);
         if (data.departmentFrom != null) formData.append('departmentFrom', data.departmentFrom);
         if (data.departmentTo != null) formData.append('departmentTo', data.departmentTo);
         if (data.companyFrom != null) formData.append('companyFrom', data.companyFrom);
         if (data.companyTo != null) formData.append('companyTo', data.companyTo);
         if (data.branchFrom != null) formData.append('branchFrom', data.branchFrom);
         if (data.branchTo != null) formData.append('branchTo', data.branchTo);
         if (data.managerFrom != null) formData.append('managerFrom', data.managerFrom);
         if (data.managerTo != null) formData.append('managerTo', data.managerTo);
         if (data.attachment instanceof File) formData.append('attachment', data.attachment);

         const response = await request.postFormData(url, formData);
         return response;
      },
      onSuccess: (data, variables, onMutateResult, context) => {
         context.client.invalidateQueries({ queryKey: ['hrForms'] });
      }
   })
}
