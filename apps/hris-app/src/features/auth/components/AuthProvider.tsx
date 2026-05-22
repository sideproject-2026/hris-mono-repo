import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  type FC,
} from 'react'
import { CROSSWORLD_IMAGE_URL } from '../../layouts/types/constant'
import { useProfileQuery } from '../hooks/useAuth'
import { LoaderIcon } from 'lucide-react'
import Loader from '@/components/custom/loader/loader'
import { LocalStorageAuth } from '@/lib/stores/useAuthStore'

type AuthContextType = {
  userProfile?: UserType | null
  getPhotoUrl?: () => string
  isAuthorized?: (requiredRoles: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = LocalStorageAuth.get()
  const accessToken = auth?.accessToken || ''
  const { data: user } = useProfileQuery({ accessToken })

  const getPhotoUrl = useCallback(() => {
    return user?.photo ? `${CROSSWORLD_IMAGE_URL}/${user?.photo}` : ''
  }, [user])

  const isAuthorized = useCallback(
    (requiredRoles: string[]) => {
      if (!user) return false
      return requiredRoles.some((role) => user.roles.includes(role))
    },
    [user],
  )

  const contextValue: AuthContextType = {
    userProfile: user,
    getPhotoUrl,
    isAuthorized,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </AuthContext.Provider>
  )
}
