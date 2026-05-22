import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { employeeEducationDeleteMutation } from '@/features/employees/hooks/useOtherInfo'
import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useEmployeeEducationContext } from './employee-education-provider'

const EducationDeleteButton = ({
  employeeId,
  educationId,
}: {
  employeeId?: string
  educationId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    employeeEducationDeleteMutation()
  const { onRefresh } = useEmployeeEducationContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Education',
      description: 'Are you sure you want to delete this education record?',
      onConfirm: async () => {
        try {
          await deleteAsync({ employeeId, id: educationId })
          toast.success('Education deleted successfully', {
            duration: 3000,
            closeButton: true,
          })
          onRefresh?.()
        } catch (error) {
          toast.error('Failed to delete education. Please try again.', {
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

export default EducationDeleteButton
