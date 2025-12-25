import Logo from "@/components/layout/Logo";
import DriverRegisterForm from "@/components/modules/authentication/DriverRegisterForm";
import RiderRegisterForm from "@/components/modules/authentication/RiderRegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import role from "@/constants/role";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import { Link, Navigate } from "react-router";

const Register = () => {
  const { data, isLoading, isFetching } = useProfileInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dashboardByRole = {
    [role.ADMIN]: "/admin",
    [role.DRIVER]: "/driver",
    [role.RIDER]: "/user",
  } as const;

  const userRole = data?.data?.role;
  const destination =
    userRole && dashboardByRole[userRole as keyof typeof dashboardByRole];

  if (!isLoading && !isFetching && destination) {
    return <Navigate to={destination} replace />;
  }

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Banner */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/register.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 py-10 px-6 md:px-10 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="w-40 flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center pb-6">
              <h1 className="text-2xl font-bold">Register new account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your details below to create new account
              </p>
            </div>

            <Tabs defaultValue="rider">
              {/* Tabs list */}
              <TabsList className="w-full max-w-xs mx-auto mb-3">
                <TabsTrigger value="rider" className="cursor-pointer">
                  Join as Rider
                </TabsTrigger>
                <TabsTrigger value="driver" className="cursor-pointer">
                  Become a Driver
                </TabsTrigger>
              </TabsList>

              {/* Rider tab content */}
              <TabsContent value="rider" className="max-w-xs w-full mx-auto">
                <RiderRegisterForm />
              </TabsContent>

              {/* Driver tab content */}
              <TabsContent value="driver" className="max-w-lg w-full mx-auto">
                <DriverRegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
