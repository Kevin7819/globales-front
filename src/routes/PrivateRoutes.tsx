import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import Dashboard from "../pages/dashboard/page";
import ProfilePage from "../pages/profile/page";
import TravelGuides from "../pages/TravelGuides/page";
import Trips from "../pages/TripManagement/page";
import Layout from "../components/layout/Layout";
import { getAuthUser, clearAuthData } from "../services/AuthApi";

function PrivateRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getAuthUser();
    if (!user) {
      clearAuthData();
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Layout>
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="travel-guides"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
              <TravelGuides />
            </ProtectedRoute>
          }
        />


        <Route
          path="trips"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
              <Trips />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default PrivateRoutes;
