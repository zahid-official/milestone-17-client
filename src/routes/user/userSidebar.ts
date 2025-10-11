import ActiveRide from "@/pages/user/ActiveRide";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Profile = lazy(() => import("@/pages/user/Profile"));
const RideRequest = lazy(() => import("@/pages/user/RideRequest"));
const RideHistory = lazy(() => import("@/pages/user/RideHistory"));

const userSidebarItems: ISidebarItems[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
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
];

export default userSidebarItems;
