import { PageContainer } from '@hris/shared-ui'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import { NavMenu, NavMenuItem } from '@hris/shared-ui'
import { Avatar, AvatarFallback, AvatarImage, Separator } from '@hris/shared-ui'
import { useQuery } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'
import {
  leaveBalanceInitialsQueryOptions,
} from '../hooks/useLeave'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import { Ellipsis, RefreshCcw } from 'lucide-react'
import LeaveButtons from './leave-buttons'
import { LeaveBalanceTable } from '@hris/shared-ui'
import LeaveProvider, { useLeaveContext } from './leave-provider'
import LeaveSearch from './leave-search'
import LeaveView from './leave-view'
import LeaveAdjustmentForm from './leave-adjustment-form'

const LeaveContent = () => {
  const { leaveData, onRefresh, handleNextPrevPage, handlePageSizeChange } =
    useLeaveContext()

  const { data: leaveBalanceInitials } = useQuery(
    leaveBalanceInitialsQueryOptions(),
  )

  const LEAVE_TYPES_KEYS =
    leaveBalanceInitials?.entitlements?.map((type) => type.text) ?? []

  const columns: ColumnDef<LeaveTypes>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      size: 250,
      cell: ({ row }) => {
        const profile = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={profile.picture || ''} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {profile.employeeName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm truncate uppercase">
                {profile.employeeName}
              </span>
              <span className="text-[11px] text-muted-foreground font-sans">
                EMP ID:{profile.employeeId}
              </span>
            </div>
          </div>
        )
      },
    },
    ...LEAVE_TYPES_KEYS.map((type) => ({
      id: type,
      header: () => (
        <div
          className="text-center font-bold w-full border-b border-white/20 pb-1"
          key={type}
        >
          {type}
        </div>
      ),
      columns: [
        {
          id: `${type}-open`,
          header: 'Open',
          size: 70,
          cell: ({ row }) => (
            <div className="text-center text-xs">
              {row.original.leaveBalances
                .find((b) => b.description === type)
                ?.opening.toFixed(2) ?? '0.00'}
            </div>
          ),
        },
        {
          id: `${type}-used`,
          header: 'Used',
          size: 70,
          cell: ({ row }) => (
            <div className="text-center text-xs text-red-500">
              {row.original.leaveBalances
                .find((b) => b.description === type)
                ?.used.toFixed(2) ?? '0.00'}
            </div>
          ),
        },
        {
          id: `${type}-balance`,
          header: 'Bal',
          size: 75,
          cell: ({ row }) => (
            <div
              className="text-center text-xs font-bold text-blue-700"
              key={type}
            >
              {row.original.leaveBalances
                .find((b) => b.description === type)
                ?.balance.toFixed(2) ?? '0.00'}
            </div>
          ),
        },
      ],
    })),
    {
      id: 'actions',
      header: 'Actions',
      size: 100,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <LeaveView employeeId={row.original.employeeId ?? 0} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <LeaveAdjustmentForm
                  employeeId={row.original.employeeId ?? 0}
                  employeeName={row.original.employeeName ?? ''}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const response: PaginatedResponse<LeaveTypes> = {
    data: leaveData?.data ?? [],
    totalCount: leaveData?.totalCount ?? 0,
    currentPage: leaveData?.currentPage ?? 1,
    pageSize: leaveData?.pageSize ?? 10,
    totalPages: leaveData?.totalPages ?? 1,
    firstPage: leaveData?.firstPage ?? 1,
    nextPage: leaveData?.nextPage ?? 1,
    previousPage: leaveData?.previousPage ?? 1,
    lastPage: leaveData?.lastPage ?? 1,
    links: leaveData?.links ?? [],
  }

  return (
    <>
      <HeaderContainer title="Leave">
        <HeaderText title="Leave" subtitle="Manage employee leave">
          <HeaderBackButton to={'/'} />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="my-5 space-y-3">
        <NavMenu>
          <div className="flex flex-row items-center space-x-1 h-full">
            <NavMenuItem asChild>
              <LeaveButtons />
            </NavMenuItem>
            <Separator orientation="vertical" />
            <NavMenuItem asChild>
              <Button size="lg" variant="ghost" onClick={() => onRefresh?.()}>
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </NavMenuItem>
          </div>
        </NavMenu>
        <LeaveSearch />
        <LeaveBalanceTable
          response={response}
          columns={columns}
          onPageChange={handleNextPrevPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </PageContainer>
    </>
  )
}

const LeavePage = () => {
  return (
    <LeaveProvider>
      <LeaveContent />
    </LeaveProvider>
  )
}

export default LeavePage
