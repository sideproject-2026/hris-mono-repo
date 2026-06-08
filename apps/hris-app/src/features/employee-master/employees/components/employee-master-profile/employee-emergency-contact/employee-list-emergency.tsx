import {
  NavMenu,
  GroupContainer,
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'
import EmployeeFormEmergency from './employee-form-emergency'
import type { ColumnDef } from '@tanstack/react-table'

import OtherInformationProvider, { useOtherInformationContext } from '../providers/other-info-provider'
import type { EmergencyContactResponse } from '../../../types/model'

const EmployeeListEmergency = () => {
  const { getEmployeeInformation, employeeId } = useOtherInformationContext()

  const columns: ColumnDef<EmergencyContactResponse>[] = [
    {
      accessorKey: 'relationship',
      header: 'RELATION',
      cell: ({ row }) => {
        const relation = row.original.relationship
        return <span className="text-sm uppercase">{relation}</span>
      },
    },
    {
      accessorKey: 'name',
      header: 'CONTACT PERSON',
      cell: ({ row }) => {
        const contactPerson = row.original.name
        return <span className="text-sm uppercase">{contactPerson}</span>
      },
    },
    {
      accessorKey: 'phoneNumber',
      header: 'TEL NO',
      cell: ({ row }) => {
        const telNo = row.original.phoneNumber
        return <span className="text-sm uppercase">{telNo}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {/* <EmployeeFormEmergency
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            /> */}
            {/* <EmergencyDeleteButton
              employeeId={employeeId}
              emergencyId={row.original.id}
            /> */}
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <NavMenu>
        <EmployeeFormEmergency />
      </NavMenu>
      <GroupContainer title="Employee Emergency Contacts List">
        <DGridProvider
          data={getEmployeeInformation?.emergencyContacts ?? []}
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

const EmployeeEmergencyContactContent = () => {
  return (
    <OtherInformationProvider entityObjectType="contact">
      <EmployeeListEmergency />
    </OtherInformationProvider>
  )
}

export default EmployeeEmergencyContactContent
