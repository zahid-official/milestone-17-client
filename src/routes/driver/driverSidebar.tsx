import ChangePassword from "@/pages/user/ChangePassword";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const IncomingRequests = lazy(() => import("@/pages/driver/IncomingRequests"));
const CurrentRide = lazy(() => import("@/pages/driver/CurrentRide"));
const Earnings = lazy(() => import("@/pages/driver/Earnings"));
const Profile = lazy(() => import("@/pages/user/Profile"));

const driverSidebarItems: ISidebarItems[] = [
  // Driver Services
  {
    title: "Driver Services",
    items: [
      {
        title: "Incoming Requests",
        url: "/driver/incoming-requests",
        component: IncomingRequests,
      },
      {
        title: "Current Ride",
        url: "/driver/current-ride",
        component: CurrentRide,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: Earnings,
      },
    ],
  },

  // Profile Management
  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        component: Profile,
      },
      {
        title: "Security",
        url: "/driver/chanege-password",
        component: ChangePassword,
      },
    ],
  },
];

export default driverSidebarItems;
