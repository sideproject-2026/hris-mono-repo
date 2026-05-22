import { LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { usePeriodPropertyUpdateMutation } from '../../hooks/useAttendanceProcess'
import { usePeriodSheetContext } from './sheet-provider'
import { Switch } from '@/components/ui/switch'

export const SheetAutomateSwitch = ({
  periodId,
  value = false,
}: {
  periodId: string
  value?: boolean
}) => {
  const { mutateAsync, isPending } = usePeriodPropertyUpdateMutation()
   const {onRefresh} = usePeriodSheetContext();
   const handleToggle = async (checked: boolean) => {
      await mutateAsync({periodId,property: 'isAutomate', value: checked}, {
         onSuccess: () => {
            toast.success(`Automate is now ${checked ? 'enabled' : 'disabled'}.`);
            onRefresh();
         },
         onError: (error) => {
            toast.error(`Failed to update automate setting. ${error}`);
         }
      });
   }

  if (isPending) {
    return (
      <div className="flex flex-row items-center">
        <LoaderCircleIcon className="animate-spin mr-2 size-4" />
        <p className='text-muted text-sm'>Updating...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center space-x-4">
      <p className='text-sm text-muted-foreground font-medium'>Automate</p>
      <Switch checked={value} onCheckedChange={handleToggle} />
    </div>
  )
}
