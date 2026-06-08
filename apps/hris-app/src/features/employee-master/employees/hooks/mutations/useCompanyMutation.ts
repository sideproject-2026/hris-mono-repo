import { ApiRoutes } from '@/types/api-routes'
import { useMutation } from '@tanstack/react-query'
import {
  employeeCompanyDefaultValues,
  employeeCompanySchema,
  type IEmployeeCompanyModel,
} from '../../types/employee.schema'
import { request } from '@/lib/http'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { EmployeeModel } from '../../types/model'
import { useEffect } from 'react'

export const mapEmployeeToCompanyFormValues = (model: EmployeeModel): IEmployeeCompanyModel => ({
  companyCode: model.companyCode ?? '',
  branch: model.branch ?? '',
  departmentCode: model.departmentCode ?? '',
  designationCode: model.designationCode ?? '',
  managerId: model.managerId ?? null,
  localNo: model.localNo ?? null,
  rank: model.rank.code,
  dateHired: model.dateHired ?? '',
  probStartDate: model.probStartDate ?? null,
  probEndDate: model.probEndDate ?? null,
})

export const useCompanyMutation = ({
  defaultValue,
  id,
  onSuccess,
  onError,
}: {
  defaultValue?: EmployeeModel | null
  id?: string
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}) => {
  const form = useForm<IEmployeeCompanyModel>({
    resolver: zodResolver(employeeCompanySchema) as any,
    defaultValues: employeeCompanyDefaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: IEmployeeCompanyModel) => {
      const response = await request.put<ApiResponse<{ data: string }>>(
        ApiRoutes.EMPLOYEES.APPOINT(id ?? ""),
        data,
      )
      return response.data
    },
  })

  const onSubmit = async (data: IEmployeeCompanyModel) => {
    try {
      const response = await mutation.mutateAsync(data)
      onSuccess?.(response)
    } catch (error) {
      onError?.(error)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      form.reset(mapEmployeeToCompanyFormValues(defaultValue))
    }
  }, [defaultValue])

  return { mutation, form, onSubmit }
}
