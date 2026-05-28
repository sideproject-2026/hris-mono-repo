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
import OtherInformationProvider, {
  useOtherInformationContext,
} from '../other-information-provider'
import { formatDate } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Edit } from 'iconsax-reactjs'
import WorkExperienceDeleteButton from './work-experience-delete-button'

const EmployeeListWorkExperience = () => {
  const { getEmployeeInformation, employeeId } = useOtherInformationContext()

  const columns: ColumnDef<EmployeeWorkExperienceTypes>[] = [
    {
      accessorKey: 'company',
      header: 'COMPANY',
      cell: ({ row }) => {
        const company = row.original.companyName
        return <span className="text-sm uppercase">{company}</span>
      },
    },
    {
      accessorKey: 'address',
      header: 'ADDRESS',
      cell: ({ row }) => {
        const address = row.original.address
        return <span className="text-sm uppercase">{address}</span>
      },
    },
    {
      accessorKey: 'position',
      header: 'POSITION',
      cell: ({ row }) => {
        const position = row.original.jobTitle
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
            {formatDate(endDate, 'MMM dd, yyyy')}
          </span>
        )
      },
    },
    {
      accessorKey: 'reason',
      header: 'REASON FOR LEAVING',
      cell: ({ row }) => {
        const reasonForLeaving = row.original.reason
        return <span className="text-sm uppercase">{reasonForLeaving}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <EmployeeFormWorkExperience
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            />
            <WorkExperienceDeleteButton
              employeeId={employeeId}
              workExperienceId={row.original.id}
            />
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
    <OtherInformationProvider entityObjectType="workexperiences">
      <EmployeeListWorkExperience />
    </OtherInformationProvider>
  )
}

export default EmployeeWorkExperienceContent
