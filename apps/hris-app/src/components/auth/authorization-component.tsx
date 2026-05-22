import React from 'react'
import ForbidenAccess from '../custom/misc/ForbidenAccess'
import { useAuthContext } from '@/features/auth/components/AuthProvider'

const AuthorizationComponent = ({
  children,
  roles,
}: {
  children: React.ReactNode
  roles: string[]
}) => {
  //check authorization here if the user role is admin if not redirect to forbidden page
  const { isAuthorized } = useAuthContext()

  if (!isAuthorized?.(roles)) {
    return <ForbidenAccess className="h-full" />
  }

  return <>{children}</>
}

export default AuthorizationComponent
