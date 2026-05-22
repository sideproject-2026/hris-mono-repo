import { FolderSyncIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useSyncLegacyMutation } from '../hooks/useFormRequest'
import { useRequestFormContext } from './request-form-provider'
import { Button } from '@/components/ui/button'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { Spinner } from '@/components/ui/spinner'
import { I3DRotate } from 'iconsax-reactjs'

const RequestSyncButton = () => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync: syncLegacy, isPending } = useSyncLegacyMutation()
  const { onRefresh } = useRequestFormContext()

  const handleSyncClick = () => {
    requestConfirmation({
      title: 'Sync Legacy Requests',
      description:
        'Are you sure you want to sync legacy requests? This action may take some time.',
      confirmLabel: 'Sync',
      cancelLabel: 'Cancel',
      onConfirm: async () => {
        try {
          await syncLegacy({ month: 1, year: 2026 })
          onRefresh()
          toast.success('Legacy requests synced successfully.')
        } catch (error) {
          toast.error('Failed to sync legacy requests. Please try again.')
        }
      },
    })
  }
  return (
    <Button variant={'ghost'} onClick={handleSyncClick} disabled={isPending}>
      {isPending ? (
        <>
          <Spinner className="h-4 w-4 mr-2" />
          <span>Syncing...</span>
        </>
      ) : (
        <>
          <I3DRotate size={'32px'} variant="Bold" color="#004663" />
          <span>Sync Requests</span>
        </>
      )}
    </Button>
  )
}

export default RequestSyncButton
