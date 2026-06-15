/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import {
  CheckCircle2Icon,
  Menu,
  MoreHorizontal,
  RefreshCcwIcon,
  XIcon,
} from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
  PageContainer,
  DataTablePagination,
  TextCell,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  UserAvatarCell,
  NavMenu,
  Separator,
  Badge,
  Button,
  createPaginatedResponse,
  useConfirmationContext,
  ConfirmDialogProvider,
} from '@hris/shared-ui'

import EmployeeFilter from './employee-setup-filter'
import { useEmployeeContext } from './employee-setup-provider'
import SyncButton from './sync-setup-button'
import ExportButton from './export-setup-button'
import EmployeeSetupForm from './employee-setup-form'
import EmployeeSetupView from './employee-setup-view'
import { useToggleEmployeeStatusMutation } from '../hooks/useEmployeeSetup'
import { toast } from 'sonner'

const EmployeeSetupListComponentContent = () => {
  const { data, isFetching, onPageChange, onPageSizeChange, onRefresh } =
    useEmployeeContext()

  const columns: Array<ColumnDef<EmployeeSetupTypes>> = [
    {
      accessorKey: 'employeeID',
      header: 'FULL NAME',
      cell: ({ row }) => {
        const employeeID = row.original.employeeID
        return (
          <UserAvatarCell
            name={`${row.original.firstName} ${row.original.lastName}`}
            avatarUrl={employeeID + '.jpg'}
            description={row.original.department}
          />
        )
      },
    },
    {
      accessorKey: 'company',
      header: 'COMPANY',
      cell: ({ row }) => {
        const company = row.original.company
        return <span>{company}</span>
      },
    },
    {
      accessorKey: 'workSchedule.title',
      header: 'SCHEDULE',
      cell: ({ row }) => {
        const scheduleTitle = row.original.workSchedule.title
        return <TextCell className="uppercase">{scheduleTitle}</TextCell>
      },
    },
    {
      accessorKey: 'attendancePolicy.name',
      header: 'ATTENDANCE POLICY',
      cell: ({ row }) => {
        const attendancePolicyId = row.original.attendancePolicy.name
        return <TextCell className="uppercase">{attendancePolicyId}</TextCell>
      },
    },
    {
      accessorKey: 'isActive',
      header: 'STATUS',
      cell: ({ row }) => {
        const isActive = row.original.isActive
        return (
          <Badge
            variant={isActive ? 'default' : 'destructive'}
            className="font-medium uppercase"
          >
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        )
      },
    },
    {
      header: 'ACTIONS',
      cell: ({ row }) => {
        const employee = row.original
        const { requestConfirmation } = useConfirmationContext()
        const { mutateAsync: toggleActiveStatusAsync } =
          useToggleEmployeeStatusMutation()

        const handleDeactivate = (employeeId: number) => {
          requestConfirmation({
            title: 'Confirm Action',
            description: `Are you sure you want to ${employee.isActive ? 'deactivate' : 'activate'} this employee?`,
            onConfirm: async () => {
              try {
                await toggleActiveStatusAsync({ id: employee.id })
                toast.success(
                  `Employee has been ${employee.isActive ? 'deactivated' : 'activated'} successfully.`,
                )
              } catch (error) {
                console.error('Error toggling employee status:', error)
                toast.error(
                  'An error occurred while updating employee status. Please try again.',
                )
              }
            },
          })
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuItem asChild>
                <EmployeeSetupForm
                  id={employee.id}
                  fullName={`${employee.firstName} ${employee.lastName}`}
                  department={employee.department}
                  scheduleId={employee.workSchedule.id}
                  attendancePolicyId={employee.attendancePolicyId}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EmployeeSetupView employeeSetup={employee} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => handleDeactivate(employee.employeeID)}
              >
                {employee.isActive ? (
                  <>
                    <XIcon className="mr-2 h-4 w-4" />
                    <span className="text-red-900 font-medium">Deactivate</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2Icon className="mr-2 h-4 w-4" />
                    <span className="text-green-600 font-medium">Activate</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <HeaderContainer loading={isFetching}>
        <HeaderText
          title="Employee Setup"
          subtitle="Manage and maintain employees schedules and policies"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={isFetching}>
        <NavMenu className="flex justify-between items-center w-full">
          <div className="flex flex-row items-center space-x-1 h-full">
            <SyncButton />
            <Separator orientation="vertical" />
            <Button
              variant={'ghost'}
              onClick={onRefresh}
              className="font-sans text-sm uppercase font-semibold"
            >
              <RefreshCcwIcon className="size-4" />
              <span className="text-md">Refresh</span>
            </Button>
            <Separator orientation="vertical" />
            <ExportButton />
          </div>
        </NavMenu>
        <EmployeeFilter />
        <div className="relative">
          <DataTablePagination
            response={createPaginatedResponse(data)}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            isLoading={isFetching}
            columns={columns}
          />
        </div>
      </PageContainer>
    </div>
  )
}


const EmployeeSetupListComponent = () => {
  return (
    <ConfirmDialogProvider>
      <EmployeeSetupListComponentContent />
    </ConfirmDialogProvider>
  )
}

export default EmployeeSetupListComponent
