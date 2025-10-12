import AllDriverApplications from "@/pages/admin/AllDriverApplications";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));

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
    ],
  },
];

export default adminSidebarItems;
