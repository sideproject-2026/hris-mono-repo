import { useAuthContext } from '../../auth/components/AuthProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@hris/shared-ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@hris/shared-ui'
import LogoutComponent from '@/features/auth/components/LogoutComponent'
import UserManagementResetPassword from '@/features/admin/user-management/components/user-management-reset-password'
import { Separator } from '@hris/shared-ui'

const UserProfile = () => {
  const { userProfile, getPhotoUrl } = useAuthContext()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group focus:outline-none transition-all duration-200">
        <div className="flex items-center gap-3 p-1.5 px-3 rounded-full hover:bg-gray-100/80 transition-colors cursor-pointer border border-transparent hover:border-gray-200/50">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <AvatarImage src={getPhotoUrl?.() ?? ''} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {userProfile?.firstName.split(' ')[0]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold font-poppins leading-none text-slate-700">
              {userProfile?.firstName} {userProfile?.lastName}
            </span>
            <span className="text-[11px] font-poppins text-gray-500 font-medium tracking-wide">
              {userProfile?.department}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="flex flex-col gap-2 justify-start items-start">
          <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
          <Separator />
          <UserManagementResetPassword
            userName={userProfile?.userName ?? ''}
            fullname={userProfile?.firstName + ' ' + userProfile?.lastName}
          />
          <LogoutComponent />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
