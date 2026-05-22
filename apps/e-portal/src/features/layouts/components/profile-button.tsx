import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useNavigate } from "@tanstack/react-router";
import { Logout, UserOctagon } from "iconsax-reactjs";
import { ChevronDown } from "lucide-react";

import { useUserContext } from "@/features/auth/provider/user-provider";
import { useAuthContext } from "@cwmsi/auth-package";

const ProfileButton = () => {
  
  const {profile,getPhotoUrl} = useUserContext();
  const {clearAuth} = useAuthContext();
  
  const navigate = useNavigate();
  const profilePhoto = getPhotoUrl?.();
  
  const handleProfileClick = () => {
    navigate({ to: "/profile" });
  };

  const handleLogout = () => {
    clearAuth?.();
    navigate({ to: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 w-fit px-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
              <AvatarImage
                src={profilePhoto}
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {profile?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-0.5 hidden sm:flex">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                {profile?.firstName} {profile?.lastName}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                {profile?.designation}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="flex gap-3 items-center p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" 
            onClick={handleProfileClick}
            disabled={true}
          >
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              <UserOctagon size={20} variant="Bulk" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">My Profile</span>
              <span className="text-[10px] text-slate-400">View your details</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            className="flex gap-3 items-center p-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group mt-1"
            onClick={handleLogout}
          >
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-md group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
              <Logout size={20} variant="Bulk" className="text-red-600 dark:text-red-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">Logout</span>
              <span className="text-[10px] text-red-400">Sign out of session</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;

