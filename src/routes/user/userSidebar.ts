import ActiveRide from "@/pages/user/ActiveRide";
import ChangePassword from "@/pages/user/ChangePassword";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Profile = lazy(() => import("@/pages/user/Profile"));
const RideRequest = lazy(() => import("@/pages/user/RideRequest"));
const RideHistory = lazy(() => import("@/pages/user/RideHistory"));

const userSidebarItems: ISidebarItems[] = [
  {
    title: "Ride Services",
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
