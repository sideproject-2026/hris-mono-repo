import { request } from "@/lib/http";
import { ApiRoutes } from "@/types/api-routes";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmployeeModel } from "../../types/model";
import type { IEmployeeModel } from "../../types/employee.schema";
import { employeeDefaultValues } from "../../types/employee.schema";

export const mapEmployeeToFormValues = (model: EmployeeModel): IEmployeeModel => ({
  type: model.type.code,
  prefix: model.prefix ?? '',
  firstName: model.firstName,
  middleName: model.middleName,
  lastName: model.lastName,
  suffix: model.suffix ?? '',
  gender: model.gender.code,
  maritalStatus: model.maritalStatus.code,
  birthday: model.birthday,
  religion: model.religion ?? '',
  birthPlace: model.birthPlace ?? '',
  emailAddress: model.personalEmailAddress ?? '',
  phoneNumber: model.phoneNumber ?? '',
  mobileNumber: model.mobileNumber ?? '',
  nationality: model.nationality ?? '',
  region: model.region ?? '',
  bloodType: model.bloodType ?? '',
  country: model.country ?? '',
  spouseName: model.spouseFullName ?? '',
  spouseJobTitle: model.spouseJobTitle ?? '',
  spouseCompany: model.spouseCompany ?? '',
  spouseBirthday: model.spouseBirthday ?? '',
  sssNo: model.sssNo ?? '',
  philHealthNo: model.philhealthNo ?? '',
  tinNo: model.tinNo ?? '',
  pagIbigNo: model.pagIbiNo ?? '',
  bankAccountNo: model.bankAccountNo ?? '',
  passportNo: model.passportNo ?? '',
  passportExpiry: model.passportExpiry ?? '',
})

export const useEmployeeProfile = ({id}: {id?: string}) => {
   const query = useQuery(getEmployeeProfilelQueryOptions(id));
   const queryClient = useQueryClient();
   const onRefresh = () => {
       queryClient.invalidateQueries({
         queryKey: ['employee-personal', id],
       })
     }

   

   return {query, onRefresh};
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





export const getEmployeePhotoQueryOptions = (id?: string, enabled = true) => {
   return queryOptions({
      queryKey: ['employee-photo', id],
      queryFn: async () => {
         if (!id) return null;

         const url = ApiRoutes.EMPLOYEES.VIEW_PHOTO(id);
         return await request.getBlob(url);
      },
      enabled: !!id && enabled,
      staleTime: 1000 * 60 * 5, // 5 minutes,
      refetchOnWindowFocus: false,
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

