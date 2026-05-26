import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import type {
  ColumnDef,
  ColumnResizeMode,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { PaginatedResponse } from '@hris/shared-ui'

// --- Types ---
declare type LeaveBalance = {
  leaveEntitlement: number
  description: string
  balance: number
  used: number
  opening: number
}

declare type LeaveStockCard = {
  date: string
  referenceNo: string
  leaveEntitlement: string
  stockType: string
  quantity: number
  remarks: string
}

declare type LeaveTypes = {
  id: string
  employeeId: number
  employeeName: string
  picture: string
  leaveBalances: LeaveBalance[]
  leaveStockCards: LeaveStockCard[]
}

type DataTablePaginationProps<TData> = {
  response: PaginatedResponse<TData>
  columns: ColumnDef<TData, any>[]
  isLoading?: boolean
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  getRowId?: (row: TData) => string
  enableColumnResizing?: boolean
  columnResizeMode?: ColumnResizeMode
  hideColumns?: Array<string>
}

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const LeaveBalanceTable = ({
  response,
  columns,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  getRowId,
  enableColumnResizing = false,
  columnResizeMode = 'onChange',
  hideColumns = [],
}: DataTablePaginationProps<LeaveTypes>) => {
  const { data, currentPage, pageSize, totalCount, totalPages } = response

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () =>
      hideColumns.reduce<VisibilityState>((visibility, columnId) => {
        visibility[columnId] = false
        return visibility
      }, {}),
  )

  // --- Column Definitions ---

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
    enableColumnResizing,
    columnResizeMode,
  })

  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="flex flex-col gap-4">
      {/* Column Visibility Toggle */}
      {/* <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="max-h-[300px] overflow-y-auto"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      {/* Table Container */}
      <div className="overflow-x-auto border border-border rounded-lg shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-primary text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`px-3 py-2 text-left font-semibold border-r border-white/10 last:border-0 ${
                        idx === 0 ? 'sticky left-0 z-20 bg-primary' : ''
                      }`}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={100}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  Loading records...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={100}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`border-t border-border transition-colors hover:bg-slate-50 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 border-r border-border/50 last:border-0 ${
                        cellIdx === 0
                          ? 'sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
                          : ''
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg border border-border">
        <span>
          Showing <b>{start}</b> to <b>{end}</b> of <b>{totalCount}</b> results
        </span>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Rows per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange?.(Number(value))}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage <= 1}
            >
              «
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ‹
            </Button>
            <div className="px-3 py-1 bg-white border rounded text-xs font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              ›
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              »
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveBalanceTable
