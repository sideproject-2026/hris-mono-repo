import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { AuthFormValues, RegisterFormValues } from "../schema/auth-schema"
import { request } from "@/lib/http"
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { toast } from "sonner";
import { useTransition } from "react";

import { ROUTE } from "@/types/router";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { ApiRoutes } from "@/types/api-routes";

export const useLogin = () => {

   const { setAuth, getAuth, clearAuth } = useAuthStore();
   const [isPending, startTransition] = useTransition();
   const routes = useRouter();
   const refreshToken = getAuth().refreshToken || '';

   const handleLogin = async (data: AuthFormValues) => {
      clearAuth();
      startTransition(async () => {
         try {
            const response = await request.post<APIResponse<AuthState>>(ApiRoutes.AUTH.LOGIN, { ...data, application: 'app_portal' });
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
            const response = await request.post(ApiRoutes.AUTH.LOGOUT, { refreshToken });
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
         const url = ApiRoutes.USERS.PROFILE;
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
         const response = await request.post<APIResponse<AuthState>>(ApiRoutes.USERS.SELF_REGISTER, data);
         return response.data;
      },
   })
}
