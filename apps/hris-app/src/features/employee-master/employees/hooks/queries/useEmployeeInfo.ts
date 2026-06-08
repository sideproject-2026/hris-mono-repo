import { request } from "@/lib/http";
import { ApiRoutes } from "@/types/api-routes"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { EmergencyContactResponse, EmployeeAddressesResponse, EmployeeEducationResponse, WorkExperienceResponse } from "../../types/model";




// Single source of truth: entity type -> response shape
type EntityResponseMap = {
  address: EmployeeAddressesResponse;
  contact: EmergencyContactResponse;
  education: EmployeeEducationResponse;
  workExperience: WorkExperienceResponse;
  // add more entity types here
};


type EntityObjectType = keyof EntityResponseMap;


export const queryOptionsInfo = <T extends EntityObjectType>({
  employeeId,
  entityObjectType,
}: {
  employeeId?: string;
  entityObjectType: T;
}) => {
  return queryOptions({
    queryKey: ['get-employee-information', employeeId, entityObjectType] as const,
    queryFn: async () => {
      const url = ApiRoutes.EMPLOYEES.INFO(employeeId ?? "", entityObjectType);
      const response = await request.get<ApiResponse<EntityResponseMap[T]>>(url);
      return response.data; // typed as EntityResponseMap[T]
    },
    enabled: !!employeeId && !!entityObjectType,
    staleTime: 1000 * 60 * 5,
  });
};


export const useGetInfo = <T extends EntityObjectType>(
   {employeeId, entityObjectType} : 
   {employeeId: string,
   entityObjectType: T}) => {

   return useQuery(queryOptionsInfo({employeeId,entityObjectType}));
}