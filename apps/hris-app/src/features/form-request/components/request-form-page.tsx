import { Ellipsis, Menu } from 'lucide-react'
import RequestFormProvider, {
  useRequestFormContext,
} from './request-form-provider'
import RequestSyncButton from './request-sync-button'
import type { ColumnDef } from '@tanstack/react-table'
import PageContainer from '@/components/custom/containers/page-container'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import DataTablePagination from '@/components/custom/grid/DataTablePagination'
import { CROSSWORLD_IMAGE_URL } from '@/features/layouts/types/constant'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Status, StatusLabel } from '@/components/kibo-ui/status'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NavMenu, NavMenuItem } from '@/components/custom/misc/NavMenu'
import RequestForm from './request-form'
import {
  avatarUrl,
  formatLongDate,
  formatLongDateTime,
  getDisplayText,
} from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import SearchRequest from './search-request'
import RequestFormView from './request-form-view'
import type { FormRequestTypes } from '../types/global'
import { useMemo } from 'react'
import RequestCancel from './request-cancel-button'
import RequestSyncForm from './request-sync-form'
import {
  TextCell,
  UserAvatarCell,
} from '@/components/custom/grid/columns/column-type'

const RequestFormContent = () => {
  const {
    requestData,
    requestDataIsFetching: isFetching,
    handleNextPrevPage,
    handlePageSizeChange,
  } = useRequestFormContext()

  const columns = useMemo<ColumnDef<FormRequestTypes>[]>(
    () => [
      {
        accessorKey: 'requestNo',
        header: 'REQUEST NO.',
        cell: ({ row }) => {
          return <TextCell className="mt-2">{row.original.requestNo}</TextCell>
        },
      },
      {
        id: 'requestedBy',
        header: 'REQUESTED BY',
        cell: ({ row }) => {
          const { employeeProfile } = row.original
          const { firstName, lastName } = employeeProfile

          return (
            <UserAvatarCell
              name={`${firstName} ${lastName}`}
              avatarUrl={avatarUrl(row.original.id)}
            />
          )
        },
      },
      {
        accessorKey: 'requestFor',
        header: 'REQUESTED FOR',
        cell: ({ row }) => {
          return (
            <TextCell className="mt-2">
              {getDisplayText(row.original.requestFor)}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'requestDate',
        header: 'REQUEST DATE',
        cell: ({ row }) => {
          return (
            <TextCell className="mt-2">
              {formatLongDate(
                row.original.requestDate.toString(),
              ).toUpperCase()}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'dateFrom',
        header: 'FROM',
        cell: ({ row }) => {
          return (
            <TextCell className="mt-2">
              {formatLongDateTime(
                row.original.dateFrom.toString(),
              ).toUpperCase()}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'dateTo',
        header: 'TO',
        cell: ({ row }) => {
          return (
            <TextCell className="mt-2">
              {formatLongDateTime(row.original.dateTo.toString()).toUpperCase()}
            </TextCell>
          )
        },
      },
      {
        id: 'status',
        accessorKey: 'requestStatus',
        header: 'STATUS',
        cell: ({ row }) => {
          const status = row.original.requestStatus.toLowerCase()
          const isPending = status === 'cancelledbyhr'
          const bgColor = isPending ? 'bg-red-800 mt-2' : 'bg-primary mt-2'

          return (
            <Status status="maintenance" className={bgColor}>
              <StatusLabel className="font-sans text-white">
                {row.original.requestStatus}
              </StatusLabel>
            </Status>
          )
        },
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        cell: ({ row }) => {
          const isPending =
            row.original.requestStatus.toLowerCase() === 'pending'

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="font-sans font-primary font-medium"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuLabel className="text-md text-gray-300">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex flex-col">
                  <DropdownMenuItem asChild>
                    <RequestFormView data={row.original} />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RequestCancel
                      requestId={row.original.id}
                      disabled={
                        row.original.requestStatus.toLowerCase() ===
                        'cancelledbyhr'
                      }
                    />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [],
  )

  const response: PaginatedResponse<FormRequestTypes> = {
    data: requestData?.data ?? [],
    totalCount: requestData?.totalCount ?? 0,
    currentPage: requestData?.currentPage ?? 1,
    pageSize: requestData?.pageSize ?? 10,
    totalPages: requestData?.totalPages ?? 1,
    firstPage: requestData?.firstPage ?? 1,
    nextPage: requestData?.nextPage ?? 1,
    previousPage: requestData?.previousPage ?? 1,
    lastPage: requestData?.lastPage ?? 1,
    links: requestData?.links ?? [],
  }

  return (
    <>
      <HeaderContainer loading={isFetching}>
        <HeaderText
          title="Form Request"
          subtitle="Create and manage the form request"
        >
          <HeaderBackButton to="/" />
        </HeaderText>

        {/* This is the menu button for all of the request form */}
      </HeaderContainer>
      <PageContainer loading={isFetching}>
        <NavMenu>
          <div className="flex flex-row items-center space-x-1 h-full">
            <NavMenuItem asChild>
              <RequestSyncForm />
            </NavMenuItem>
            <Separator orientation="vertical" />
            <NavMenuItem asChild>
              <RequestForm />
            </NavMenuItem>
          </div>
        </NavMenu>
        <SearchRequest />
        <DataTablePagination
          response={response}
          columns={columns}
          onPageChange={handleNextPrevPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </PageContainer>
    </>
  )
}

export default RequestFormContent
