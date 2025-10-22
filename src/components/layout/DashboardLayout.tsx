import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSidebar from "../ui/app-sidebar";
import ToggleAvailability from "@/pages/driver/ToggleAvailability";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import role from "@/constants/role";

const DashboardLayout = () => {
  // RTK Query hook
  const { data } = useProfileInfoQuery(undefined);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          {data?.data?.role === role.DRIVER && <ToggleAvailability />}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
