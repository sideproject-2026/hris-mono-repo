import PageContainer from '@/components/custom/containers/page-container'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { StackCol } from '@/components/custom/layouts'
import { NavMenu } from '@/components/custom/misc/NavMenu'
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
