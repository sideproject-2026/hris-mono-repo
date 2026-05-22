import { useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import RequestForm from "@/features/forms/components/request-form";
import { sidebarItems } from "../constants/sidebarItems";

const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <SidebarContent className="px-2 py-20 bg-white">
      <SidebarGroup>
        <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold mb-3 mt-2">
          Main Menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1.5">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              if (item.name === "Request Form") {
                return (
                  <SidebarMenuItem key={item.name}>
                    <RequestForm />
                  </SidebarMenuItem>
                );
              }

              if (item.disabled) {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      disabled
                      className="flex items-center gap-3 px-3 h-10 text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed group/item"
                    >
                      {Icon && (
                        <Icon
                          variant="Bulk"
                          className="size-6 shrink-0 opacity-70"
                        />
                      )}
                      <span className="font-medium text-sm">{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={item.name}>
                  <Link to={item.path} className="outline-none w-full block">
                    <SidebarMenuButton
                      isActive={isActive}
                      className={`flex items-center gap-3 px-3 h-10 transition-all duration-300 rounded-lg w-full group/item ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold shadow-xs border border-primary/10"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white border border-transparent"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          variant="Bulk"
                          className={`size-6 shrink-0 transition-colors duration-300 ${
                            isActive
                              ? "text-primary"
                              : "text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200"
                          }`}
                        />
                      )}

                      <span className="font-semibold text-sm font-sans">
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      className="bg-white dark:bg-slate-900 transition-all duration-300 shadow-sm border-none"
    >
      <SidebarNavigation />
    </Sidebar>
  );
}
