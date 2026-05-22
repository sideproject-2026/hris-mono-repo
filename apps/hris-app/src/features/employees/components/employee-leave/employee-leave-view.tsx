import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import {
  TextCell,
  UserAvatarCell,
} from '@/components/custom/grid/columns/column-type'
import { StackCol, StackRow } from '@/components/custom/layouts'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { Calendar2 } from 'iconsax-reactjs'
import { employeesLeaveQueryOptions } from '../../hooks/useLeave'
import { avatarUrl, getDisplayText, getLeaveBalances } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Hand, PercentCircle, UserCheck, UserX } from 'lucide-react'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'

interface EmployeeLeaveViewProps {
  employeeId: string
  fullName: string
  description: string
}

const EmployeeLeaveView = ({
  employeeId,
  fullName,
  description,
}: EmployeeLeaveViewProps) => {
  const { data: leaveHistory } = useQuery(
    employeesLeaveQueryOptions(employeeId),
  )

  const columns: ColumnDef<EmployeeLeaveTypes>[] = [
    {
      accessorKey: 'leaveEntitlement',
      header: 'LEAVE TYPE',
      size: 0,
      minSize: 150,
      meta: { className: 'w-[1%] whitespace-nowrap' },
      cell: ({ row }) => (
        <TextCell alignment="start" className="uppercase">
          {getDisplayText(row.original.leaveEntitlement)}
        </TextCell>
      ),
    },
    {
      accessorKey: 'openingQty',
      header: 'OPENING',
      size: 0,
      minSize: 0,
      meta: { className: 'w-[1%] whitespace-nowrap text-center' },
      cell: ({ row }) => (
        <TextCell alignment="start" className="uppercase">
          {row.original.openingQty}
        </TextCell>
      ),
    },
    {
      accessorKey: 'usedQty',
      header: 'USED',
      size: 0,
      minSize: 0,
      meta: { className: 'w-[1%] whitespace-nowrap text-center' },
      cell: ({ row }) => (
        <TextCell alignment="start" className="uppercase">
          {row.original.usedQty}
        </TextCell>
      ),
    },
    {
      accessorKey: 'holdQty',
      header: 'HOLD',
      size: 0,
      minSize: 0,
      meta: { className: 'w-[1%] whitespace-nowrap text-center' },
      cell: ({ row }) => (
        <TextCell alignment="start" className="uppercase w-fit">
          {row.original.holdQty}
        </TextCell>
      ),
    },
    {
      accessorKey: 'totalBalance',
      header: 'TOTAL',
      size: 0,
      minSize: 0,
      meta: { className: 'w-[1%] whitespace-nowrap text-center' },
      cell: ({ row }) => (
        <TextCell alignment="start" className="uppercase">
          {row.original.totalBalance}
        </TextCell>
      ),
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="w-full flex items-center justify-start gap-2 text-md font-normal"
        >
          <Calendar2 variant="Bold" size={24} color="#004663" />
          <span>Employee Leave</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]!">
        <DialogHeader>
          <DialogTitle>Leave Details</DialogTitle>
          <DialogDescription>
            You can view the leave details of the employee here
          </DialogDescription>
        </DialogHeader>
        <div className="p-3 w-full -mt-5 space-y-3">
          <StackCol className="rounded-md border border-border bg-primary p-3">
            <Label className="text-md font-normal uppercase text-white">
              Employee Name
            </Label>
            <UserAvatarCell
              name={fullName}
              avatarUrl={avatarUrl(employeeId)}
              description={description}
              className="text-sm uppercase font-semibold text-white"
            />
          </StackCol>
          <StackCol>
            <Label className="text-md font-normal uppercase text-gray-500">
              DETAILS
            </Label>
            <div className="grid grid-cols-1 gap-2 w-full">
              <DGridProvider
                data={leaveHistory || []}
                columns={columns}
                type="basic"
                emptyMessage="No request found."
              >
                <DGridTable tableClassName="min-w-full">
                  <DGridColumns />
                  <DGridRows />
                </DGridTable>
              </DGridProvider>
            </div>
          </StackCol>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeLeaveView
