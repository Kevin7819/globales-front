import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthUser } from "../services/AuthApi";

type AppRole = "Admin" | "Passenger";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: AppRole[];
  redirectPath?: string;
}

const isAppRole = (role: any): role is AppRole => {
  return ["Admin", "Passenger"].includes(role);
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const user = getAuthUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role;
  if (!isAppRole(userRole) || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
