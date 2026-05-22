import { Link, useRouterState } from '@tanstack/react-router'
import { CogIcon } from 'lucide-react'
import { sidebarItems, adminSidebarSubMenus } from '../constants/sidebarItem' // Assuming this is exported from a constants file
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, ChartCircle, People } from 'iconsax-reactjs'
import { ROUTE } from '@/types/router'

interface AppSidebarSubMenusProps {
  isOpen: boolean
  onClose: () => void
  subitems: Array<{
    title: string
    href: string
    subItemIcon?: React.ReactNode
    separator?: boolean
  }>
  menuTitle: string
}

import { motion, AnimatePresence } from 'framer-motion'

const AppSideBarSubMenu = ({
  isOpen,
  onClose,
  subitems,
  menuTitle,
  icon,
}: AppSidebarSubMenusProps & { icon?: React.ReactNode }) => {
  const routerState = useRouterState()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -250, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-20 top-20 h-[calc(100vh-80px)] z-50 w-64 bg-white border-r border-gray-100 shadow-[20px_0_40px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="text-primary font-normal uppercase font-sans text-md tracking-tight flex gap-1 items-center">
                {icon || <Calendar variant="Bold" color="#004663" size={18} />}
                {menuTitle}
              </div>
              <Button
                variant="ghost"
                onClick={onClose}
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm transition-all"
              >
                <ArrowLeft
                  variant="Linear"
                  size={18}
                  className="text-primary"
                />
              </Button>
            </div>

            <div className="flex-1 overflow-hidden py-4 px-2 custom-scrollbar -mt-3">
              <SidebarMenu className="gap-1">
                {subitems.map((subitem, idx) => {
                  const isActive =
                    routerState.location.pathname === subitem.href
                  const isSeparator = subitem.separator || false

                  if (isSeparator) {
                    return (
                      <SidebarSeparator
                        key={`sep-${idx}`}
                        className="my-3 mx-3 bg-gray-100/80"
                      />
                    )
                  }

                  return (
                    <SidebarMenuItem key={subitem.href}>
                      <SidebarMenuButton
                        asChild
                        className={`h-11 rounded-lg px-3 transition-all duration-200 group relative ${
                          isActive
                            ? 'bg-primary/5 text-primary font-semibold'
                            : 'text-slate-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        <Link
                          to={subitem.href}
                          onClick={() => onClose()}
                          className="flex items-center gap-3 w-full"
                        >
                          <span
                            className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                              isActive
                                ? 'text-primary'
                                : 'text-slate-400 group-hover:text-primary'
                            }`}
                          >
                            {subitem.subItemIcon}
                          </span>
                          <span className="text-[13px] font-sans truncate">
                            {subitem.title}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeSubItem"
                              className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const AppSideBar = () => {
  const routerState = useRouterState()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [selectedSubitems, setSelectedSubitems] = useState([])
  const [selectedMenuTitle, setSelectedMenuTitle] = useState('')
  const [selectedSubMenuIcon, setSelectedSubMenuIcon] =
    useState<React.ReactNode>(null)

  const handleItemClick = (item: any) => {
    if (item.type === 'multiple' && item.subitems && item.subitems.length > 0) {
      setSelectedSubitems(item.subitems)
      setSelectedMenuTitle(item.title)
      setSelectedSubMenuIcon(item.icon)
      setIsSubMenuOpen(true)
    }
  }

  const closeSubMenu = () => {
    setIsSubMenuOpen(false)
  }

  const isItemActive = (item: any) => {
    if (item.type === 'multiple' && item.subitems) {
      return item.subitems.some(
        (subitem) => routerState.location.pathname === subitem.href,
      )
    }
    return routerState.location.pathname === item.href
  }

  const menuButtons = [
    {
      title: 'Dashboard',
      icon: <ChartCircle variant="Bold" size={'22px'} color="#FFFFFF" />,
      href: ROUTE.DASHBOARD_ROUTE,
      type: 'single',
    },
    {
      title: 'Employee',
      icon: <People variant="Bold" size={'22px'} color="#FFFFFF" />,
      href: ROUTE.EMPLOYEE_ROUTE,
      type: 'single',
    },
    ...sidebarItems,
  ]

  return (
    <div className="flex relative h-full">
      <Sidebar
        collapsible="icon"
        variant="sidebar"
        className="bg-primary border-r-0 z-50 transition-all duration-300"
      >
        <SidebarContent className="mt-20 px-2 flex flex-col gap-2">
          <SidebarMenu className="gap-3">
            {menuButtons.map((item) => {
              const isActive = isItemActive(item)
              const isDisabled = (item as any).disabled || false

              return (
                <SidebarMenuItem key={item.title}>
                  {item.type === 'multiple' ? (
                    <SidebarMenuButton
                      disabled={isDisabled}
                      variant="default"
                      className={`w-[70px] h-fit cursor-pointer flex flex-col items-center justify-center transition-all duration-200 gap-1.5 rounded-none rounded-l-md ${
                        isActive
                          ? 'border-r-4 border-[#bd7e00] scale-[0.98]'
                          : 'hover:bg-white/10'
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex flex-col gap-1 items-center">
                        <span
                          className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-white text-center text-[10px] font-sans font-semibold tracking-tight uppercase opacity-90">
                          {item.title}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={`w-[70px] h-fit cursor-pointer hover:bg-white/10! flex flex-col items-center justify-center transition-all duration-200 gap-1.5 rounded-none rounded-l-md ${
                        isActive
                          ? 'border-r-4 border-[#bd7e00] scale-[0.98]'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <Link
                        to={(item as any).href || '#'}
                        onClick={closeSubMenu}
                      >
                        <div className="flex flex-col gap-1 items-center">
                          <span
                            className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-white text-center text-[10px] font-sans font-semibold tracking-tight uppercase opacity-90">
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-white/5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="default"
                onClick={() => handleItemClick(adminSidebarSubMenus[0])}
                className={`w-[70px] h-fit cursor-pointer hover:bg-white/10! flex flex-col items-center justify-center transition-all duration-200 gap-1.5 rounded-none rounded-l-md ${
                  isSubMenuOpen && selectedMenuTitle === 'Admin Settings'
                    ? 'border-r-4 border-[#bd7e00] scale-[0.98]'
                    : 'hover:bg-white/10!'
                }`}
              >
                <div className="flex flex-col gap-1 items-center">
                  <CogIcon className="w-5 h-5 text-white" />
                  <span className="text-white text-center text-[10px] font-sans font-semibold uppercase opacity-90">
                    Admin
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AppSideBarSubMenu
        isOpen={isSubMenuOpen}
        onClose={closeSubMenu}
        subitems={selectedSubitems}
        menuTitle={selectedMenuTitle}
        icon={selectedSubMenuIcon}
      />
    </div>
  )
}

export default AppSideBar
