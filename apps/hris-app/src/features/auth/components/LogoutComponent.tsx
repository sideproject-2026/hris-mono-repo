import { useLogin } from '../hooks/useAuth'
import { Button } from '@hris/shared-ui'
import { Logout } from 'iconsax-reactjs'

const LogoutComponent = () => {
  const { handleLogout, isPending } = useLogin()

  return (
    <Button
      variant="ghost"
      className="text-md font-normal w-full justify-start"
      onClick={handleLogout}
      disabled={isPending}
    >
      <Logout size={20} variant="Bulk" />
      Logout
    </Button>
  )
}

export default LogoutComponent
