import { Button } from '@hris/shared-ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hris/shared-ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@hris/shared-ui'
import { cn, ellipsis } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const PAGE_SIZE_OPTIONS = [10, 20, 50]
const DEFAULT_COLUMN_SIZE = 'minmax(180px, 1fr)'

const DynamicTable = ({
  table,
  previewRows,
}: {
  table: ReportTableDefinition
  previewRows: any[]
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])

  const totalRows = previewRows.length
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))

  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize, totalRows])

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return previewRows.slice(start, end)
  }, [currentPage, pageSize, previewRows])

  const from = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, totalRows)

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className="max-w-[1380px] overflow-scroll rounded-lg border border-border/60 bg-background">
      <Table className="min-w-max text-sm">
        <colgroup>
          {table.columns.map((column) => (
            <col
              key={column.key}
              style={{ width: column.size?.trim() || DEFAULT_COLUMN_SIZE }}
            />
          ))}
        </colgroup>
        <TableHeader className="bg-muted/40">
          <TableRow>
            {table.columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn('font-semibold', column.numeric && 'text-right')}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRows.length > 0 ? (
            paginatedRows.map((row, index) => (
              <TableRow key={`${row.employee ?? row.id ?? 'row'}-${index}`}>
                {table.columns.map((column) => {
                  const rawValue = row[column.key]
                  const value =
                    rawValue === null || rawValue === undefined
                      ? ''
                      : String(rawValue)
                  const displayValue = ellipsis(value, 10)
                  return (
                    <TableCell
                      key={column.key}
                      className={cn(column.numeric && 'text-right font-medium')}
                      title={value}
                    >
                      {displayValue}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.columns.length}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No records available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-20">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>
            {from}-{to} of {totalRows}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={!canGoNext}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DynamicTable
