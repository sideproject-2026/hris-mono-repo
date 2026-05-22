import EmployeeAddressesProvider, {
  useEmployeeAddressesContext,
} from './employee-addresses-provider'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'iconsax-reactjs'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import GroupContainer from '@/components/custom/containers/group-container'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import EmployeeFormAddresses from './employee-form-addresses'
import { useState } from 'react'
import AddressDeleteButton from './address-delete-button'

const EmployeeAddressesList = () => {
  const { employeeAddresses, employeeId } = useEmployeeAddressesContext()
  const columns: ColumnDef<EmployeeAddressesTypes>[] = [
    {
      accessorKey: 'type',
      header: 'ADDRESS TYPE',
      cell: ({ row }) => {
        const type = row.original.type
        return <span className="text-sm uppercase">{type}</span>
      },
    },
    {
      accessorKey: 'street',
      header: 'STREET',
      cell: ({ row }) => {
        const street = row.original.street
        return <span className="text-sm uppercase">{street}</span>
      },
    },
    {
      accessorKey: 'region',
      header: 'REGION',
      cell: ({ row }) => {
        const region = row.original.region
        return <span className="text-sm uppercase">{region}</span>
      },
    },
    {
      accessorKey: 'province',
      header: 'PROVINCE',
      cell: ({ row }) => {
        const province = row.original.province
        return <span className="text-sm uppercase">{province}</span>
      },
    },
    {
      accessorKey: 'municipality',
      header: 'MUNICIPALITY',
      cell: ({ row }) => {
        const municipality = row.original.municipality
        return <span className="text-sm uppercase">{municipality}</span>
      },
    },
    {
      accessorKey: 'zipCode',
      header: 'ZIP CODE',
      cell: ({ row }) => {
        const zipCode = row.original.zipCode
        return <span className="text-sm uppercase">{zipCode}</span>
      },
    },
    {
      accessorKey: 'country',
      header: 'COUNTRY',
      cell: ({ row }) => {
        const country = row.original.country
        return <span className="text-sm uppercase">{country}</span>
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <EmployeeFormAddresses
              initialValues={row.original}
              trigger={
                <Button variant="ghost" size="icon">
                  <Edit size={18} variant={'Bold'} />
                </Button>
              }
            />
            <AddressDeleteButton
              employeeId={employeeId}
              addressId={row.original.id}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <NavMenu>
        <EmployeeFormAddresses />
      </NavMenu>
      <GroupContainer title="Employee Addresses List">
        <DGridProvider
          data={employeeAddresses ?? []}
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

const EmployeeAddressesContent = () => {
  return (
    <EmployeeAddressesProvider>
      <EmployeeAddressesList />
    </EmployeeAddressesProvider>
  )
}

export default EmployeeAddressesContent
