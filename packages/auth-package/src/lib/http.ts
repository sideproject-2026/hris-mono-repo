import axios from 'axios'
import { LocalStorageAuth } from '../store/useAuthStore'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { AuthState, LoginResponse } from '../types/auth-type'

export interface HttpClientConfig {
  baseURL: string
  storageKey: string
}

export function createHttpClient({ baseURL, storageKey }: HttpClientConfig) {
  const api = axios.create({ baseURL, withCredentials: true })

  const responseBody = <T>(response: AxiosResponse<T>) => response.data

  api.interceptors.request.use(async (config) => {
    const auth = LocalStorageAuth.get(storageKey)
    if (auth && config.headers) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
      config.withCredentials = true
    }
    return config
  })

  const refreshClient = axios.create({ baseURL, withCredentials: true })
  let refreshPromise: Promise<LoginResponse | null> | null = null

  async function refreshAccessToken(): Promise<LoginResponse | null> {
    if (!refreshPromise) {
      const auth = LocalStorageAuth.get(storageKey)
      refreshPromise = refreshClient
        .post<{ data: LoginResponse }>('/auth/refresh', { refreshToken: auth?.refreshToken ?? '' })
        .then((res) => {
          const newToken = res.data.data
          if (!newToken) return null
          const state: AuthState = {
            accessToken: newToken.accessToken,
            user: auth?.user ?? null,
            refreshToken: newToken.refreshToken,
            isAuthenticated: true,
            expiresAt: null,
            expiresIn: newToken.expiresIn,
            error: null,
          }
          LocalStorageAuth.set(storageKey, { authState: state })
          return newToken
        })
        .catch(() => null)
        .finally(() => {
          refreshPromise = null
        })
    }
    return refreshPromise
  }

  function handleAuthFailure() {
    LocalStorageAuth.clear(storageKey)
  }

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined

      if (!error.response || !original || original._retry) {
        return Promise.reject(error)
      }

      if (error.response.status === 401) {
        original._retry = true
        const newToken = await refreshAccessToken()
        if (newToken) {
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${newToken.accessToken}`
          return api.request(original)
        } else {
          handleAuthFailure()
          window.location.href = '/login'
        }
      } else if (error.response.status === 403) {
        return Promise.reject('Forbidden access. You do not have permission to access this resource.')
      } else if (error.response.status === 404) {
        return Promise.reject('Resource not found. Please check the URL.')
      } else if (error.response.status === 500) {
        return Promise.reject('Internal server error. Please try again later.')
      } else if (error.response.status === 400) {
        return Promise.reject(error.response.data || 'Bad request. Please check your input.')
      } else {
        return Promise.reject(error)
      }
    },
  )

  const request = {
    get: <T>(url: string) => api.get<T>(url).then(responseBody),
    post: <T>(url: string, body?: unknown) => api.post<T>(url, body).then(responseBody),
    patch: <T>(url: string, body?: unknown) => api.patch<T>(url, body).then(responseBody),
    put: <T>(url: string, body?: unknown) => api.put<T>(url, body).then(responseBody),
    del: (url: string) => api.delete(url).then(responseBody),
    fullDelete: (url: string, body: unknown) =>
      api
        .delete(url, { data: body, headers: { 'Content-Type': 'application/json' } })
        .then(responseBody),
    postFormData: <T>(url: string, body: FormData, config?: AxiosRequestConfig) => {
      const formDataConfig: AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data', ...config?.headers },
        ...config,
      }
      return api.post<T>(url, body, formDataConfig).then(responseBody)
    },
    exportExcel: (url: string, filename = 'download.xlsx') => {
      api
        .get(url, { responseType: 'blob' })
        .then((response) => {
          const objectUrl = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = objectUrl
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          link.remove()
          window.URL.revokeObjectURL(objectUrl)
        })
        .catch((error) => {
          console.error('Error downloading Excel file:', error)
          throw error
        })
    },
  }

  return { request }
}
