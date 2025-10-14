import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import role from "@/constants/role";
import About from "@/pages/public/About";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";
import Unauthorized from "@/pages/public/Unauthorized";
import Verify from "@/pages/public/Verify";
import generateRoutes from "@/utils/generateRoutes";
import withAuth from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import adminSidebarItems from "./admin/adminSidebar";
import driverSidebarItems from "./driver/driverSidebar";
import userSidebarItems from "./user/userSidebar";
import RideDetails from "@/components/modules/user/rideHistory/RideDetails";
import Contact from "@/pages/public/Contact";

const Router = createBrowserRouter([
  // Common layout
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  // Admin dashboard
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, [role.ADMIN]),
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  // Driver dashboard
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, [role.DRIVER]),
    children: [
      { index: true, element: <Navigate to={"/driver/earnings"} /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  // User dashboard
  {
    path: "/user",
    Component: withAuth(DashboardLayout, [role.RIDER]),
    children: [
      { index: true, element: <Navigate to={"/user/ride-request"} /> },
      ...generateRoutes(userSidebarItems),

      {
        path: "ride/:id",
        Component: RideDetails,
      },
    ],
  },

  // Auth
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "verify",
    Component: Verify,
  },

  // Handle errors
  {
    path: "unauthorized",
    Component: Unauthorized,
  },
  {
    path: "contact",
    Component: Contact,
  },
]);

export default Router;
