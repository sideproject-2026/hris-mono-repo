import axios from 'axios';
import { LocalStorageAuth } from './stores/useAuthStore';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRoutes } from '@/types/api-routes';


// axios.defaults.baseURL = import.meta.env.VITE_API_URL;
export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true
});
export const responseBody = <T>(response: AxiosResponse<T>) => response.data;

api.interceptors.request.use(async (config) => {
   const auth = LocalStorageAuth.get();
   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
   if (auth && config.headers) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
      config.withCredentials = true;
   }
   return config;
});

const refreshClient = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true
});

let refreshPromise: Promise<AuthState | null> | null = null;

async function refreshAccessToken(): Promise<AuthState | null> {
   if (!refreshPromise) {
      const auth = LocalStorageAuth.get();
      refreshPromise = refreshClient.post<{ data: AuthState, time: Date }>(ApiRoutes.AUTH.REFRESH, { refreshToken: auth?.refreshToken ?? "" }) // server reads refresh token from HttpOnly cookie
         .then((res) => {
            const newToken = res.data.data
            // update the token in local storage
            const state = {
               auth: {
                  accessToken: newToken.accessToken,
                  refreshToken: newToken.refreshToken,
                  expiresIn: newToken.expiresIn,
                  expiresAt: newToken.expiresAt,
                  isAuthenticated: true,
                  error: null,
               },
               version: 0
            }

            LocalStorageAuth.set({ state: state });

            return newToken;
         })
         .catch(() => null)
         .finally(() => {
            refreshPromise = null;
         });
   }

   return refreshPromise;
}

function handleAuthFailure() {
   LocalStorageAuth.clear();
}



api.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

      // If no response or already retried, just reject
      if (!error.response || !original || original._retry) {
         return Promise.reject(error);
      }

      // Only attempt on 401 Unauthorized
      if (error.response.status === 401) {
         original._retry = true;
         const newToken = await refreshAccessToken();
         console.log("New token after refresh attempt:", newToken);
         if (newToken) {
            // Update header and retry original request
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${newToken.accessToken}`;
            return api.request(original);
         }
         else {
            handleAuthFailure();
            window.location.href = '/login';
         }
      }
      else if (error.response.status === 403) {
         return Promise.reject("Forbidden access. You do not have permission to access this resource.");
      }
      else if (error.response.status === 404) {
         return Promise.reject("Resource not found. Please check the URL.");
      }
      else if (error.response.status === 500) {
         return Promise.reject("Internal server error. Please try again later.");
      }
      else if (error.response.status === 400) {
         return Promise.reject(error.response.data || "Bad request. Please check your input.");
      }
      else {
         // clear auth on other errors
         // handleAuthFailure();
         return Promise.reject(error);
      }
   }

);


export const request = {
   get: <T>(url: string) => api.get<T>(url).then(responseBody),
   post: <T>(url: string, body?: any) => api.post<T>(url, body).then(responseBody),
   patch: <T>(url: string, body?: any) => api.patch<T>(url, body).then(responseBody),
   put: <T>(url: string, body?: any) => api.put<T>(url, body).then(responseBody),
   del: (url: string) => api.delete(url).then(responseBody),
   fullDelete: (url: string, body:unknown) => api.delete(url,{ data: body, headers: { "Content-Type": "application/json" } }).then(responseBody),
   postFormData: <T>(url: string, body: FormData, config?: AxiosRequestConfig) => {
      const formDataConfig: AxiosRequestConfig = {
         headers: {
            "Content-Type": "multipart/form-data",
            ...config?.headers
         },
         ...config
      }
      return api.post<T>(url, body, formDataConfig).then(responseBody)
   },
   exportExcel: (url: string, filename: string = "download.xlsx") => {
      api.get(url, { responseType: 'blob' }).then(response => {
            const objectUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = objectUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(objectUrl); // Clean up the URL
      }).catch(error => {
          console.error("Error downloading Excel file:", error);
         throw error; // Re-throw the error for further handling
      })
   }
};
