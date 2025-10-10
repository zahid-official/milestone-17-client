import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Profile = lazy(() => import("@/pages/user/Profile"));
const RideRequest = lazy(() => import("@/pages/user/RideRequest"));
const Bookings = lazy(() => import("@/pages/user/Bookings"));

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
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];

export default userSidebarItems;
