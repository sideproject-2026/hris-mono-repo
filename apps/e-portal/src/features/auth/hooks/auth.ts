import { useMutation } from "@tanstack/react-query";
import { request } from "../../../lib/http";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../../lib/utils";

import {useAuthStore, authSchema,type AuthSchemaType,type LoginResponse, useAuthContext} from "@cwmsi/auth-package"




export const useLogin = () => {

    const { setAuth, getAuth, clearAuth } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: AuthSchemaType) => {
            const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', data);
            return response.data;
        },
        
    });
    
    const navigate = useNavigate();
    const auth = getAuth();

    const loginForm = useForm<AuthSchemaType>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            company: "",
            userName: "",
            password: "",
        },
    });

    const login = async (data: AuthSchemaType) => {
        try {
            setError(null);
            clearAuth();
            const response = await mutateAsync(data);
            setAuth({
                user: null,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresIn: response.expiresIn,
                expiresAt: null,
                isAuthenticated: true,
                error: null,
            });
            showToast("Login Successful","success");
            navigate({ to: "/" });
        }
        catch (error) {
            console.log(error);
            setError("Login failed. Please check your credentials.");
            showToast("Login Failed","error");
        }
    }

    return { loginForm, login, isPending, error, setError, auth };
};

export const useLogout = () => {
    const { clearAuth } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        clearAuth?.();
        navigate({ to: "/login" });
    }

    return { logout };
}


export const getRefreshToken = async (refreshToken?: string) => {
    return await request.post<LoginResponse>(`/auth/refresh`, { refreshToken: refreshToken });
}