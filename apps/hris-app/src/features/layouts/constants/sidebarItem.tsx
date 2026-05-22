import {
  BagTick,
  Briefcase,
  Building4,
  Buildings2,
  Calendar,
  Calendar1,
  CalendarAdd,
  CalendarSearch,
  CalendarTick,
  ChartSquare,
  Key,
  Location,
  NoteText,
  People,
  UserOctagon,
} from 'iconsax-reactjs'
import { ROUTE } from '@/types/router'

export const sidebarItems = [
  {
    title: 'Attendance',
    icon: <Calendar variant="Bold" size={'18px'} color="#FFFFFF" />,
    type: 'multiple',
    disabled: false,
    subitems: [
      {
        title: 'Attendance',
        href: ROUTE.ATTENDANCE_PERIOD_ROUTE,
        subItemIcon: (
          <CalendarTick variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Employee Setup',
        href: ROUTE.EMPLOYEE_SETUP_ROUTE,
        subItemIcon: (
          <CalendarSearch variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Form Request',
        href: ROUTE.FORM_REQUEST_ROUTE,
        subItemIcon: (
          <NoteText variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Work Schedule',
        href: ROUTE.WORKSCHEDULE_ROUTE,
        subItemIcon: (
          <Calendar1 variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Calendar',
        href: ROUTE.CALENDAR_ROUTE,
        subItemIcon: (
          <CalendarAdd variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Policy',
        href: ROUTE.ATTENDANCE_POLICY_ROUTE,
        subItemIcon: <People variant={'Bold'} size={'18px'} color="#004663" />,
      },
      {
        separator: true,
      },
      {
        title: 'Reports',
        href: ROUTE.ATTENDANCE_REPORTS_ROUTE,
        subItemIcon: (
          <ChartSquare variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
    ],
  },
]

export const adminSidebarSubMenus = [
  {
    title: 'Admin Settings',
    icon: <Calendar variant="Bold" size={'18px'} color="#FFFFFF" />,
    type: 'multiple',
    disabled: false,
    subitems: [
      {
        title: 'User Management',
        href: ROUTE.ADMIN_USERS_SETTINGS,
        subItemIcon: (
          <UserOctagon variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'User Roles',
        href: ROUTE.ADMIN_USER_ROLES_SETTINGS,
        subItemIcon: <Key variant={'Bold'} size={'18px'} color="#004663" />,
      },
      {
        title: 'Branch',
        href: ROUTE.ADMIN_BRANCH_SETTINGS,
        subItemIcon: (
          <Buildings2 variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Company',
        href: ROUTE.ADMIN_COMPANY_SETTINGS,
        subItemIcon: (
          <Building4 variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Department',
        href: ROUTE.ADMIN_DEPARTMENT_SETTINGS,
        subItemIcon: (
          <Location variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
      {
        title: 'Designation',
        href: ROUTE.ADMIN_DESIGNATION_SETTINGS,
        subItemIcon: (
          <Briefcase variant={'Bold'} size={'18px'} color="#004663" />
        ),
      },
    ],
  },
]
