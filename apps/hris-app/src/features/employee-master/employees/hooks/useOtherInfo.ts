import { queryOptions, useMutation } from "@tanstack/react-query";
import type { UnifiedEmployeeInfoPayload } from "../types/schema";
import { request } from "@/lib/http";
import { ApiRoutes } from "@/types/api-routes";


export const useUpdateEmployeeInformationMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: UnifiedEmployeeInfoPayload }) => {
			const url = ApiRoutes.EMPLOYEES.INFO(id);
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['get-employee-information', variables.id] });
			context.client.invalidateQueries({ queryKey: ['employee-personal', variables.id] });
		},
		onError: (error) => {
			console.error("Mutation error:", error);
		}
	});
};

export const useGetEmployeeOtherInformationQueryOptons = ({ employeeId, entityObjectType }: { employeeId: string, entityObjectType: string }) => {
	return queryOptions({
		queryKey: ['get-employee-information', employeeId, entityObjectType],
		queryFn: async () => {
			let url = `${ApiRoutes.EMPLOYEES.INFO(employeeId,entityObjectType)}`;
			
			const response = await request.get<ApiResponse<EmployeeOtherInformationTypes>>(url);
			return response.data;
		},
		enabled: !!employeeId && !!entityObjectType,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}

export const useDeleteEmployeeInformationMutation = () => {
	return useMutation({
		mutationFn: async ({ id, infoid, entityType }: { id: string, infoid: string, entityType: string }) => {
			const url = ApiRoutes.EMPLOYEES.INFO_BY_ID(id, infoid, entityType);
			const response = await request.del(url);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['get-employee-information', variables.id] });
		},
		onError: (error) => {
			console.error("Mutation error:", error);
		}
	});
}



export const getEmployeeAddressQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['Address', id],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.ADDRESS(id);
			const response = await request.get<{ data: Array<EmployeeAddressesTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}




export const getEmployeeEducationQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['Education', id],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.EDUCATIONS(id);
			const response = await request.get<{ data: Array<EmployeeEducationTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 3000,
	})
}




export const getEmployeeEmergencyContactQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['EmergencyContact', id],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.EMERGENCY_CONTACTS(id);
			const response = await request.get<{ data: Array<EmployeeEmergencyContactTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}

export const getEmployeeWorkExperienceQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['WorkExperience', id],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.WORK_EXPERIENCES(id);
			const response = await request.get<{ data: Array<EmployeeWorkExperienceTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}
