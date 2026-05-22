import { Button } from '@/components/ui/button'
import { Ban, RefreshCcw } from 'lucide-react'

const LeaveButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button size="lg" variant="ghost">
        <Ban className="h-4 w-4" />
        Close Balance
      </Button>
    </div>
  )
}

export default LeaveButtons
