import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { AuthFormValues, RegisterFormValues } from "../schema/auth-schema"
import { request } from "@/lib/http"
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { toast } from "sonner";
import { useTransition } from "react";

import { ROUTE } from "@/types/router";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";

export const useLogin = () => {

   const { setAuth, getAuth, clearAuth } = useAuthStore();
   const [isPending, startTransition] = useTransition();
   const routes = useRouter();
   const refreshToken = getAuth().refreshToken || '';

   const handleLogin = async (data: AuthFormValues) => {
      clearAuth();
      startTransition(async () => {
         try {
            const response = await request.post<APIResponse<AuthState>>('/auth/login', data);
            const { accessToken, expiresAt, expiresIn, refreshToken } = response.data;
            setAuth({
               accessToken: accessToken,
               expiresAt: expiresAt,
               expiresIn: expiresIn,
               refreshToken: refreshToken,
               isAuthenticated: true,
               error: null,
            });
            toast.success("Login successful");
            routes.navigate({ to: ROUTE.DASHBOARD_ROUTE })
         }
         catch (error) {
            console.error("Login failed", error);
            var errorMessage = getErrorMessage(error);
            toast.error(`Login failed: ${errorMessage}`);
         }
      });
   }

   const handleLogout = async () => {
      startTransition(async () => {
         try {
            const response = await request.post('/auth/logout', { refreshToken });
            clearAuth();
            routes.navigate({ to: '/login' })
            toast.success('Logged out successfully')
         }
         catch (error) {
            console.log('Logout error:', error);
            toast.error(`Error logging out: ${getErrorMessage(error)}`);
         }
      });
   }

   return { handleLogin, handleLogout, isPending };
}

export const useProfileQuery = ({ accessToken }: { accessToken: string }) => {
   return useSuspenseQuery({
      queryKey: ['profile', accessToken],
      queryFn: async () => {
         const url = `/users`;
         const response = await request.get<APIResponse<UserType>>(url);
         return response.data;
      },
      staleTime: Infinity,

   },
   )
}


export const useSelfRegisterMutation = () => {

   return useMutation({
      mutationFn: async (data: RegisterFormValues) => {
         const response = await request.post<APIResponse<AuthState>>('/users/self-register', data);
         return response.data;
      },
   })
}