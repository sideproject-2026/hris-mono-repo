import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { createContext, useContext, useMemo, useState } from 'react'
import type {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'
import type { PaginatedResponse } from '@hris/shared-ui'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type DGridType = 'basic' | 'pagination'

type DGridContextValue<TData> = {
  table: TanStackTable<TData>
  type: DGridType
  isLoading: boolean
  columnsCount: number
  emptyMessage: ReactNode
  pagination?: PaginationMeta<TData>
  stickyFirstColumn?: boolean
  withCheckboxes: boolean
}

type PaginationMeta<TData> = {
  response: PaginatedResponse<TData>
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions: Array<number>
}

type SharedProviderProps<TData> = {
  columns: Array<ColumnDef<TData, any>>
  children: ReactNode
  isLoading?: boolean
  emptyMessage?: ReactNode
  stickyFirstColumn?: boolean
  withCheckboxes?: boolean
  rowSelection?: RowSelectionState
  onRowSelectionChange?: (selection: RowSelectionState) => void
}

type BasicProviderProps<TData> = SharedProviderProps<TData> & {
  type: 'basic'
  data: Array<TData>
}

type PaginationProviderProps<TData> = SharedProviderProps<TData> & {
  type: 'pagination'
  response: PaginatedResponse<TData>
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: Array<number>
}

type DGridProviderProps<TData> =
  | BasicProviderProps<TData>
  | PaginationProviderProps<TData>

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

const DGridContext = createContext<DGridContextValue<any> | null>(null)

const DGridProvider = <TData,>(props: DGridProviderProps<TData>) => {
  const {
    columns,
    children,
    emptyMessage,
    isLoading = false,
    stickyFirstColumn,
    withCheckboxes = false,
    rowSelection: controlledRowSelection,
    onRowSelectionChange,
  } = props
  const [sorting, setSorting] = useState<SortingState>([])
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({})

  const data = props.type === 'basic' ? props.data : props.response.data
  const isRowSelectionControlled = controlledRowSelection !== undefined
  const resolvedRowSelection = isRowSelectionControlled
    ? controlledRowSelection
    : internalRowSelection

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
    const nextValue =
      typeof updater === 'function' ? updater(resolvedRowSelection) : updater

    if (!isRowSelectionControlled) {
      setInternalRowSelection(nextValue)
    }

    onRowSelectionChange?.(nextValue)
  }

  const resolvedColumns = useMemo(() => {
    if (!withCheckboxes) {
      return columns
    }

    const selectionColumn: ColumnDef<TData> = {
      id: '__selection',
      enableSorting: false,
      enableHiding: false,
      minSize: 48,
      size: 48,
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label="Select all rows"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label="Select row"
          />
        </div>
      ),
      meta: {
        className: 'w-[48px] text-center',
      },
    }

    return [selectionColumn, ...columns]
  }, [columns, withCheckboxes])

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      sorting,
      rowSelection: resolvedRowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange,
    enableRowSelection: withCheckboxes,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const contextValue: DGridContextValue<TData> = {
    table,
    type: props.type,
    isLoading,
    columnsCount: resolvedColumns.length,
    emptyMessage:
      emptyMessage ??
      (props.type === 'pagination'
        ? 'No records found.'
        : 'No data available.'),
    pagination:
      props.type === 'pagination'
        ? {
            response: props.response,
            onPageChange: props.onPageChange,
            onPageSizeChange: props.onPageSizeChange,
            pageSizeOptions: props.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS,
          }
        : undefined,
    stickyFirstColumn: stickyFirstColumn,
    withCheckboxes,
  }

  return (
    <DGridContext.Provider value={contextValue}>
      {children}
    </DGridContext.Provider>
  )
}

DGridProvider.displayName = 'DGridProvider'

const useDGridContext = () => {
  const context = useContext(DGridContext)

  if (!context) {
    throw new Error('DGrid components must be used within a DGridProvider')
  }

  return context
}

type DGridTableProps = React.ComponentProps<'div'> & {
  tableClassName?: string
}

const DGridTable = ({
  className,
  tableClassName,
  children,
  ...props
}: DGridTableProps) => {
  return (
    <ScrollArea
      className={cn('w-full whitespace-nowrap rounded-md border', className)}
    >
      <Table className={cn('w-full min-w-[1000px]', tableClassName)}>
        {children}
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

DGridTable.displayName = 'DGridTable'

const DGridColumns = () => {
  const { table, stickyFirstColumn } = useDGridContext()

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: header.getSize(), // Sets the preferred width
                minWidth: header.column.columnDef.minSize ?? '150px', // Ensures it doesn't get too small
              }}
              className={cn(
                'sticky top-0 z-10 whitespace-nowrap align-middle bg-neutral shadow-[0_1px_0_0_hsl(var(--border))] bg-primary',
                (header.column.columnDef.meta as any)?.className,
                stickyFirstColumn &&
                  index === 0 &&
                  'left-0 z-40 shadow-[1px_0_0_0_hsl(var(--border)),0_1px_0_0_hsl(var(--border))]',
              )}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={cn(
                    'flex items-center gap-2 text-sm font-semibold text-white',
                    header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : 'cursor-default',
                  )}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === 'asc' && (
                    <span className="text-xs">▲</span>
                  )}
                  {header.column.getIsSorted() === 'desc' && (
                    <span className="text-xs">▼</span>
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

DGridColumns.displayName = 'DGridColumns'

type DGridRowsProps = {
  emptyContent?: ReactNode
  loadingContent?: ReactNode
}

const DGridRows = ({ emptyContent, loadingContent }: DGridRowsProps) => {
  const { table, isLoading, columnsCount, emptyMessage, stickyFirstColumn } =
    useDGridContext()
  const rows = table.getRowModel().rows

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-24 text-center">
            {loadingContent ?? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Spinner className="h-4 w-4" />
                <span>Loading data…</span>
              </div>
            )}
          </TableCell>
        </TableRow>
      ) : rows.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={columnsCount}
            className="h-24 text-center text-sm text-muted-foreground"
          >
            {emptyContent ?? emptyMessage}
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell, index) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.columnDef.minSize ?? '150px',
                }}
                className={cn(
                  'align-middle text-sm',
                  (cell.column.columnDef.meta as any)?.className,
                  stickyFirstColumn &&
                    index === 0 &&
                    'stick left-0' &&
                    'sticky left-0 z-10 bg-background shadow-[1px_0_0_0_hsl(var(--border))]',
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  )
}

DGridRows.displayName = 'DGridRows'

type DGridPaginationProps = React.ComponentProps<'div'>

const DGridPagination = ({ className, ...props }: DGridPaginationProps) => {
  const { type, pagination } = useDGridContext()

  if (type !== 'pagination' || !pagination) {
    return null
  }

  const { response, onPageChange, onPageSizeChange, pageSizeOptions } =
    pagination
  const { currentPage, totalPages, pageSize, totalCount } = response

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange?.(page)
  }

  const handlePageSizeChange = (value: string) => {
    onPageSizeChange?.(Number(value))
  }

  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalCount)

  return (
    <div
      className={cn(
        'flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    >
      <p>
        Showing {start.toLocaleString()}–{end.toLocaleString()} of{' '}
        {totalCount.toLocaleString()}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span>Rows</span>
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[90px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {currentPage} of {Math.max(totalPages, 1)}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

DGridPagination.displayName = 'DGridPagination'

export { DGridProvider, DGridTable, DGridColumns, DGridRows, DGridPagination }
