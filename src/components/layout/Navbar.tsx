/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import role from "@/constants/role";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useProfileInfoQuery, userApi } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hooks";
import { motion } from "motion/react";
import { Link } from "react-router";
import { toast } from "sonner";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/book-ride", label: "Book Ride", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/blogs", label: "Blogs", role: "PUBLIC" },
  { href: "/faq", label: "FAQs", role: "PUBLIC" },
  { href: "/contact-us", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/driver", label: "Dashboard", role: role.DRIVER },
  { href: "/user", label: "Dashboard", role: role.RIDER },
];

const Navbar = () => {
  // RTK Query mutation hook
  const { data } = useProfileInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const email = data?.data?.email;
  const userRole = data?.data?.role;
  const visibleLinks = navigationLinks.filter(
    (link) => link.role === "PUBLIC" || link.role === userRole
  );

  // Handle logout
  const handleLogout = async () => {
    try {
      const result = await logout(null).unwrap();
      // reset api state
      dispatch(userApi.util.resetApiState());
      toast.success(result.message || "Logged out successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <motion.header
      className="border-b container mx-auto py-3"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-16 items-center justify-between sm:gap-4">
        {/* Left side */}
        <motion.div
          className="flex items-center sm:gap-2"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.08,
          }}
        >
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <div className="w-40">
              <Link to="/" className="text-primary hover:text-primary/90">
                <Logo />
              </Link>
            </div>

            {/* Navigation menu */}
            <NavigationMenu className="max-lg:hidden">
              <NavigationMenuList className="gap-2">
                {visibleLinks.map((link) => (
                  <NavigationMenuItem key={`${link.href}-${link.label}`}>
                    <NavigationMenuLink
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      asChild
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </motion.div>

        {/* Right side */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.16,
          }}
        >
          {email ? (
            <Button onClick={handleLogout} className="text-sm">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="text-sm">Login</Button>
            </Link>
          )}

          {/* Theme mode */}
          <ThemeToggler />

          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group lg:hidden" variant="outline" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            {/* Mobile menu */}
            <PopoverContent align="end" className="w-44 p-1 mt-0.5 lg:hidden">
              <nav className="flex flex-col">
                {visibleLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    to={link.href}
                    className="w-full rounded-md px-3 py-2 text-center text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
