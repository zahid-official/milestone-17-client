import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Earnings = lazy(() => import("@/pages/driver/Earnings"));

const driverSidebarItems: ISidebarItems[] = [
  // Dashboard
  {
    title: "Driver Earnings History",
    items: [
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: Earnings,
      },
    ],
  },
];

export default driverSidebarItems;
