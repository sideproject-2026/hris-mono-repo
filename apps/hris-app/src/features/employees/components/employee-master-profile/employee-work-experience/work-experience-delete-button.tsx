import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'

import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useDeleteEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'
import { useOtherInformationContext } from '../other-information-provider'

const WorkExperienceDeleteButton = ({
  employeeId,
  workExperienceId,
}: {
  employeeId?: string
  workExperienceId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    useDeleteEmployeeInformationMutation()
  const { onRefresh } = useOtherInformationContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Work Experience',
      description:
        'Are you sure you want to delete this work experience record?',
      onConfirm: async () => {
        try {
          await deleteAsync({ id: employeeId || '', infoid: workExperienceId, entityType: 'WorkExperience' })
          toast.success('Work experience deleted successfully', {
            duration: 3000,
            closeButton: true,
          })
          onRefresh?.()
        } catch (error) {
          toast.error('Failed to delete work experience. Please try again.', {
            description: getErrorMessage(error),
            duration: 5000,
            closeButton: true,
          })
        }
      },
    })
  }

  return (
    <ButtonLoading
      text="Delete"
      icon={<Trash size={18} variant={'Bold'} />}
      variant="ghost"
      textLoading="Deleting..."
      loading={isPending}
      onClick={handleDelete}
    />
  )
}

export default WorkExperienceDeleteButton
