import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { employeeEmergencyContactDeleteMutation } from '@/features/employees/hooks/useEmployee'
import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useEmployeeEmergencyContactContext } from './employee-emergency-provider'

const EmergencyDeleteButton = ({
  employeeId,
  emergencyId,
}: {
  employeeId?: string
  emergencyId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    employeeEmergencyContactDeleteMutation()
  const { onRefresh } = useEmployeeEmergencyContactContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Emergency Contact',
      description: 'Are you sure you want to delete this emergency contact?',
      onConfirm: async () => {
        try {
          await deleteAsync({ employeeId, id: emergencyId })
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

export default EmergencyDeleteButton
