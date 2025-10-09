import RideRequest from "@/pages/user/RideRequest";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Bookings = lazy(() => import("@/pages/user/Bookings"));

const userSidebarItems: ISidebarItems[] = [
  {
    title: "User Dashboard",
    items: [
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
