import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/lib/stores/useAuthStore'

const ProtectedOutlet = () => {
  const { getAuth } = useAuthStore()
  const auth = getAuth()

  if (!auth.isAuthenticated && !auth.accessToken) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedOutlet
