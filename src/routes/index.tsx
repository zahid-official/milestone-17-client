import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RideDetails from "@/components/modules/user/rideHistory/RideDetails";
import role from "@/constants/role";
import Login from "@/pages/public/auth/Login";
import Register from "@/pages/public/auth/Register";
import Verify from "@/pages/public/auth/Verify";
import Contact from "@/pages/public/error/Contact";
import Error from "@/pages/public/error/Error";
import NotFound from "@/pages/public/error/NotFound";
import Unauthorized from "@/pages/public/error/Unauthorized";
import About from "@/pages/public/navbar/About";
import Blog from "@/pages/public/navbar/Blog";
import BlogDetails from "@/pages/public/navbar/BlogDetails";
import BookRide from "@/pages/public/navbar/BookRide";
import ContactUs from "@/pages/public/navbar/ContactUs";
import FAQ from "@/pages/public/navbar/FAQ";
import Features from "@/pages/public/navbar/Features";
import Home from "@/pages/public/navbar/Home";
import OfferDetails from "@/pages/public/navbar/OfferDetails";
import CoreListingDetails from "@/pages/public/navbar/CoreListingDetails";
import generateRoutes from "@/utils/generateRoutes";
import withAuth from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import adminSidebarItems from "./admin/adminSidebar";
import driverSidebarItems from "./driver/driverSidebar";
import userSidebarItems from "./user/userSidebar";

const Router = createBrowserRouter([
  // Common layout
  {
    path: "/",
    Component: App,
    // If any error occurs while resolving this route (or its children), show Error
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "book-ride",
        Component: BookRide,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "blogs",
        Component: Blog,
      },
      {
        path: "blogs/:slug",
        Component: BlogDetails,
      },
      {
        path: "offers/:slug",
        Component: OfferDetails,
      },
      {
        path: "listings/:slug",
        Component: CoreListingDetails,
      },
    ],
  },

  // Admin dashboard
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, [role.ADMIN]),
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
      {
        path: "ride/:id",
        Component: RideDetails,
      },
    ],
  },

  // Driver dashboard
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, [role.DRIVER]),
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to={"/driver/earnings"} /> },
      ...generateRoutes(driverSidebarItems),
      {
        path: "ride/:id",
        Component: RideDetails,
      },
    ],
  },

  // User dashboard
  {
    path: "/user",
    Component: withAuth(DashboardLayout, [role.RIDER]),
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to={"/user/active-ride"} /> },
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
    errorElement: <Error />,
  },
  {
    path: "contact",
    Component: Contact,
    errorElement: <Error />,
  },

  // Catch-all: render Error for any unmatched route (404)
  {
    path: "*",
    Component: NotFound,
  },
]);

export default Router;
