import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../store/useAuthStore'
import { authSchema, type AuthSchemaType } from '../types/schema'
import { createHttpClient } from '../lib/http'
import type { APIResponse, AuthState } from '../types/auth-type'

export const useLogin = ({ baseUrl, storageKey = 'auth-storage-key' }: { baseUrl: string; storageKey?: string }) => {
  const { request } = createHttpClient({ baseURL: baseUrl, storageKey })

  const { setAuth, getAuth, clearAuth } = useAuthStore()
  const [isPending, startTransition] = useTransition()

  const formAuth = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      userName: '',
      password: '',
      company: '',
      application: '',
    },
  })

  const refreshToken = getAuth().refreshToken || ''

  const handleLogin = async (
    data: AuthSchemaType, 
    options: {
       onSuccessCallback?: () => void,
       onErrorCallback?: (error: unknown) => void,
    }) => {
    clearAuth()
    startTransition(async () => {
      try {
        const response = await request.post<APIResponse<AuthState>>('/auth/login', data)
        const { accessToken, expiresAt, expiresIn, refreshToken } = response.data
        setAuth({
          accessToken,
          expiresAt,
          expiresIn,
          refreshToken,
          isAuthenticated: true,
          error: null,
        })
        options.onSuccessCallback?.()
      } catch (error) {
        console.error('Login failed', error)
        options.onErrorCallback?.(error)
      }
    })
  }

  const handleLogout = async ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: () => void
    onErrorCallback?: (error: unknown) => void
  }) => {
    startTransition(async () => {
      try {
        await request.post('/auth/logout', { refreshToken })
        clearAuth()
        onSuccessCallback?.()
      } catch (error) {
        console.log('Logout error:', error)
        onErrorCallback?.(error)
      }
    })
  }

  return { formAuth, handleLogin, handleLogout, isPending }
}
