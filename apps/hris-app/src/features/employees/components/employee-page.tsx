import PageContainer from '@/components/custom/containers/page-container'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import { ROUTE } from '@/types/router'
import { useNavigate } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon, RefreshCcw } from 'lucide-react'
import EmployeeFilter from './employee-filter'
import {
  DateWithTimeTextCell,
  TextCell,
  TextWithTooltipCell,
  UserAvatarCell,
} from '@/components/custom/grid/columns/column-type'
import { useMemo } from 'react'
import { useEmployeeContext } from './employee-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Separator,
  Button,
  Badge,
} from '@hris/shared-ui'
import { Eye, HamburgerMenu } from 'iconsax-reactjs'
import EmployeeLeaveSetupForm from './employee-leave/employee-leave-setup-form'
import { StackRow } from '@/components/custom/layouts'
import EmployeeLeaveView from './employee-leave/employee-leave-view'
import {
  DGridColumns,
  DGridPagination,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import EmployeeAdjustLeaveForm from './employee-leave/employee-adjust-leave-form'
import { avatarUrl } from '@/lib/utils'

const transformer = (category: string, text: number) => {
  if (category === 'employeeType') {
    switch (text) {
      case 1:
        return 'Other'
      case 2:
        return 'Probationary'
      case 3:
        return 'Regular'
      case 4:
        return 'Project Based'
      default:
        return text
    }
  } else if (category === 'employeeClass') {
    switch (text) {
      case 1:
        return 'Employee'
      case 2:
        return 'Outsource'
      case 3:
        return 'Cadet'
      case 4:
        return 'Project Based'
      case 5:
        return 'Other'
      default:
        return text
    }
  }
  return text || null
}

const createFilterValue = (search: Record<string, any>): string[] => {
  const filterParts: Array<string> = []
  const transformEmployeeType = transformer('employeeType', search.employeeType)
  const transformEmployeeClass = transformer(
    'employeeClass',
    search.employeeClass,
  )

  if (search.fieldName && search.fieldValue) {
    filterParts.push(`${search.fieldName}: ${search.fieldValue}`)
  }
  if (search.employeeType !== 0) {
    filterParts.push(`${transformEmployeeType}`)
  }

  if (search.employeeClass !== 0) {
    filterParts.push(`${transformEmployeeClass}`)
  }

  if (search.department) {
    filterParts.push(search.department)
  }
  if (search.company) {
    filterParts.push(search.company)
  }

  if (search.branch) {
    filterParts.push(search.branch)
  }

  return filterParts
}

const EmployeePage = () => {
  const navigate = useNavigate()
  const {
    employeesData,
    handlePrevNextPage,
    handlePageSizeChange,
    onRefresh,
    search,
  } = useEmployeeContext()

  const columns: ColumnDef<EmployeeActiveTypes>[] = useMemo(
    () => [
      {
        accessorKey: 'type',
        header: 'EMPLOYEE TYPE',
        meta: { className: 'hidden xl:table-cell' },
        cell: ({ row }) => {
          const empType = row.original
          return (
            <TextCell alignment="start" className="uppercase">
              {empType.type}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'classification',
        header: 'CLASSIFICATION',
        meta: { className: 'hidden xl:table-cell' },
        cell: ({ row }) => {
          const empClass = row.original
          return (
            <TextCell alignment="start" className="uppercase">
              {empClass.classification}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'employeeID',
        header: 'EMPLOYEE NO',
        meta: { className: 'hidden lg:table-cell' },
        cell: ({ row }) => {
          return (
            <TextCell alignment="start" className="uppercase">
              {row.original.employeeCode}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'fullName',
        header: 'NAME',
        cell: ({ row }) => {
          return (
            <UserAvatarCell
              name={row.original.fullName}
              avatarUrl={avatarUrl(row.original.id)}
              description={row.original.designation}
              className="text-sm uppercase"
            />
          )
        },
      },
      {
        accessorKey: 'department',
        header: 'DEPARTMENT',
        meta: { className: 'hidden min-[1400px]:table-cell' },
        cell: ({ row }) => {
          return (
            <TextWithTooltipCell text={row.original.department} />
          )
        },
      },
      {
        accessorKey: 'company',
        header: 'COMPANY',
        meta: { className: 'hidden lg:table-cell' },
        cell: ({ row }) => {
          return <TextWithTooltipCell text={row.original.company} />
        },
      },
      {
        accessorKey: 'branch',
        header: 'BRANCH',
        meta: { className: 'hidden lg:table-cell' },
        cell: ({ row }) => {
          return <TextWithTooltipCell text={row.original.branch} />
        },
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        meta: { className: 'hidden xl:table-cell' },
        cell: ({ row }) => {
          return (
            <TextCell alignment="start" className="uppercase">
              {row.original.status ? 'Active' : 'Inactive'}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'dateHired',
        header: 'DATE HIRED',
        meta: { className: 'hidden xl:table-cell' },
        cell: ({ row }) => {
          return <DateWithTimeTextCell date={row.original.dateHired} />
        },
      },
      // {
      //   accessorKey: 'dateRegularization',
      //   header: 'DATE REGULAR',
      //   meta: { className: 'hidden xl:table-cell' },
      //   cell: ({ row }) => {
      //     return (
      //       <DateWithTimeTextCell date={row.original.dateRegular ?? null} />
      //     )
      //   },
      // },
      {
        accessorKey: 'actions',
        header: 'ACTIONS',
        cell: ({ row }) => {
          const employee = row.original

          const handleViewEmployee = () => {
            navigate({
              to: ROUTE.EMPLOYEE_PROFILE_ROUTE(employee.id),
            })
          }
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HamburgerMenu variant="Linear" size={24} color="#004663" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-md">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={handleViewEmployee}
                    className="w-full flex items-center justify-start gap-2 text-md font-normal"
                  >
                    <Eye variant="Bold" size={24} color="#004663" />
                    <span>Employee Profile</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <EmployeeLeaveView
                    employeeId={employee.id}
                    fullName={employee.fullName}
                    description={employee.designation}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="w-full">
                  <EmployeeAdjustLeaveForm
                    employeeId={employee.id}
                    employeeName={employee.fullName}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [],
  )

  const filterParts = createFilterValue(search)

  const currentFilterLabel =
    filterParts.length > 0 ? filterParts.join(' | ') : 'No active filter'
  const handleAddEmployee = () => {
    navigate({
      to: ROUTE.EMPLOYEE_CREATE_ROUTE,
    })
  }

  const response: PaginatedResponse<EmployeeActiveTypes> = {
    data: employeesData?.data ?? [],
    totalCount: employeesData?.totalCount ?? 0,
    currentPage: employeesData?.currentPage ?? 1,
    pageSize: employeesData?.pageSize ?? 10,
    totalPages: employeesData?.totalPages ?? 1,
    firstPage: employeesData?.firstPage ?? 1,
    nextPage: employeesData?.nextPage ?? 1,
    previousPage: employeesData?.previousPage ?? 1,
    lastPage: employeesData?.lastPage ?? 1,
    links: employeesData?.links ?? [],
  }

  return (
    <div className="w-full h-full">
      <HeaderContainer loading={false}>
        <HeaderText
          title="Employee Master"
          subtitle="Manage and maintain employees informations and movements"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-3">
        <NavMenu>
          <Button
            variant={'ghost'}
            onClick={handleAddEmployee}
            className="font-sans text-sm uppercase font-semibold"
          >
            <PlusIcon className="size-4" />
            Add Employee
          </Button>
          <Separator orientation="vertical" />
          <EmployeeLeaveSetupForm />
          <Separator orientation="vertical" />
          <Button
            variant={'ghost'}
            onClick={onRefresh}
            className="font-sans text-sm uppercase font-semibold"
          >
            <RefreshCcw className="size-4" /> Refresh
          </Button>
          <Separator orientation="vertical" />
          <EmployeeFilter />
        </NavMenu>
        <StackRow>
          <Badge variant="secondary" className="text-md font-normal uppercase">
            Filters:
          </Badge>
          <Badge variant="outline" className="text-md font-normal uppercase">
            {currentFilterLabel}
          </Badge>
        </StackRow>
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
    </div>
  )
}

export default EmployeePage
