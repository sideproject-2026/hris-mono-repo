import { PageContainer } from '@hris/shared-ui'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import { StackCol } from '@hris/shared-ui'
import { NavMenu } from '@hris/shared-ui'
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
import CompanyForm from './company-form'

const CompanyPage = () => {
  const columns: ColumnDef<CompanyTypes>[] = [
    {
      accessorKey: 'companyCode',
      header: 'COMPANY CODE',
    },
    {
      accessorKey: 'companyName',
      header: 'COMPANY NAME',
    },
    {
      accessorKey: 'companyAddress',
      header: 'COMPANY ADDRESS',
    },
    {
      accessorKey: 'companyStatus',
      header: 'STATUS',
    },
  ]

  return (
    <StackCol className="w-full h-full">
      <HeaderContainer>
        <HeaderText
          title="Company"
          subtitle="You can add or edit your company information to this feature"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-4">
        <NavMenu>
          <CompanyForm />
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

export default CompanyPage
