import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileButton from "./components/profile-button";
import Weblinks from "./components/weblinks";

const Header = () => {
  return (
    <header className="w-full fixed top-0 z-50 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" />
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col leading-tight hidden sm:flex">
            <span className="font-bold font-sans text-lg text-slate-900 dark:text-white tracking-tight">
              Crossworld Marine Services, Inc.
            </span>
            <span className="text-xs font-sans uppercase tracking-widest text-primary font-semibold">
              Employee Portal
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ProfileButton />
        <Weblinks />
      </div>
    </header>
  );
};

export default Header;
