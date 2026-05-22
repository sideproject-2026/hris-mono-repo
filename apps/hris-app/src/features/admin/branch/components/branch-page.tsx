import PageContainer from '@/components/custom/containers/page-container'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { StackCol } from '@/components/custom/layouts'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import BranchForm from './branch-form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'

const BranchPage = () => {
  const columns: ColumnDef<BranchTypes>[] = [
    {
      accessorKey: 'branchCode',
      header: 'BRANCH CODE',
    },
    {
      accessorKey: 'branchName',
      header: 'BRANCH NAME',
    },
    {
      accessorKey: 'branchAddress',
      header: 'BRANCH ADDRESS',
    },
    {
      accessorKey: 'branchStatus',
      header: 'BRANCH STATUS',
    },
  ]

  return (
    <StackCol className="w-full h-full">
      <HeaderContainer>
        <HeaderText
          title="Branch"
          subtitle="You can add or edit your branch information to this feature"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-4">
        <NavMenu>
          <BranchForm />
          <Separator orientation="vertical" />
          <Button
            variant={'ghost'}
            className="font-sans text-sm uppercase font-semibold"
          >
            <RefreshCcw className="size-4" />
            Refresh
          </Button>
        </NavMenu>
        <DGridProvider
          data={[]}
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
    </StackCol>
  )
}

export default BranchPage
