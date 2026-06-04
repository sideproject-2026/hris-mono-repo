import { ButtonLoading, useConfirmationContext, ConfirmDialogProvider } from '@hris/shared-ui'
import { useDeleteEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'
import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useOtherInformationContext } from '../other-information-provider'

const EducationDeleteButtonContent = ({
  employeeId,
  educationId,
}: {
  employeeId?: string
  educationId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    useDeleteEmployeeInformationMutation()
  const { onRefresh } = useOtherInformationContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Education',
      description: 'Are you sure you want to delete this education record?',
      onConfirm: async () => {
        try {
          await deleteAsync({ id: employeeId || '', infoid: educationId, entityType: 'Education' })
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

const EducationDeleteButton = ({
  employeeId,
  educationId,
}: {
  employeeId?: string
  educationId: string
}) => {
  return (
    <>
      <ConfirmDialogProvider>
        <EducationDeleteButtonContent employeeId={employeeId} educationId={educationId} />
      </ConfirmDialogProvider>
    </>
  )
}

export default EducationDeleteButton
