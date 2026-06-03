import React, { useState } from 'react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Loader2 } from 'lucide-react';
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type DataTableProps<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, any>>;
  isLoading?: boolean;
  hideSearch?: boolean;
  placeHolder?: string;
  disableColumnFilter?: boolean;
};

const DataTable = <TData,>({ data, columns, isLoading, hideSearch, placeHolder, disableColumnFilter }: DataTableProps<TData>): React.ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
  });

  return (
    <>
      {/* Global Filter Input */}
      <div className="flex items-center mb-2 gap-2 space-x-2">
        {!hideSearch && (
          <Input
            className="border px-2 py-1 rounded w-full font-poppins"
            placeholder={placeHolder ?? 'Filter all columns....'}
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className='w-full'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className='font-poppins text-primary'
                >
                  {header.isPlaceholder
                    ? null
                    : (
                      <div className="flex w-full items-center justify-between">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : 'flex items-center',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <span className="ml-1">▲</span>,
                            desc: <span className="ml-1">▼</span>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {!disableColumnFilter && header.column.getCanFilter() ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                                <Filter className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2" align="start">
                              <Input
                                placeholder={`Filter...`}
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                value={(header.column.getFilterValue() as string) ?? ''}
                                onChange={(event) => header.column.setFilterValue(event.target.value)}
                                className="h-8"
                              />
                            </PopoverContent>
                          </Popover>
                        ) : null}
                      </div>
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className=" text-center py-4 font-sans">
                <div className='flex items-center justify-center space-x-2 gap-2'>
                  <Loader2 className="animate-spin" size={24} />
                  Loading...
                </div>
              </TableCell>
            </TableRow>
          ) :
            (
              <>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='font-poppins text-primary'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center font-poppins">
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          className="p-2 border rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={20} />
        </button>
        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
          <strong>{table.getPageCount()}</strong>
        </span>
        <button
          className="p-2 border rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  )
}

export default DataTable