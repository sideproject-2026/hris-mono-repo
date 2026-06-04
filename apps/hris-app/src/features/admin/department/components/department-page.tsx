import { PageContainer } from '@hris/shared-ui'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import { StackCol } from '@hris/shared-ui'
import { NavMenu } from '@hris/shared-ui'
import DepartmentForm from './department-form'
import { Separator } from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import { RefreshCcw } from 'lucide-react'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@hris/shared-ui'

const DepartmentPage = () => {
  return (
    <StackCol className="w-full h-full">
      <HeaderContainer>
        <HeaderText
          title="Department"
          subtitle="You can add or edit your department information to this feature"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false} className="space-y-4">
        <NavMenu>
          <DepartmentForm />
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
          columns={[]}
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

export default DepartmentPage
