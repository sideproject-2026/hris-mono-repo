import {
  NavMenu,
  GroupContainer,
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'
import EmployeeFormEducation from './employee-form-education'

import type { ColumnDef } from '@tanstack/react-table'

import OtherInformationProvider, { useOtherInformationContext } from '../providers/other-info-provider'
import type { EmployeeEducationResponse } from '../../../types/model'

const EmployeeListEducation = () => {
  const { getEmployeeInformation, employeeId } = useOtherInformationContext()

  const columns: ColumnDef<EmployeeEducationResponse>[] = [
    {
      accessorKey: 'level',
      header: 'LEVEL',
      cell: ({ row }) => {
        const level = row.original.level.strCode
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
      accessorKey: 'degree',
      header: 'COURSE',
      cell: ({ row }) => {
        const course = row.original.degree
        return <span className="text-sm uppercase">{course}</span>
      },
    },
    {
      header: 'YEAR FROM - TO',
      cell: ({ row }) => {
        return (
          <span className="text-sm uppercase">
            {row.original.startYear} - {row.original.graduationYear}
          </span>
        )
      },
    },
    {
      accessorKey: 'honors',
      header: 'AWARDS',
      cell: ({ row }) => {
        const awards = row.original.honors
        return <span className="text-sm uppercase">{awards}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {/* <EmployeeFormEducation
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
            /> */}
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
          data={getEmployeeInformation?.educations ?? []}
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
    <OtherInformationProvider entityObjectType="education">
      <EmployeeListEducation />
    </OtherInformationProvider>
  )
}

export default EmployeeEducationContent
