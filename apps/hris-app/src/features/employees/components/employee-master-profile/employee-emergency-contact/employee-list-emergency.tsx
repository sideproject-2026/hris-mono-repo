import { NavMenu } from '@/components/custom/misc/NavMenu'
import EmployeeFormEmergency from './employee-form-emergency'
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
import { Button } from '@/components/ui/button'
import { Edit } from 'iconsax-reactjs'
import EmergencyDeleteButton from './emergency-delete-button'

const EmployeeListEmergency = () => {
  const { getEmployeeInformation, employeeId } = useOtherInformationContext()

  const columns: ColumnDef<EmployeeEmergencyContactTypes>[] = [
    {
      accessorKey: 'relation',
      header: 'RELATION',
      cell: ({ row }) => {
        const relation = row.original.relation
        return <span className="text-sm uppercase">{relation}</span>
      },
    },
    {
      accessorKey: 'contactPerson',
      header: 'CONTACT PERSON',
      cell: ({ row }) => {
        const contactPerson = row.original.contactPerson
        return <span className="text-sm uppercase">{contactPerson}</span>
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
      accessorKey: 'telNo',
      header: 'TEL NO',
      cell: ({ row }) => {
        const telNo = row.original.telNo
        return <span className="text-sm uppercase">{telNo}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <EmployeeFormEmergency
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            />
            <EmergencyDeleteButton
              employeeId={employeeId}
              emergencyId={row.original.id}
            />
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
    <OtherInformationProvider entityObjectType="emergencycontacts">
      <EmployeeListEmergency />
    </OtherInformationProvider>
  )
}

export default EmployeeEmergencyContactContent
