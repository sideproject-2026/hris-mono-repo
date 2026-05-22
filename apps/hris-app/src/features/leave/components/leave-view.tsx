import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import { leaveBalanceEmployeeQueryOptions } from '../hooks/useLeave'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DataTable from '@/components/custom/grid/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import { formatDate } from 'date-fns'
import { getDisplayText } from '@/lib/utils'

interface LeaveTabsProps {
  leaveBalance?: LeaveBalance[]
  leaveStockCard?: LeaveStockCard[]
}

const LeaveTabs = ({ leaveBalance, leaveStockCard }: LeaveTabsProps) => {
  const leaveBalanceColumns: ColumnDef<LeaveBalance>[] = [
    {
      accessorKey: 'description',
      header: 'LEAVES',
      cell: ({ row }) => {
        const description = row.original.description
        return (
          <span className="text-sm font-semibold">
            {getDisplayText(description)}
          </span>
        )
      },
    },
    {
      accessorKey: 'opening',
      header: 'OPENING',
      cell: ({ row }) => {
        const opening = row.original.opening
        return <span className="text-sm font-semibold">{opening}</span>
      },
    },
    {
      accessorKey: 'used',
      header: 'USED',
      cell: ({ row }) => {
        const used = row.original.used
        return (
          <span className="text-sm font-semibold text-red-500">{used}</span>
        )
      },
    },
    {
      accessorKey: 'balance',
      header: 'BALANCE',
      cell: ({ row }) => {
        const balance = row.original.balance
        return (
          <span className="text-sm font-semibold text-blue-700">{balance}</span>
        )
      },
    },
  ]

  const leaveStockCardColumns: ColumnDef<LeaveStockCard>[] = [
    {
      accessorKey: 'date',
      header: 'DATE',
      cell: ({ row }) => {
        const date = row.original.date
        return (
          <span className="text-sm truncate uppercase">
            {formatDate(date, 'MMM dd, yyyy')}
          </span>
        )
      },
    },
    {
      accessorKey: 'referenceNo',
      header: 'REFERENCE NO',
    },
    {
      accessorKey: 'leaveEntitlement',
      header: 'LEAVE ENTITLEMENT',
      cell: ({ row }) => {
        const leaveEntitlement = row.original.leaveEntitlement
        return <span>{getDisplayText(leaveEntitlement)}</span>
      },
    },
    {
      accessorKey: 'stockType',
      header: 'STOCK TYPE',
      cell: ({ row }) => {
        const stockType = row.original.stockType
        return <span>{getDisplayText(stockType)}</span>
      },
    },
    {
      accessorKey: 'quantity',
      header: 'QUANTITY',
    },
    {
      accessorKey: 'remarks',
      header: 'REMARKS',
      cell: ({ row }) => {
        const remarks = row.original.remarks
        return <span className="text-sm truncate uppercase">{remarks}</span>
      },
    },
  ]

  return (
    <Tabs defaultValue="leave-balance">
      <TabsList className="w-full">
        <TabsTrigger
          value="leave-balance"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          LEAVE BALANCE
        </TabsTrigger>
        <TabsTrigger
          value="leave-requests"
          className="data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          LEAVE HISTORY
        </TabsTrigger>
      </TabsList>
      <TabsContent value="leave-balance">
        <DGridProvider
          data={leaveBalance ?? []}
          columns={leaveBalanceColumns}
          type="basic"
          emptyMessage="No request found."
          stickyFirstColumn
        >
          <DGridTable>
            <DGridColumns />
            <DGridRows />
          </DGridTable>
        </DGridProvider>
      </TabsContent>
      <TabsContent value="leave-requests">
        <DGridProvider
          data={leaveStockCard ?? []}
          columns={leaveStockCardColumns}
          type="basic"
          emptyMessage="No request found."
          stickyFirstColumn
        >
          <DGridTable>
            <DGridColumns />
            <DGridRows />
          </DGridTable>
        </DGridProvider>
      </TabsContent>
    </Tabs>
  )
}

interface LeaveViewProps {
  employeeId: number
}
const LeaveView = ({ employeeId }: LeaveViewProps) => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery(leaveBalanceEmployeeQueryOptions(employeeId))

  const leaveBalance = data?.leaveBalances
  const leaveStockCard = data?.leaveStockCards

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Eye className="w-4 h-4" />
          <span className="text-md font-sans">View</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] lg:max-w-fit overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>EMPLOYEE LEAVE LEDGER</DialogTitle>
          <DialogDescription>
            You can view the leave details here.
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal" />
        <main className="flex flex-col gap-1">
          <p className="text-sm font-semibold truncate uppercase text-muted-foreground">
            employee information
          </p>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.picture || ''} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {data?.employeeName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm truncate uppercase">
                {data?.employeeName}
              </span>
              <span className="text-[11px] text-muted-foreground font-sans">
                EMP ID:{data?.employeeId}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            {/* <p className="text-sm font-semibold truncate uppercase text-muted-foreground">
              leave information
            </p> */}
            <LeaveTabs
              leaveBalance={leaveBalance ?? []}
              leaveStockCard={leaveStockCard ?? []}
            />
          </div>
        </main>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveView
