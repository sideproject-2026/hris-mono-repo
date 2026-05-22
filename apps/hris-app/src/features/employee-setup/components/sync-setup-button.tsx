import { Button } from '@/components/ui/button'
import { UploadCloudIcon } from 'lucide-react'
import { syncLegacyEmployeesMutation } from '../hooks/useEmployeeSetup'
import { toast } from 'sonner'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { CloudChange } from 'iconsax-reactjs'

const SyncSetupButton = () => {
  const { mutateAsync, isPending } = syncLegacyEmployeesMutation()
  const { requestConfirmation } = useConfirmationContext()

  const handleSync = async () => {
    requestConfirmation({
      title: 'Confirm Sync',
      description:
        'Are you sure you want to sync employees from the legacy system?',
      confirmLabel: 'Sync',
      async onConfirm() {
        try {
          await mutateAsync()
          toast.success('Employees synced successfully.')
        } catch (error) {
          toast.error('Failed to sync employees.')
          console.error(error)
        }
      },
    })
  }
  return (
    <ButtonLoading
      onClick={handleSync}
      icon={<CloudChange size={'32px'} variant="Bold" color="#004663" />}
      text="Sync"
      disabled={isPending}
      loading={isPending}
      variant={'ghost'}
      className="font-sans text-sm uppercase font-semibold"
    />
  )
}

export default SyncSetupButton
