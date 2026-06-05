import { request } from "@/lib/http";
import { queryOptions, useMutation } from "@tanstack/react-query"
import type { EmployeeAppointmentSchemaTypes, EmployeeFilterSchemaTypes, EmployeeMovementSchemaTypes, EmployeePersonalInfoTypes } from "../types/schema";
import { formatDate } from "date-fns";
import { ApiRoutes } from "@/types/api-routes";
import type { EmployeeListModel, EmployeeModel } from "../types/model";
import type { IEmployeeModel } from "../types/employee.schema";

export const employeePersonalMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id?: string, data: IEmployeeModel }) => {
			const url = id ? ApiRoutes.EMPLOYEES.BY_ID(id) : ApiRoutes.EMPLOYEES.LIST;
			const method = id ? 'put' : 'post';

			const response = await request[method]<ApiResponse<{ data: string }>>(url, data);
			return response.data;
		}
	})

}

export const employeeInitialQueryOptions = () => {
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

export const getEmployeeProfilelQueryOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['employee-personal', id],
		queryFn: async () => {
			if (!id) return null;

			let url = ApiRoutes.EMPLOYEES.BY_ID(id);
			const response = await request.get<ApiResponse<EmployeeModel>>(url);
			return response.data;
		},
		// select: (data: EmployeeProfileInfo) => {
		// 	const { birth, spouse, governmentId, ...rest } = data;
			
		// 	const newBirth = {
		// 		...birth,
		// 		dateOfBirth: birth.dateOfBirth ? formatDate(birth.dateOfBirth, 'yyyy-MM-dd') : '-',
		// 	}
		// 	const newSpouse = {
		// 		...spouse,
		// 		dateOfBirth: spouse.dateOfBirth ? formatDate(spouse.dateOfBirth, 'yyyy-MM-dd') : '-',
		// 	}
		// 	const newGovernmentId = {
		// 		...governmentId,
		// 		issueDate: governmentId.issueDate ? formatDate(governmentId.issueDate, 'yyyy-MM-dd') : '-',
		// 		expiryDate: governmentId.expiryDate ? formatDate(governmentId.expiryDate, 'yyyy-MM-dd') : undefined,
		// 	}

		// 	return {
		// 		birth: newBirth,
		// 		spouse: newSpouse,
		// 		governmentId: newGovernmentId,
		// 		...rest,
		// 	};
		// },
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}



export const employeeEmergencyContactMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: EmployeeEmergencyContactSchemaTypes }) => {
			const url = ApiRoutes.EMPLOYEES.EMERGENCY_CONTACTS(id);
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-emergency-contact', variables.id] });
		}
	})
}

export const employeeEmergencyContactDeleteMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, id }: { employeeId?: string, id: string }) => {
			const url = ApiRoutes.EMPLOYEES.EMERGENCY_CONTACT_BY_ID(employeeId, id);
			const response = await request.del(url);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-emergency-contact', variables.employeeId] });
		}
	})
}


export const employeeAppointmentMutation = () => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string, data: EmployeeAppointmentSchemaTypes }) => {
			const url = ApiRoutes.EMPLOYEES.APPOINT(id);
			const response = await request.put(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-personal', variables.id] });
		}
	})
}


export const employeesActiveQueryOptions = ({ fullName }: { fullName: string }) => {
	return queryOptions({
		queryKey: ['employees-active', fullName],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.ACTIVE;
			if (fullName) {
				url += `?fullname=${fullName}`;
			}
			const response = await request.get<ApiResponse<Array<EmployeeActiveTypes>>>(url);
			return response
		},
		enabled: fullName.length > 0,
		select: (data) => data.data,
	})
}

export const employeesListQueryOptions = ({ params }: { params: EmployeeFilterSchemaTypes }) => {
	return queryOptions({
		queryKey: ['employees-list', JSON.stringify(params)],
		queryFn: async () => {

			let url = ApiRoutes.EMPLOYEES.LIST;
			if (params?.pageSize && params.pageNumber) {
				url += url.includes('?')
					? `&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
					: `?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
			}

			if (params?.employeeType) {
				url += url.includes('?')
					? `&employeeType=${params.employeeType}`
					: `?employeeType=${params.employeeType}`
			}
			if (params?.employeeClass) {
				url += url.includes('?')
					? `&employeeClass=${params.employeeClass}`
					: `?employeeClass=${params.employeeClass}`
			}
			if (params?.company) {
				url += url.includes('?')
					? `&company=${params.company}`
					: `?company=${params.company}`
			}
			if (params?.branch) {
				url += url.includes('?')
					? `&branch=${params.branch}`
					: `?branch=${params.branch}`
			}
			if (params?.department) {
				url += url.includes('?')
					? `&department=${params.department}`
					: `?department=${params.department}`
			}
			if (params?.fieldName && params.fieldValue) {
				url += url.includes('?')
					? `&fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
					: `?fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
			}

			const response = await request.get<PaginatedResponse<EmployeeListModel>>(url);
			return response.data
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}


export const useUploadPictureMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, base64Image }: { employeeId: string, base64Image: string }) => {
			const url = ApiRoutes.EMPLOYEES.UPLOAD_PHOTO;
			const response = await request.post(url, { employeeId, base64Image });
			return response;
		}
	});
}

export const employeeMovementMutation = () => {
	return useMutation({
		mutationFn: async ({ employeeId, data }: { employeeId: string, data: EmployeeMovementSchemaTypes }) => {
			const url = ApiRoutes.EMPLOYEES.APPOINTMENTS(employeeId);
			const response = await request.post(url, data);
			return response;
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			context.client.invalidateQueries({ queryKey: ['employee-movement-list', variables.employeeId] });
			context.client.invalidateQueries({ queryKey: ['employee-personal', variables.employeeId] })
		}
	})
}

export const employeeMovementQueryOption = (employeeId: string) => {
	return queryOptions({
		queryKey: ['employee-movement-list', employeeId],
		queryFn: async () => {
			let url = ApiRoutes.EMPLOYEES.APPOINTMENTS(employeeId)
			const response = await request.get<ApiResponse<{ appointments: Array<EmployeeMovementTypes> }>>(url)
			return response.data?.appointments
		},
		enabled: !!employeeId
	})
}
