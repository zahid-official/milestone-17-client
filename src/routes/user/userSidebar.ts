import ChangePassword from "@/pages/user/ChangePassword";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const RideRequest = lazy(() => import("@/pages/user/RideRequest"));
const ActiveRide = lazy(() => import("@/pages/user/ActiveRide"));
const RideHistory = lazy(() => import("@/pages/user/RideHistory"));
const Profile = lazy(() => import("@/pages/user/Profile"));

const userSidebarItems: ISidebarItems[] = [
  // Ride Services
  {
    title: "Ride Services",
    items: [
      {
        title: "Ride Request",
        url: "/user/ride-request",
        component: RideRequest,
      },
      {
        title: "Active Ride",
        url: "/user/active-ride",
        component: ActiveRide,
      },
      {
        title: "Ride History",
        url: "/user/history",
        component: RideHistory,
      },
    ],
  },

  // Profile Management
  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
      {
        title: "Security",
        url: "/user/chanege-password",
        component: ChangePassword,
      },
    ],
  },
];

export default userSidebarItems;
