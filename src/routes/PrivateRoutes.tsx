import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import Dashboard from "../pages/dashboard/page";
import ProfilePage from "../pages/profile/page";
import Trips from "../pages/TripManagement/Trip/page";
import TripDetails from "../pages/TripManagement/TripDetails/page";
import NewTrip from "../pages/TripManagement/NewTrip/page";
import Layout from "../layout";
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
          path="trips"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Passenger"]}>
              <Trips />
            </ProtectedRoute>
          }
        />

        <Route path="trips/:id" element={<TripDetails />} />
        <Route path="trips/new" element={<NewTrip />} />
      </Routes>
    </Layout>
  );
}

export default PrivateRoutes;
