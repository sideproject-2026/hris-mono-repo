import {
  CalendarTick,
  ElementEqual,
  Medal,
  TableDocument,
} from "iconsax-reactjs";

export const sidebarItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: ElementEqual,
  },
  {
    name: "Request Form",
    path: "/request-form",
    icon: TableDocument,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: CalendarTick,
  },
  {
    name: "E-Learning",
    path: "/employees",
    icon: Medal,
    disabled: true,
  },
];

export const WEB_LINKS = [
  {
    name: "CONFERENCE",
    description: "Reservation for Conference Rooms",
    url: "http://conf.crossworldmarine.com:1300/CWMSI_CONFERENCE/Account/Login.aspx",
  },
  {
    name: "VEHICLE",
    description: "Reservation for Vehicles",
    url: "http://veh.crossworldmarine.com:1301/CWMSI_VEHICLE/Account/Login.aspx",
  },
  {
    name: "QMS",
    description: "Quality Management System",
    url: "http://qms.crossworldmarine.com:1305/Account/login",
  },
  {
    name: "IT TICKETING",
    description: "IT Ticketing System for incident issues",
    url: "http://it-ticketing.cwmsi.com:83/login",
  },
  {
    name: "DOCUMENT MANAGEMENT",
    description: "Document Management System for operations and lapd",
    url: "http://dms.crossworldmarine.com:8095/signin",
  },
  {
    name: "EMAIL",
    description: "Wingumail for email communication",
    url: "https://crossworldmarine.wingumail.com/Account/Login",
  },
  {
    name: "3CX",
    description: "Web interface for 3CX softphone",
    url: "https://crossworld.3cx.asia/",
  },
];
