import PageContainer from '@/components/custom/containers/page-container'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import { Button } from '@hris/shared-ui/button'
import type { ColumnDef } from '@tanstack/react-table'
import { RefreshCcw } from 'lucide-react'
import { DateWithTimeTextCell, TextCell, TextWithTooltipCell } from '@/components/custom/grid/columns/column-type'
import { useMemo } from 'react'
import { useHRFormContext } from './hr-form-provider'
import { Separator } from '@hris/shared-ui/separator'
import {
  DGridColumns,
  DGridPagination,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hris/shared-ui/dropdown-menu'
import { Eye, HamburgerMenu } from 'iconsax-reactjs'
import HRForm from './hr-form'

const HRFormList = () => {
  const { hrFormsData, handlePrevNextPage, handlePageSizeChange, onRefresh } =
    useHRFormContext()


  const columns: ColumnDef<HRFormTypes>[] = useMemo(
    () => [
      {
        accessorKey: 'documentNo',
        header: 'DOCUMENT NO',
        cell: ({ row }) => (
          <TextCell alignment="start">{row.original.documentNo}</TextCell>
        ),
      },
      {
        accessorKey: 'type',
        header: 'TYPE',
        cell: ({ row }) => {

          return (
            <TextCell alignment="start" className="uppercase">
              {row.original.type}
            </TextCell>
          )
        },
      },
      {
        accessorKey: 'fullName',
        header: 'EMPLOYEE',
        cell: ({ row }) => (
          <TextCell alignment="start" className='uppercase'>{row.original.fullName}</TextCell>
        ),
      },
      {
        accessorKey: 'dateFiled',
        header: 'DATE FILED',
        cell: ({ row }) => (
          <DateWithTimeTextCell date={row.original.dateFiled} />
        ),
      },
      {
        accessorKey: 'effectiivtyDate',
        header: 'EFFECTIVITY DATE',
        cell: ({ row }) => (
          <DateWithTimeTextCell date={row.original.effectiivtyDate} />
        ),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPTION',
        cell: ({ row }) => (
          <TextWithTooltipCell text={row.original.description} />
        ),
      },
      {
        accessorKey: 'actions',
        header: 'ACTIONS',
        size: 50,
        cell: ({ row }) => {
          const form = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HamburgerMenu variant="Linear" size={24} color="#004663" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-md">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => console.log('view', form.id)}
                    className="w-full flex items-center justify-start gap-2 text-md font-normal"
                  >
                    <Eye variant="Bold" size={24} color="#004663" />
                    <span>View</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [],
  )

  const response: PaginatedResponse<HRFormTypes> = {
    data: hrFormsData?.data ?? [],
    totalCount: hrFormsData?.totalCount ?? 0,
    currentPage: hrFormsData?.currentPage ?? 1,
    pageSize: hrFormsData?.pageSize ?? 10,
    totalPages: hrFormsData?.totalPages ?? 1,
    firstPage: hrFormsData?.firstPage ?? 1,
    nextPage: hrFormsData?.nextPage ?? 1,
    previousPage: hrFormsData?.previousPage ?? 1,
    lastPage: hrFormsData?.lastPage ?? 1,
    links: hrFormsData?.links ?? [],
  }

  return (
    <div className="w-full h-full">
      <HeaderContainer loading={false}>
        <HeaderText
          title="Employee Action Request"
          subtitle="Manage and track employee action requests"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-3">
        <NavMenu>
          <HRForm />
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            onClick={onRefresh}
            className="font-sans text-sm uppercase"
          >
            <RefreshCcw className="size-4" /> Refresh
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
    </div>
  )
}

export default HRFormList
