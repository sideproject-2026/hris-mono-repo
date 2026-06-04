import { PageContainer } from '@hris/shared-ui'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import { StackCol } from '@hris/shared-ui'
import { NavMenu } from '@hris/shared-ui'
import { Separator } from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import { Menu, RefreshCcw } from 'lucide-react'
import {
  DGridColumns,
  DGridPagination,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'
import { type ColumnDef } from '@tanstack/react-table'
import UserManagementForm from './user-management-form'
import { useUserManagementContext } from './user-management-provider'
import {
  TextCell,
  UserAvatarCell,
} from '@hris/shared-ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hris/shared-ui'
import UserManagementAccessForm from './user-management-access-form'
import { Edit2 } from 'iconsax-reactjs'
import UserManagementResetPassword from './user-management-reset-password'

const UserManagementPage = () => {
  const {
    userManagementData,
    handlePrevNextPage,
    handlePageSizeChange,
    onRefresh,
  } = useUserManagementContext()

  const columns: ColumnDef<UserManagement>[] = [
    {
      header: 'EMPLOYEE NAME',
      cell: ({ row }) => {
        return (
          <UserAvatarCell
            name={row.original.firstName + ' ' + row.original.lastName}
            avatarUrl={row.original.photo}
            className="uppercase text-md font-semibold"
            description={row.original.jobTitle}
          />
        )
      },
    },
    {
      accessorKey: 'department',
      header: 'DEPARTMENT',
      cell: ({ row }) => {
        return <TextCell>{row.original.department}</TextCell>
      },
    },
    {
      accessorKey: 'companyName',
      header: 'COMPANY NAME',
      cell: ({ row }) => {
        return <TextCell>{row.original.companyName}</TextCell>
      },
    },
    {
      accessorKey: 'userLevel',
      header: 'USER LEVEL',
    },
    {
      accessorKey: 'email',
      header: 'EMAIL',
    },
    {
      accessorKey: 'userName',
      header: 'USER NAME',
    },
    {
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <UserManagementForm
                  initialValues={{
                    userName: row.original.userName,
                    password: '',
                    employeeId: row.original.employeeId,
                    firstName: row.original.firstName,
                    lastName: row.original.lastName,
                    companyName: row.original.companyName,
                    department: row.original.department,
                    jobTitle: row.original.jobTitle,
                    photo: row.original.photo,
                    userLevel: row.original.userLevel,
                    emailAddress: row.original.email,
                    userRoles: Array.isArray(row.original.roles)
                      ? typeof row.original.roles[0] === 'string'
                        ? (row.original.roles as string[])
                        : (row.original.roles as SelectionItem<string>[]).map(
                          (r) => r.value,
                        )
                      : [],
                  }}
                  trigger={
                    <Button
                      variant="ghost"
                      className="font-normal text-md w-full justify-start"
                    >
                      <Edit2 variant="Bold" size={16} />
                      Edit
                    </Button>
                  }
                />
                <DropdownMenuSeparator />
                <StackCol className="gap-0">
                  <UserManagementAccessForm
                    userInfo={row.original}
                    userName={row.original.userName}
                    roleNames={row.original.roles}
                    accessNames={row.original.claims}
                  />
                  <UserManagementResetPassword
                    userName={row.original.userName}
                    fullname={
                      row.original.firstName + ' ' + row.original.lastName
                    }
                  />
                </StackCol>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const response: PaginatedResponse<UserManagement> = {
    data: userManagementData?.data ?? [],
    totalCount: userManagementData?.totalCount ?? 0,
    currentPage: userManagementData?.currentPage ?? 1,
    pageSize: userManagementData?.pageSize ?? 10,
    totalPages: userManagementData?.totalPages ?? 1,
    firstPage: userManagementData?.firstPage ?? 1,
    nextPage: userManagementData?.nextPage ?? 1,
    previousPage: userManagementData?.previousPage ?? 1,
    lastPage: userManagementData?.lastPage ?? 1,
    links: userManagementData?.links ?? [],
  }

  return (
    <StackCol className="w-full h-full">
      <HeaderContainer>
        <HeaderText
          title="User Management"
          subtitle="You can add or edit your user management information to this feature"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-4">
        <NavMenu>
          <UserManagementForm />
          <Separator orientation="vertical" />
          <Button
            variant={'ghost'}
            className="font-sans text-sm uppercase font-semibold"
            onClick={onRefresh}
          >
            <RefreshCcw className="size-4" />
            Refresh
          </Button>
        </NavMenu>
        <DGridProvider
          columns={columns}
          type="pagination"
          response={response}
          onPageChange={handlePrevNextPage}
          onPageSizeChange={handlePageSizeChange}
        >
          <DGridTable>
            <DGridColumns />
            <DGridRows />
          </DGridTable>
          <DGridPagination />
        </DGridProvider>
      </PageContainer>
    </StackCol>
  )
}

export default UserManagementPage
