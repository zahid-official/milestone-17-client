import role from "@/constants/role";
import adminSidebarItems from "@/routes/admin/adminSidebar";
import driverSidebarItems from "@/routes/driver/driverSidebar";
import userSidebarItems from "@/routes/user/userSidebar";
import type { TRole } from "@/types";

const generateSidebar = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.DRIVER:
      return [...driverSidebarItems];
    case role.RIDER:
      return [...userSidebarItems];

    default:
      return [];
  }
};

export default generateSidebar;
