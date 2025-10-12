import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AllDriverApplications = lazy(
  () => import("@/pages/admin/AllDriverApplications")
);
const DriverManagement = lazy(() => import("@/pages/admin/DriverManagement"));

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
    ],
  },
];

export default adminSidebarItems;
