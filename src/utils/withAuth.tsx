import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

const withAuth = (Component: ComponentType, requiredRole?: TRole[]) => {
  const AuthWrapper = () => {
    // RTK Query mutation hook
    const { data, isLoading, isFetching } = useProfileInfoQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

    const email = data?.data?.email;
    const userRole = data?.data?.role;

    // check is user logged in
    if (!isLoading && !isFetching && !email) {
      return <Navigate to={"/login"} />;
    }

    // check is user role matches the required role
    if (
      !isLoading &&
      !isFetching &&
      requiredRole &&
      !requiredRole.includes(userRole)
    ) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };

  return AuthWrapper;
};

export default withAuth;
