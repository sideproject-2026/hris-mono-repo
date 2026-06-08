import { NavMenu } from '@/components/custom/misc/NavMenu'
import EmployeeFormWorkExperience from './employee-form-work-experience'
import GroupContainer from '@/components/custom/containers/group-container'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'

import type { ColumnDef } from '@tanstack/react-table'

import { formatDate } from 'date-fns'
import OtherInformationProvider, { useOtherInformationContext } from '../providers/other-info-provider'
import type { WorkExperienceResponse } from '../../../types/model'

const EmployeeListWorkExperience = () => {
  const { getEmployeeInformation, employeeId } = useOtherInformationContext()

  const columns: ColumnDef<WorkExperienceResponse>[] = [
    {
      accessorKey: 'company',
      header: 'COMPANY',
      cell: ({ row }) => {
        const company = row.original.company
        return <span className="text-sm uppercase">{company}</span>
      },
    },
    {
      accessorKey: 'position',
      header: 'POSITION',
      cell: ({ row }) => {
        const position = row.original.position
        return <span className="text-sm uppercase">{position}</span>
      },
    },
    {
      accessorKey: 'startDate',
      header: 'START DATE',
      cell: ({ row }) => {
        const startDate = row.original.startDate
        return (
          <span className="text-sm uppercase">
            {formatDate(startDate, 'MMM dd, yyyy')}
          </span>
        )
      },
    },
    {
      accessorKey: 'endDate',
      header: 'END DATE',
      cell: ({ row }) => {
        const endDate = row.original.endDate
        return (
          <span className="text-sm uppercase">
            {endDate}
          </span>
        )
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {/* <EmployeeFormWorkExperience
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            /> */}
            {/* <WorkExperienceDeleteButton
              employeeId={employeeId}
              workExperienceId={row.original.id}
            /> */}
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <NavMenu>
        <EmployeeFormWorkExperience />
      </NavMenu>
      <GroupContainer title="Employee Work Experience List">
        <DGridProvider
          data={getEmployeeInformation?.workExperiences ?? []}
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

const EmployeeWorkExperienceContent = () => {
  return (
    <OtherInformationProvider entityObjectType="workExperience">
      <EmployeeListWorkExperience />
    </OtherInformationProvider>
  )
}

export default EmployeeWorkExperienceContent
