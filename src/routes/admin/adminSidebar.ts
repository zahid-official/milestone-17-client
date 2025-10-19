import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const RideOversight = lazy(() => import("@/pages/admin/RideOversight"));

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
      {
        title: "Ride Oversight",
        url: "/admin/ride-oversight",
        component: RideOversight,
      },
    ],
  },
];

export default adminSidebarItems;
