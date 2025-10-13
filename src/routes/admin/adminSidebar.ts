import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AllDriverApplications = lazy(
  () => import("@/pages/admin/AllDriverApplications")
);
const DriverManagement = lazy(() => import("@/pages/admin/DriverManagement"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));

// adminSidebarItems
const adminSidebarItems: ISidebarItems[] = [
  // Dashboard
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },

  // Data Management
  {
    title: "Data Management",
    items: [
      {
        title: "Driver Applications",
        url: "/admin/driver-applications",
        component: AllDriverApplications,
      },
      {
        title: "Driver Management",
        url: "/admin/driver-management",
        component: DriverManagement,
      },
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement,
      },
    ],
  },
];

export default adminSidebarItems;
