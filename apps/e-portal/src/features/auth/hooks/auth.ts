import { useMutation } from "@tanstack/react-query";
import { request } from "../../../lib/http";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../../lib/utils";

import { useAuthStore, authSchema, type AuthSchemaType, type LoginResponse } from "@cwmsi/auth-package"
import { resetPasswordSchema, type ForgotPasswordSchemaType, type ResetPasswordSchemaType } from "../types/schema";


const useLoginMutate = () => {
    return useMutation({
        mutationFn: async (data: AuthSchemaType) => {
            const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', data);
            return response.data;
        },

    });
}


// export const useLogin = () => {

//     const { setAuth, getAuth, clearAuth } = useAuthStore();
//     const [error, setError] = useState<string | null>(null);
//     const { mutateAsync, isPending } = useLoginMutate();
//     const navigate = useNavigate();
//     const auth = getAuth();

//     const loginForm = useForm<AuthSchemaType>({
//         resolver: zodResolver(authSchema),
//         defaultValues: {
//             userName: "",
//             password: "",
//             application: "app_portal"
//         },
//     });

//     const login = async (data: AuthSchemaType) => {
//         try {
//             setError(null);
//             clearAuth();
//             const response = await mutateAsync(data);

//             setAuth({
//                 user: data.userName,
//                 token: response.accessToken,
//                 refreshToken: response.refreshToken,
//                 isSuccess: true,
//                 error: null,
//                 // isTwoFactorAuth: false
//             });


//             showToast("Login Successful", "success");
//             navigate({ to: "/" });
//         }
//         catch (error) {
//             console.log(error);
//             setError("Login failed. Please check your credentials.");
//             showToast("Login Failed", "error");
//         }
//     }

//     return { loginForm, login, isPending, error, setError, auth };
// };

export const useLogout = () => {

    const navigate = useNavigate();
    const { clearAuth } = useAuthStore();


    const logout = () => {
        clearAuth();
        navigate({ to: "/login" });
    }

    return { logout };
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (data: ForgotPasswordSchemaType) => {
            const response = await request.post(`/users/forgot-password`, data);
            return response;
        },
        onError: (error: any) => {
            console.log(error);
            throw error;
        }
    });
}

const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: async (data: ResetPasswordSchemaType) => {
            const response = await request.post(`/users/reset-password`, data);
            return response;
        },
    });
}

export const useResetPassword = (onSuccess?: () => void) => {
    const [error, setError] = useState<string | null>(null);
    const { mutateAsync, isPending, isSuccess } = useResetPasswordMutation();

    const resetForm = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            code: "",
            userName: "",
            newPassword: "",
            newPasswordConfirmation: "",
        },
    });

    const resetPassword = async (data: ResetPasswordSchemaType) => {
        try {
            setError(null);
            await mutateAsync(data);
            showToast("Password reset successful", "success");
            onSuccess?.();
        } catch (error: any) {
            showToast(error.message, "error");
            setError(error.message);
            throw error;
        }
    }
    return { resetPassword, isPending, isSuccess, resetForm, error, setError };
}




export const getRefreshToken = async (refreshToken?: string) => {
    return await request.post<LoginResponse>(`/auth/refresh`, { refreshToken: refreshToken });
}