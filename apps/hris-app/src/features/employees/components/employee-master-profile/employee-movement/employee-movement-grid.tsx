import {
  DateWithTimeTextCell,
  TextCell,
  TextWithTooltipCell,
} from '@/components/custom/grid/columns/column-type'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import { employeeMovementQueryOption } from '@/features/employees/hooks/useEmployee'
import { getDisplayText } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

interface EmployeeMovementGridProps {
  employeeId: string
}

const EmployeeMovementGrid = ({ employeeId }: EmployeeMovementGridProps) => {
  const { data: employeeMovementList } = useQuery(
    employeeMovementQueryOption(employeeId),
  )

  const columns: ColumnDef<EmployeeMovementTypes>[] = [
    {
      accessorKey: 'type',
      header: 'MOVEMENT TYPE',
      cell: ({ row }) => {
        const type = row.original.type
        return (
          <TextCell alignment="start" className="uppercase">
            {getDisplayText(type)}
          </TextCell>
        )
      },
    },
    {
      accessorKey: 'dateFrom',
      header: 'DATE FROM',
      cell: ({ row }) => {
        const dateFrom = row.original.dateFrom
        return <DateWithTimeTextCell date={dateFrom} />
      },
    },
    {
      accessorKey: 'dateTo',
      header: 'DATE TO',
      cell: ({ row }) => {
        const dateTo = row.original.dateTo
        return <DateWithTimeTextCell date={dateTo} />
      },
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION',
      cell: ({ row }) => {
        const description = row.original.description
        return <TextWithTooltipCell text={description} />
      },
    },
    {
      accessorKey: 'designationFrom',
      header: 'DESIGNATION FROM',
      cell: ({ row }) => {
        const designationFrom = row.original.designationFrom
        return <TextWithTooltipCell text={designationFrom ?? '---'} />
      },
    },
    {
      accessorKey: 'designationTo',
      header: 'DESIGNATION TO',
      cell: ({ row }) => {
        const designationTo = row.original.designationTo
        return <TextWithTooltipCell text={designationTo ?? '---'} />
      },
    },
    {
      accessorKey: 'departmentFrom',
      header: 'DEPARTMENT FROM',
      cell: ({ row }) => {
        const departmentFrom = row.original.departmentFrom
        return <TextWithTooltipCell text={departmentFrom ?? '---'} />
      },
    },
    {
      accessorKey: 'departmentTo',
      header: 'DEPARTMENT TO',
      cell: ({ row }) => {
        const departmentTo = row.original.departmentTo
        return <TextWithTooltipCell text={departmentTo ?? '---'} />
      },
    },
    {
      accessorKey: 'companyFrom',
      header: 'COMPANY FROM',
      cell: ({ row }) => {
        const companyFrom = row.original.companyFrom
        return <TextWithTooltipCell text={companyFrom ?? '---'} />
      },
    },
    {
      accessorKey: 'companyTo',
      header: 'COMPANY TO',
      cell: ({ row }) => {
        const companyTo = row.original.companyTo
        return <TextWithTooltipCell text={companyTo ?? '---'} />
      },
    },
    {
      accessorKey: 'branchFrom',
      header: 'BRANCH FROM',
      cell: ({ row }) => {
        const branchFrom = row.original.branchFrom
        return <TextWithTooltipCell text={branchFrom ?? '---'} />
      },
    },
    {
      accessorKey: 'branchTo',
      header: 'BRANCH TO',
      cell: ({ row }) => {
        const branchTo = row.original.branchTo
        return <TextWithTooltipCell text={branchTo ?? '---'} />
      },
    },
  ]

  return (
    <DGridProvider
      data={employeeMovementList ?? []}
      columns={columns}
      type="basic"
      emptyMessage="No request found."
      stickyFirstColumn
    >
      <DGridTable>
        <DGridColumns />
        <DGridRows />
      </DGridTable>
    </DGridProvider>
  )
}

export default EmployeeMovementGrid
