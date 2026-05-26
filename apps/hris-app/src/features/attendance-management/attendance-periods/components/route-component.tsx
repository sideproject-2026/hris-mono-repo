import { formatDate } from 'date-fns'
import { PlusIcon } from 'lucide-react'
import { RefreshCircle } from 'iconsax-reactjs'
import AttendancePeriodDialog from './attendance-period-dialog'
import AttendanceFilter from './attendance-filter'
import { useAttendancePeriodContext } from './attendance-period-provider'
import { PeriodActionsDropdownMenu } from './attendance-menu'
import type { ColumnDef } from '@tanstack/react-table'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { createPaginatedResponse } from '@/components/custom/grid/helpers/utils'
import PageContainer from '@/components/custom/containers/page-container'
import { DataTablePagination } from '@hris/shared-ui'
import {
  BadgeCell,
  SwitchCell,
  TextCell,
  TextCenterColumn,
  UserAvatarCell,
} from '@/components/custom/grid/columns/column-type'

import { Button } from '@/components/ui/button'
import {
  NavMenu,
  NavMenuGroup,
  NavMenuItem,
} from '@/components/custom/misc/NavMenu'
import { Separator } from '@/components/ui/separator'
import StackRow from '@/components/custom/layouts/StackRow'
import { Badge } from '@/components/ui/badge'

