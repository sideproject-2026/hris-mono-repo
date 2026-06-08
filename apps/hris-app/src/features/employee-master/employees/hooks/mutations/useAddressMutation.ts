import { ApiRoutes } from '@/types/api-routes'
import { useMutation } from '@tanstack/react-query'
import {
  addressDefaultValues,
  addressSchema,
  type IAddressModel,
} from '../../types/employee.schema'
import { request } from '@/lib/http'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import type { EmployeeAddressesResponse } from '../../types/model'

export const mapEmployeeAddressToFormValues = (model: EmployeeAddressesResponse): IAddressModel => ({
  addressId: model.id,
  type: model.type.code,
  street: model.street ?? '',
  region: model.region ?? '',
  province: model.province ?? '',
  municipality: model.city ?? '',
  zipCode: model.zipCode ?? '',
  country: model.country ?? '',
})

export const useAddressMutation = ({
  employeeId,
  addressId,
  defaultValue,
  onSuccess,
  onError,
}: {
  employeeId?: string
  addressId?: string
  defaultValue?: EmployeeAddressesTypes | null
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}) => {
  const form = useForm<IAddressModel>({
    resolver: zodResolver(addressSchema) as any,
    defaultValues: addressDefaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: IAddressModel) => {
      const url = ApiRoutes.EMPLOYEES.ADDRESS(employeeId!)
      const method = addressId ? 'put' : 'post'
      const response = await request[method]<ApiResponse<{ data: string }>>(url, data)
      return response.data
    },
  })

  const onSubmit = async (data: IAddressModel) => {
    try {
      const response = await mutation.mutateAsync(data)
      onSuccess?.(response)
    } catch (error) {
      onError?.(error)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      form.reset(mapEmployeeAddressToFormValues(defaultValue))
    }
  }, [defaultValue])

  return { mutation, form, onSubmit }
}
