import { useConfirmationContext, ConfirmDialogProvider, Button } from '@hris/shared-ui'
import { Ban } from 'lucide-react'
import { toast } from 'sonner'
import { useRequestFormCancelMutation } from '../hooks/useFormRequest'
import { getErrorMessage } from '@/lib/utils'

interface RequestCancelProps {
  requestId: string
  disabled?: boolean
}
const RequestCancelContent = ({ requestId, disabled }: RequestCancelProps) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: cancelRequest } = useRequestFormCancelMutation()

  const handleCancel = async () => {
    const dataToCancel = {
      formId: requestId,
      cancelReason: 'cancelled',
    }
    requestConfirmation({
      title: 'Cancel Request',
      description: `Are you sure you want to cancel this request ${requestId}?`,
      confirmLabel: 'Yes',
      cancelLabel: 'No',
      onConfirm: async () => {
        try {
          await cancelRequest(dataToCancel)
          toast.success('Request cancelled successfully.')
        } catch (error) {
          const message = getErrorMessage(error, 'Failed to cancel request')
          toast.error(message)
        }
      },
    })
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2"
      onClick={handleCancel}
      disabled={disabled}
    >
      <Ban className="w-4 h-4" />
      <span className="text-md font-sans font-normal">Cancel</span>
    </Button>
  )
}

const RequestCancel = ({ requestId, disabled }: RequestCancelProps) => {
  return (
    <ConfirmDialogProvider>
      <RequestCancelContent requestId={requestId} disabled={disabled} />
    </ConfirmDialogProvider>
  )
}

export default RequestCancel
