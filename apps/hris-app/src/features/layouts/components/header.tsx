import { useAuthContext } from '../../auth/components/AuthProvider'
import UserProfile from './user-profile'

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full fixed z-50 bg-white min-h-20 border-b border-gray-200/50 transition-all duration-300">
      <div className="flex flex-row items-center gap-2 pl-6">
        <img
          src="/img/logo.png"
          className="w-[150px] object-contain hover:scale-105 transition-transform duration-200"
          alt="Company Logo"
        />
      </div>
      <div className="flex items-center gap-6 pr-8">
        <UserProfile />
      </div>
    </header>
  )
}

export default Header
