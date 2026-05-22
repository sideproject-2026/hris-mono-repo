import { Menu, MoreHorizontal, Pencil, PlusIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteWorkSchedule } from '../hooks/useWorkSchedule'
import WorkScheduleForm from './work-schedule-form'
import type { ColumnDef } from '@tanstack/react-table'

import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import PageContainer from '@/components/custom/containers/page-container'
import { useWorkScheduleContext } from './work-schedule-provider'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import { Separator } from '@/components/ui/separator'
import { TextCell } from '@/components/custom/grid/columns/column-type'

const WorkScheduleComponent = () => {
  const { workSchedules, isRefreshing } = useWorkScheduleContext()

  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState<WorkSchedule | null>(null)
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const columns: Array<ColumnDef<WorkSchedule>> = [
    {
      accessorKey: 'code',
      header: 'CODE',
      cell: ({ row }) => {
        const code = row.original.code
        return <TextCell className="uppercase">{code}</TextCell>
      },
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION',
      cell: ({ row }) => {
        const description = row.original.description
        return <TextCell className="uppercase">{description}</TextCell>
      },
    },
    {
      accessorKey: 'title',
      header: 'TITLE',
      cell: ({ row }) => {
        const title = row.original.title
        return <TextCell className="uppercase">{title}</TextCell>
      },
    },
    {
      header: 'ACTIONS',
      cell: ({ row }) => {
        const { handleDelete, isDeleting } = useDeleteWorkSchedule()
        const schedule = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  // Handle edit action
                  setEditData(schedule)
                  setMode('edit')
                  setOpenDialog(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Handle delete action
                  handleDelete(schedule.id)
                }}
                className="text-red-600"
              >
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
    <div className="px-3 flex-col w-full h-full">
      <HeaderContainer loading={isRefreshing}>
        <HeaderText title="Work Schedule" subtitle="Manage work schedules here">
          <HeaderBackButton to={'/'} />
        </HeaderText>
      </HeaderContainer>
      <PageContainer className="space-y-3" loading={isRefreshing}>
        <NavMenu>
          <Button
            variant={'ghost'}
            onClick={() => {
              setMode('create')
              setEditData(null)
              setOpenDialog(true)
            }}
            className="font-sans text-sm uppercase font-semibold"
          >
            <PlusIcon className="h-4 w-4" />
            Create Work Schedule
          </Button>
          <Separator orientation="vertical" />
        </NavMenu>
        <DGridProvider
          data={workSchedules}
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
      <WorkScheduleForm
        mode={mode}
        initialData={editData}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  )
}

export default WorkScheduleComponent
