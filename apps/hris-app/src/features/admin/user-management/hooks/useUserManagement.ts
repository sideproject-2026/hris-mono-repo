import { request } from "@/lib/http";
import { queryOptions, useMutation } from "@tanstack/react-query";
import type {
    UserManagementAccessSchema,
    UserManagementResetPasswordSchema,
    UserManagementSchema,
} from '../types/schema'

export const getSearchUserManagementOptions = ({ name }: { name: string }) => {
    return queryOptions({
        queryKey: ['employees', name],
        queryFn: async () => {
            const url = `/attendances/employee-setup?fieldName=fullname&fieldValue=${name}&pageSize=1000&pageNumber=1`;
            const response = await request.get<PaginatedResponse<SearchUserManagementTypes>>(url);
            return response;
        },
        enabled: name.length > 0,
        select: (data) => data.data,
    });
}


export const getUserManagementInitialOptions = () => {
    return queryOptions({
        queryKey: ['user-management-initial'],
        queryFn: async () => {
            const url = `/identity/initials`;
            const response = await request.get<ApiResponse<UserManagementSelection>>(url);
            return response.data;
        },
    });
}

export const getUserManagementInfoOptions = ({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }) => {
    return queryOptions({
        queryKey: ['user-management-info', pageNumber, pageSize],
        queryFn: async () => {

            const params = new URLSearchParams();
            if (pageNumber > 0) params.append('pageNumber', pageNumber.toString());
            if (pageSize > 0) params.append('pageSize', pageSize.toString());

            const url = `/identity?${params.toString()}`;

            const response = await request.get<PaginatedResponse<UserManagement>>(url);
            return response;
        },
    });
}

export const userManagementMutation = () => {
    return useMutation({
        mutationFn: async (data: UserManagementSchema) => {
            const url = `/identity/register`;
            const response = await request.post<ApiResponse<UserManagementSchema>>(url, data);
            return response.data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ['user-management-info'] });
        }
    });
}

export const userManagementRolesAccessMutation = () => {
    return useMutation({
        mutationFn: async ({ data, userName }: { data: UserManagementAccessSchema, userName: string }) => {
            const url = `/identity/${userName}/roles-and-access`;
            const response = await request.post<ApiResponse<UserManagementAccessSchema>>(url, data);
            return response;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ['user-management-info'] });
        }
    });
}

export const userManagementUpdateMutation = () => {
    return useMutation({
        mutationFn: async ({ data }: { data: UserManagementSchema }) => {
            const url = `/identity/update`;
            const response = await request.put<ApiResponse<UserManagementSchema>>(url, data);
            return response.data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ['user-management-info'] });
        }
    });
}

export const userManagementResetPasswordMutation = () => {
    return useMutation({
        mutationFn: async (data: UserManagementResetPasswordSchema) => {
            const url = `/identity/reset-password`;
            const response = await request.post<ApiResponse<UserManagementResetPasswordSchema>>(url, data);
            return response.data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ['user-management-info'] });
        }
    });
}
