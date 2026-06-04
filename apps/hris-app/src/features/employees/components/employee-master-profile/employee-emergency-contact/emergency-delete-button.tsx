import {
  useConfirmationContext,
  ConfirmDialogProvider,
  ButtonLoading,
} from '@hris/shared-ui'
import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useDeleteEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'
import { useOtherInformationContext } from '../other-information-provider'

const EmergencyDeleteButtonContent = ({
  employeeId,
  emergencyId,
}: {
  employeeId?: string
  emergencyId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    useDeleteEmployeeInformationMutation()
  const { onRefresh } = useOtherInformationContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Emergency Contact',
      description: 'Are you sure you want to delete this emergency contact?',
      onConfirm: async () => {
        try {
          await deleteAsync({ id: employeeId || '', infoid: emergencyId, entityType: 'EmergencyContact' })
          toast.success('Emergency contact deleted successfully', {
            duration: 3000,
            closeButton: true,
          })
          onRefresh?.()
        } catch (error) {
          toast.error('Failed to delete emergency contact. Please try again.', {
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

const EmergencyDeleteButton = (props: {
  employeeId?: string
  emergencyId: string
}) => {
  return (
    <ConfirmDialogProvider>
      <EmergencyDeleteButtonContent {...props} />
    </ConfirmDialogProvider>
  )
}

export default EmergencyDeleteButton
