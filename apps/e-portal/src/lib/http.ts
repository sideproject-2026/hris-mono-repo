import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse, } from 'axios';
import { LocalStorageAuth,type AuthState,type LoginResponse } from "@cwmsi/auth-package";

const AUTH_STORAGE_KEY="auth-storage-key";

//axios.defaults.baseURL = import.meta.env.VITE_API_URL;
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const responseBody = <T>(response: AxiosResponse<T>) =>  response.data;

api.interceptors.request.use(async (config) => {
    const auth = LocalStorageAuth.get(AUTH_STORAGE_KEY);
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

let refreshPromise: Promise<LoginResponse | null> | null = null;

async function refreshAccessToken(): Promise<LoginResponse | null> {
    if(!refreshPromise) {
        const auth = LocalStorageAuth.get(AUTH_STORAGE_KEY);
        refreshPromise = refreshClient.post('/auth/refresh', {refreshToken: auth?.refreshToken ?? ""}) // server reads refresh token from HttpOnly cookie
            .then((res) => {
                const newToken = res.data as LoginResponse || null;
                if (!newToken) return null;
                //update the token in local storage
                const state : AuthState = {
                    accessToken: newToken.accessToken ,
                    user: auth?.user || null,
                    refreshToken: newToken.refreshToken,
                    isAuthenticated: true,
                    expiresAt:null,
                    expiresIn: newToken.expiresIn,
                    error: null,
                }
                LocalStorageAuth.set(AUTH_STORAGE_KEY, {authState: state});

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
    LocalStorageAuth.clear(AUTH_STORAGE_KEY);
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
                //Update header and retry original request
                original.headers = original.headers ?? {};
                original.headers.Authorization = `Bearer ${newToken.accessToken}`;
                return api.request(original);
            }
            else {
               handleAuthFailure();
               window.location.href = '/login';
            }
        }
        else if (error.response?.status === 403) {
            return Promise.reject("Forbidden access. You do not have permission to access this resource.");
        }
        else if (error.response?.status === 404) {
            return Promise.reject("Resource not found. Please check the URL.");
        }
        else if(error.response?.status === 500) {
            return Promise.reject("Internal server error. Please try again later.");
        }
        else if(error.response?.status === 400) { 
            return Promise.reject(error.response?.data || "Bad request. Please check your input.");
        }
        else {
            //clear auth on other errors
            //handleAuthFailure();
            return Promise.reject(error);
        }
    }
);


export const request = {
    get: <T>(url: string) => api.get<T>(url).then(responseBody),
    post: <T>(url: string, body?: any) => api.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body?: any) => api.put<T>(url, body).then(responseBody),
    del: (url: string) => api.delete(url).then(responseBody),
    postFormData: <T>(url: string, body: FormData,config?: AxiosRequestConfig) => {
        const formDataConfig: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers
            },
            ...config
        }

        return api.post<T>(url, body, formDataConfig).then(responseBody)
    },
};
