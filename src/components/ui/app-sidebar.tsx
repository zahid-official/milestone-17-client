/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useProfileInfoQuery, userApi } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hooks";
import generateSidebar from "@/utils/generateSidebar";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Logo from "../layout/Logo";
import SidebarUserProfile from "./sidebar-user-profile";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  // RTK Query mutation hook
  const { data, isLoading: isProfileLoading } = useProfileInfoQuery(undefined);
  const userRole = data?.data?.role;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const result = await logout(null).unwrap();
      dispatch(userApi.util.resetApiState());
      toast.success(result.message || "Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong!");
    }
  };

  // Nav items based on user role
  const navItems = {
    navMain: generateSidebar(userRole),
  };

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <div className="pt-4.5">
          <Link className="w-full flex justify-center items-center" to="/">
            <Logo />
          </Link>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
        <SidebarGroupLabel>Return to</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/">Back to Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    {/* User info */}
      <SidebarFooter>
        <SidebarUserProfile
          userInfo={data?.data}
          onLogout={handleLogout}
          isLoggingOut={isLogoutLoading}
          isLoading={isProfileLoading}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
