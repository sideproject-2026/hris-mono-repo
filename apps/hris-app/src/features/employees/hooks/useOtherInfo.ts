import { queryOptions, useMutation } from "@tanstack/react-query";
import type { UnifiedEmployeeInfoPayload } from "../types/schema";
import { request } from "@/lib/http";


export const useUpdateEmployeeInformationMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: UnifiedEmployeeInfoPayload }) => {
			const url = `/employees/${id}/info`;
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['get-employee-information', variables.id] });
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
			let url = `/employees/${employeeId}/info/?entityObjectType=${entityObjectType}`;
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
			const url = `/employees/${id}/info/${infoid}/${entityType}`;
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
			let url = `/employees/${id}/address`;
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
			let url = `/employees/${id}/educations`;
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
			let url = `/employees/${id}/emergency-contacts`;
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
			let url = `/employees/${id}/work-experiences`;
			const response = await request.get<{ data: Array<EmployeeWorkExperienceTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}