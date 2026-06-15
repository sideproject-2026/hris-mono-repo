import { ApiRoutes } from '@/types/api-routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '@/lib/http'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const uploadPhotoSchema = z.object({
  photo: z
    .instanceof(File, { message: 'Photo is required' })
    .refine((file) => file.size > 0, 'Photo is required')
    .refine((file) => file.type.startsWith('image/'), 'File must be an image'),
})

export type IUploadPhotoModel = z.infer<typeof uploadPhotoSchema>

export const uploadPhotoDefaultValues: Partial<IUploadPhotoModel> = {
  photo: undefined,
}

export const useUploadPhoto = ({
  employeeId,
  onSuccess,
  onError,
}: {
  employeeId: string
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}) => {
  const queryClient = useQueryClient()

  const form = useForm<IUploadPhotoModel>({
    resolver: zodResolver(uploadPhotoSchema) as any,
    defaultValues: uploadPhotoDefaultValues,
  })

  const mutation = useMutation({

    mutationFn: async (data: IUploadPhotoModel) => {
      const formData = new FormData()
      formData.append('file', data.photo)

      const url = ApiRoutes.EMPLOYEES.UPLOAD_PHOTO(employeeId);
      const response = await request.postFormData<ApiResponse<{ data: string }>>(url, formData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-personal', employeeId] })
      queryClient.invalidateQueries({ queryKey: ['employee-photo', employeeId] })
    },
  })

  // Stores a selected File on the form, validating it against the schema.
  const setPhotoFile = (file: File) => {
    form.setValue('photo', file, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = form.handleSubmit(async (data: IUploadPhotoModel) => {
    try {
      const response = await mutation.mutateAsync(data)
      onSuccess?.(response)
    } catch (error) {
      onError?.(error)
    }
  })

  return { mutation, form, onSubmit, setPhotoFile }
}
