import ChangePassword from "@/pages/user/ChangePassword";
import EmergencyContact from "@/pages/user/EmergencyContact";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const ActiveRide = lazy(() => import("@/pages/user/ActiveRide"));
const RideHistory = lazy(() => import("@/pages/user/RideHistory"));
const Profile = lazy(() => import("@/pages/user/Profile"));

const userSidebarItems: ISidebarItems[] = [
  // Ride Services
  {
    title: "Ride Services",
    items: [
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
      {
        title: "Emergency Contact",
        url: "/user/emergency-contact",
        component: EmergencyContact,
      },
    ],
  },
];

export default userSidebarItems;