const columns: Array<ColumnDef<AttendancePeriod>> = [
  {
    accessorKey: 'name',
    header: () => {
      return <TextCenterColumn>NAME</TextCenterColumn>
    },
    cell: ({ row }) => {
      return (
        <TextCell className="max-w-xs text-ellipsis overflow-hidden">
          {row.original.name}
        </TextCell>
      )
    },
    size: 50,
  },
  {
    accessorKey: 'description',
    header: () => {
      return <TextCenterColumn>DESCRIPTION</TextCenterColumn>
    },
    meta: { className: 'hidden xl:table-cell' },
    cell: ({ row }) => {
      return (
        <TextCell className="max-w-xs text-ellipsis overflow-hidden">
          {row.original.description}
        </TextCell>
      )
    },
    size: 50,
  },
  {
    accessorKey: 'periodType',
    header: () => {
      return <TextCenterColumn>PERIOD TYPE</TextCenterColumn>
    },
    meta: { className: 'hidden lg:table-cell' },
    cell: ({ row }) => {
      return (
        <TextCell alignment="center" className="max-w-xs text-ellipsis">
          {row.original.periodType}
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'periodFrom',
    header: () => {
      return <TextCenterColumn>PERIOD FROM</TextCenterColumn>
    },
    meta: { className: 'hidden md:table-cell' },
    cell: ({ row }) => {
      const periodFrom = formatDate(row.original.periodFrom, 'MMM dd, yyyy')
      return <TextCell alignment="center">{periodFrom}</TextCell>
    },
  },
  {
    accessorKey: 'periodTo',
    header: () => {
      return <TextCenterColumn>PERIOD TO</TextCenterColumn>
    },
    meta: { className: 'hidden md:table-cell' },
    cell: ({ row }) => {
      const periodTo = formatDate(row.original.periodTo, 'MMM dd, yyyy')
      return <TextCell alignment="center">{periodTo}</TextCell>
    },
  },
  {
    accessorKey: 'headCount',
    header: () => {
      return <TextCenterColumn>HEAD COUNT</TextCenterColumn>
    },
    meta: { className: 'hidden lg:table-cell' },
    cell: ({ row }) => {
      return (
        <TextCell className="font-bold text-sky-950" alignment="center">
          {row.original.headCount}
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => {
      return <TextCenterColumn>STATUS</TextCenterColumn>
    },
    cell: ({ row }) => {
      const status = row.original.status
      return <BadgeCell alignment="center" text={status} variant="default" />
    },
  },
  {
    accessorKey: 'isAutomate',
    header: () => {
      return <TextCenterColumn>IS AUTOMATE</TextCenterColumn>
    },
    meta: { className: 'hidden xl:table-cell' },
    cell: ({ row }) => {
      const isAutomate = row.original.isAutomate
      return (
        <TextCell alignment="center">
          <SwitchCell value={isAutomate} />
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'lastActivity',
    header: () => <TextCenterColumn>LAST ACTIVITY</TextCenterColumn>,
    meta: { className: 'hidden xl:table-cell' },
    cell: ({ row }) => {
      const lastActivity = row.original.lastActivity

      return (
        <TextCell alignment="center">
          {lastActivity
            ? formatDate(lastActivity, 'MMM dd, yyyy HH:mm')
            : '---'}
        </TextCell>
      )
    },
  },
  {
    accessorKey: 'user',
    header: () => <TextCenterColumn>USER</TextCenterColumn>,
    meta: { className: 'hidden xl:table-cell' },
    cell: ({ row }) => {
      const user = row.original.user
      var fullName = `${user?.lastName} ${user?.firstName}`
      return <UserAvatarCell name={fullName} avatarUrl={user?.photo} />
    },
  },
  {
    header: 'ACTIONS',
    cell: ({ row }) => {
      return <PeriodActionsDropdownMenu data={row.original} />
    },
  },
]

const RoutePeriodComponent = () => {
  const {
    onPageChange,
    onPageSizeChange,
    isFetching,
    attendancePeriods,
    onRefresh,
    params,
    onFilterChange,
  } = useAttendancePeriodContext()

  const formatFilterDate = (value?: string) =>
    value ? formatDate(new Date(value), 'MMM dd, yyyy') : ''

  const filterParts: Array<string> = []

  if (params?.status) {
    filterParts.push(`Status: ${params.status}`)
  }

  if (params?.periodFrom) {
    filterParts.push(`From: ${formatFilterDate(params.periodFrom)}`)
  }

  if (params?.periodTo) {
    filterParts.push(`To: ${formatFilterDate(params.periodTo)}`)
  }

  const currentFilterLabel =
    filterParts.length > 0 ? filterParts.join(' | ') : 'No active filter'

  return (
    <>
      <HeaderContainer loading={isFetching}>
        <HeaderText
          title="Attendance Management"
          subtitle="Manage attendance records and settings"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={isFetching}>
        <NavMenu>
          <NavMenuGroup align="start" className="h-full">
            <NavMenuItem asChild>
              <AttendancePeriodDialog>
                <Button
                  variant={'ghost'}
                  className="font-semibold uppercase text-sm"
                >
                  <PlusIcon />
                  <span>Create Period</span>
                </Button>
              </AttendancePeriodDialog>
            </NavMenuItem>
            <Separator orientation="vertical" />
            <NavMenuItem asChild>
              <Button
                variant={'ghost'}
                className="font-semibold uppercase text-sm"
                onClick={onRefresh}
              >
                <RefreshCircle />
                Refresh
              </Button>
            </NavMenuItem>
          </NavMenuGroup>
          <Separator orientation="vertical" />
          <NavMenuGroup className="h-full">
            <NavMenuItem asChild>
              <AttendanceFilter
                value={{
                  status:
                    params?.status === 'Posted' || params?.status === 'Pending'
                      ? params.status
                      : '',
                  periodFrom: params?.periodFrom
                    ? new Date(params.periodFrom)
                    : undefined,
                  periodTo: params?.periodTo
                    ? new Date(params.periodTo)
                    : undefined,
                }}
                onChange={(value) => {
                  onFilterChange?.({
                    status: value.status || '',
                    periodFrom: value.periodFrom
                      ? formatDate(value.periodFrom, 'yyyy-MM-dd')
                      : '',
                    periodTo: value.periodTo
                      ? formatDate(value.periodTo, 'yyyy-MM-dd')
                      : '',
                  })
                }}
              />
            </NavMenuItem>
          </NavMenuGroup>
        </NavMenu>
        <StackRow className="mt-4">
          <Badge variant="secondary" className="text-md font-normal uppercase">
            Filters:
          </Badge>
          <Badge variant="outline" className="text-md font-normal uppercase">
            {currentFilterLabel}
          </Badge>
        </StackRow>
        <DataTablePagination
          columns={columns}
          response={createPaginatedResponse(attendancePeriods)}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </PageContainer>
    </>
  )
}

export default RoutePeriodComponent
