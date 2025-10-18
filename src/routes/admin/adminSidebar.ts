import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));

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
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement,
      },
    ],
  },
];

export default adminSidebarItems;
