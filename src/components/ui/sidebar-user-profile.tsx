import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { TRole, UpdateProfileResponse } from "@/types";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";

type SidebarUserProfileProps = {
  userInfo?: UpdateProfileResponse | null;
  onLogout?: () => void;
  isLoggingOut?: boolean;
  isLoading?: boolean;
};

const rolePaths: Record<TRole, string> = {
  ADMIN: "/admin",
  DRIVER: "/driver",
  RIDER: "/user",
};

const SidebarUserProfile = ({
  userInfo,
  onLogout,
  isLoggingOut = false,
  isLoading = false,
}: SidebarUserProfileProps) => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const displayName = userInfo?.name || "Logged User";
  const displayEmail = userInfo?.email || "N/A";
  const displayAvatar = userInfo?.picture;
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "LU";
  const rolePath = rolePaths[userInfo?.role as TRole] ?? "/user";

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-4 rounded-md" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={displayAvatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="rounded-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{displayEmail}</span>
                {userInfo?.role ? (
                  <span className="truncate text-[10px] uppercase text-muted-foreground">
                    {userInfo.role}
                  </span>
                ) : null}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={displayAvatar}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="rounded-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs pb-0.5">
                    {displayEmail}
                  </span>
                  {userInfo?.role ? (
                    <span className="truncate text-[10px] uppercase text-muted-foreground">
                      {userInfo.role}
                    </span>
                  ) : null}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => navigate(`${rolePath}/profile`)}
              >
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => navigate(`${rolePath}/chanege-password`)}
              >
                <Settings />
                Change Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              disabled={isLoggingOut}
              onSelect={() => onLogout?.()}
            >
              <LogOut />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarUserProfile;
