import AuthorizationComponent from '@/components/auth/authorization-component'
import UserManagementPage from '@/features/admin/user-management/components/user-management-page'
import UserManagementProvider from '@/features/admin/user-management/components/user-management-provider'

import { ADMIN_ROLE } from '@/types/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/user-management')({
  component: () => {
    return (
      <AuthorizationComponent roles={[ADMIN_ROLE]}>
        <UserManagementProvider>
          <UserManagementPage />
        </UserManagementProvider>
      </AuthorizationComponent>
    )
  },
})
