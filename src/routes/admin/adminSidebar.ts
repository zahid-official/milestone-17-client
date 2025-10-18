import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));

// adminSidebarItems
const adminSidebarItems: ISidebarItems[] = [
  // Admin Services
  {
    title: "Admin Services",
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
