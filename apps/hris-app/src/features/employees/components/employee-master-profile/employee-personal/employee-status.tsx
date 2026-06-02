import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import GroupContainer from '@/components/custom/containers/group-container'
import { StackCol, StackRow } from '@/components/custom/layouts'
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/components/kibo-ui/status'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { formatDate } from 'date-fns'

interface EmployeeStatusProps {
  active?: ActiveTypes
}

const EmployeeStatus = ({ active }: EmployeeStatusProps) => {
  return (
    <CollapsibleContainer title="Status information" baseClassName="w-full">
      <StackCol className="mt-5">
        <div className="space-y-1 w-full flex items-center gap-2">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Status:
          </p>
          <Status
            variant={active?.active ? 'default' : 'outline'}
            className="text-md font-normal"
            status={active?.active ? 'online' : 'offline'}
          >
            <StatusIndicator />
            <StatusLabel
              className={
                active?.active ? 'text-white' : 'text-muted-foreground'
              }
            >
              {active?.active ? 'Active' : 'Inactive'}
            </StatusLabel>
          </Status>
        </div>
        <div className="space-y-1 w-full">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Probationary Period:
          </p>
          <Status
            variant={'outline'}
            className="text-md font-normal"
            status={'offline'}
          >
            <StatusLabel>
              {active?.probationaryStartDate
                ? formatDate(active?.probationaryStartDate, 'MMMM-dd-yyyy')
                : '---'}{' '}
              -{' '}
              {active?.probationaryEndDate
                ? formatDate(active?.probationaryEndDate, 'MMMM-dd-yyyy')
                : '---'}
            </StatusLabel>
          </Status>
        </div>
        <div className="space-y-1 w-full flex items-center gap-2">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Regularization Date:
          </p>
          <Status
            variant={'outline'}
            className="text-md font-normal"
            status={'offline'}
          >
            <StatusLabel>
              {active?.regularDate
                ? formatDate(active?.regularDate, 'MMMM-dd-yyyy')
                : '---'}
            </StatusLabel>
          </Status>
        </div>
        <div className="space-y-1 w-full flex items-center gap-2">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Reference No:
          </p>
          <Status
            variant={'outline'}
            className="text-md font-normal"
            status={'offline'}
          >
            <StatusLabel>{active?.referenceNo || '---'}</StatusLabel>
          </Status>
        </div>
        <div className="space-y-1 w-full flex items-center gap-2">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Resigned Date:
          </p>
          <Status
            variant={'outline'}
            className="text-md font-normal"
            status={'offline'}
          >
            <StatusLabel>
              {active?.dateResigned
                ? formatDate(active?.dateResigned, 'MMMM-dd-yyyy')
                : '---'}
            </StatusLabel>
          </Status>
        </div>
        <div className="space-y-1 w-full flex items-center gap-2">
          <p className="text-md text-muted-foreground font-normal tracking-wider">
            Resigned Reason:
          </p>
          <p className="text-md font-semibold min-h-[1.25rem] truncate">
            {active?.resignedReason || '---'}
          </p>
        </div>
      </StackCol>
    </CollapsibleContainer>
  )
}

export default EmployeeStatus
