import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { employeeAddressDeleteMutation } from '@/features/employees/hooks/useOtherInfo'
import { getErrorMessage } from '@/lib/utils'
import { Trash } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { useEmployeeAddressesContext } from './employee-addresses-provider'

const AddressDeleteButton = ({
  employeeId,
  addressId,
}: {
  employeeId?: string
  addressId: string
}) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: deleteAsync, isPending } =
    employeeAddressDeleteMutation()
  const { onRefresh } = useEmployeeAddressesContext()

  const handleDelete = () => {
    requestConfirmation({
      title: 'Delete Address',
      description: 'Are you sure you want to delete this address?',
      onConfirm: async () => {
        try {
          // Add your delete logic here
          await deleteAsync({ employeeId, id: addressId })
          toast.success('Address deleted successfully', {
            duration: 3000,
            closeButton: true,
            // Optionally, you can add an action to undo the delete
          })
          onRefresh?.()
        } catch (error) {
          console.error('Failed to delete address:', error)
          toast.error('Failed to delete address. Please try again.', {
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

export default AddressDeleteButton
