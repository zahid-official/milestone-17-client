import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/dashboard/Analytics"));


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
];

export default adminSidebarItems;
