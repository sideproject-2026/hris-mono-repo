import { NavMenu } from '@/components/custom/misc/NavMenu'
import EmployeeFormEducation from './employee-form-education'
import GroupContainer from '@/components/custom/containers/group-container'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import type { ColumnDef } from '@tanstack/react-table'
import EmployeeEducationProvider, {
  useEmployeeEducationContext,
} from './employee-education-provider'
import { Button } from '@/components/ui/button'
import { Edit } from 'iconsax-reactjs'
import EducationDeleteButton from './education-delete-button'

const EmployeeListEducation = () => {
  const { employeeEducation, employeeId } = useEmployeeEducationContext()

  const columns: ColumnDef<EmployeeEducationTypes>[] = [
    {
      accessorKey: 'level',
      header: 'LEVEL',
      cell: ({ row }) => {
        const level = row.original.level
        return <span className="text-sm uppercase">{level}</span>
      },
    },
    {
      accessorKey: 'school',
      header: 'SCHOOL',
      cell: ({ row }) => {
        const school = row.original.school
        return <span className="text-sm uppercase">{school}</span>
      },
    },
    {
      accessorKey: 'course',
      header: 'COURSE',
      cell: ({ row }) => {
        const course = row.original.course
        return <span className="text-sm uppercase">{course}</span>
      },
    },
    {
      header: 'YEAR FROM - TO',
      cell: ({ row }) => {
        return (
          <span className="text-sm uppercase">
            {row.original.yearFrom} - {row.original.yearTo}
          </span>
        )
      },
    },
    {
      accessorKey: 'awards',
      header: 'AWARDS',
      cell: ({ row }) => {
        const awards = row.original.awards
        return <span className="text-sm uppercase">{awards}</span>
      },
    },
    {
      accessorKey: 'attachment',
      header: 'ATTACHMENT',
      cell: ({ row }) => {
        const attachment = row.original.attachment
        return <span className="text-sm uppercase">{attachment}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <EmployeeFormEducation
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            />
            <EducationDeleteButton
              employeeId={employeeId}
              educationId={row.original.id}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <NavMenu>
        <EmployeeFormEducation />
      </NavMenu>
      <GroupContainer title="Employee Education List">
        <DGridProvider
          data={employeeEducation}
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
      </GroupContainer>
    </div>
  )
}

const EmployeeEducationContent = () => {
  return (
    <EmployeeEducationProvider>
      <EmployeeListEducation />
    </EmployeeEducationProvider>
  )
}

export default EmployeeEducationContent
