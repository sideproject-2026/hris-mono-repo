import { PageContainer } from '@hris/shared-ui'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import { StackCol } from '@hris/shared-ui'
import { NavMenu } from '@hris/shared-ui'
import BranchForm from './branch-form'
import { Separator } from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import { RefreshCcw } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'

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
