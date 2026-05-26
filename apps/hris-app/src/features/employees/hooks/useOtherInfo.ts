import { queryOptions, useMutation } from "@tanstack/react-query";
import type { EmployeeAddressSchemaTypes, EmployeeEducationSchemaTypes, EmployeeWorkExperienceSchemaTypes, UnifiedEmployeeInfoPayload } from "../types/schema";
import { request } from "@/lib/http";

/**
 * Address mutation for employee
 * @returns  useMutation hook for employee address
 * @remarks
 * This mutation is used to update the employee address. It takes the employee id and the address data as parameters. On success, it invalidates the employee address query to refetch the updated data.
 */

export const useUpdateEmployeeInformationMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: UnifiedEmployeeInfoPayload }) => {
			const url = `/employees/${id}/info`;
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({
				queryKey: [`{variables.data.entityType}`, variables.id]
			});
			context.client.invalidateQueries({
				queryKey: ['employee', variables.id]
			});
		},
		onError: (error) => {
			console.error("Mutation error:", error);
		}
	});
};



export const employeeAddressMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: EmployeeAddressSchemaTypes }) => {
			const url = `/employees/${id}/info`;
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-address', variables.id] });
		},
		onError: (error, variables, context) => {
			console.log(error);
		}
	})
}

export const employeeAddressDeleteMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, id }: { employeeId?: string, id: string }) => {
			const url = `/employees/${employeeId}/address/${id}`;
			const response = await request.del(url);
			return response;
		}
	});
}


export const getEmployeeAddressQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['employee-address', id],
		queryFn: async () => {
			let url = `/employees/${id}/address`;
			const response = await request.get<{ data: Array<EmployeeAddressesTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}



export const employeeEducationMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: EmployeeEducationSchemaTypes }) => {
			const url = `/employees/${id}/educations`;
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-education', variables.id] });
		}
	})
}

export const employeeEducationDeleteMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, id }: { employeeId?: string, id: string }) => {
			const url = `/employees/${employeeId}/educations/${id}`;
			const response = await request.del(url);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-education', variables.employeeId] });
		}
	})
}

export const getEmployeeEducationQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['employee-education', id],
		queryFn: async () => {
			let url = `/employees/${id}/educations`;
			const response = await request.get<{ data: Array<EmployeeEducationTypes> }>(url);
			return response;
		},
		enabled: !!id,
		staleTime: 3000,
	})
}


export const employeeWorkExperienceMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id?: string, data: EmployeeWorkExperienceSchemaTypes }) => {
			const url = `/employees/${id}/info`;
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-work-experience', variables.id] });
		}
	})
}

export const employeeWorkExperienceDeleteMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, id }: { employeeId?: string, id: string }) => {
			const url = `/employees/${employeeId}/work-experiences/${id}`;
			const response = await request.del(url);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-work-experience', variables.employeeId] });
		}
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