import { useSuspenseQuery } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, PlusIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { policiesQueryOptions } from '../hooks/useAttendancePolicy'
import AttendancePolicyForm from './attendance-policy-form'

import type { ColumnDef } from '@tanstack/table-core'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  SwitchCell,
  TextCell,
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
  PageContainer,
  NavMenu,
  Separator,
} from '@hris/shared-ui'


const AttendancePolicyComponent = () => {
  const policyQuery = useSuspenseQuery(policiesQueryOptions())
  const data = policyQuery.data
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [initialData, setInitialData] = useState<AttendancePolicy | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const columns: Array<ColumnDef<AttendancePolicy>> = [
    {
      accessorKey: 'name',
      header: 'NAME',
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION',
    },
    {
      accessorKey: 'halfdayThreshold',
      header: () => {
        return <TextCell alignment="center">HALFDAY THRESHOLD</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">
            {row.original.halfdayThreshold}
          </TextCell>
        )
      },
    },
    {
      accessorKey: 'absenceThreshold',
      header: () => {
        return <TextCell alignment="center">ABSENCE THRESHOLD</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">
            {row.original.absenceThreshold}
          </TextCell>
        )
      },
    },
    {
      accessorKey: 'lateThresholdMinutes',
      header: () => {
        return <TextCell alignment="center">LATE THRESHOLD</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">
            {row.original.lateThresholdMinutes}
          </TextCell>
        )
      },
    },
    {
      accessorKey: 'undertimeThresholdMinutes',
      header: () => {
        return <TextCell alignment="center">UNDERTIME THRESHOLD</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">
            {row.original.undertimeThresholdMinutes}
          </TextCell>
        )
      },
    },
    {
      accessorKey: 'overTimeLimit',
      header: () => {
        return <TextCell alignment="center">REG. OT LIMIT</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">{row.original.overTimeLimit}</TextCell>
        )
      },
    },
    {
      accessorKey: 'holidayOTLimit',
      header: () => {
        return <TextCell alignment="center">HOLIDAY OT LIMIT</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">{row.original.holidayOTLimit}</TextCell>
        )
      },
    },
    {
      accessorKey: 'specialOTLimit',
      header: () => {
        return <TextCell alignment="center">SPECIAL OT LIMIT</TextCell>
      },
      cell: ({ row }) => {
        return (
          <TextCell alignment="center">{row.original.specialOTLimit}</TextCell>
        )
      },
    },
    {
      accessorKey: 'isActive',
      header: () => {
        return <TextCell alignment="center">ACTIVE</TextCell>
      },
      cell: ({ row }) => {
        const policy = row.original
        return <SwitchCell value={policy.isActive} />
      },
    },
    {
      header: 'ACTIONS',
      cell: ({ row }) => {
        const policy = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setInitialData(policy)
                  setMode('edit')
                  setOpenDialog(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { }} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex-col w-full h-full">
      <HeaderContainer>
        <HeaderText
          title="Attendance Policy"
          subtitle="Manage attendance policies here"
        >
          <HeaderBackButton to={'/'} />
        </HeaderText>
      </HeaderContainer>
      <PageContainer className="space-y-3" loading={false}>
        <NavMenu>
          <Button
            variant={'ghost'}
            onClick={() => {
              setMode('create')
              setInitialData(null)
              setOpenDialog(true)
            }}
            className="font-sans text-sm uppercase font-semibold"
          >
            <PlusIcon className="size-4" />
            Create Policy
          </Button>
          <Separator orientation="vertical" />
        </NavMenu>
        <DGridProvider
          data={data.data}
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
      </PageContainer>
      <AttendancePolicyForm
        mode={mode}
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={initialData}
      />
    </div>
  )
}

export default AttendancePolicyComponent
