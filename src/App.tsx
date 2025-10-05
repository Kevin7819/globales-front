import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Location,
} from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./pages/dashboard/page";
import Login from "./pages/auth/login/page";
import Register from "./pages/auth/register/page";
import ProfilePage from "./pages/profile/page";
import Trips from "./pages/TripManagement/Trip/page";
import TripDetails from "./pages/TripManagement/TripDetails/page";
import NewTrip from "./pages/TripManagement/NewTrip/page";
import Modal from "./components/modal";
import "./App.css";

// Componente que maneja rutas y modales
function AppRoutes() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      {/* Layout principal con rutas normales */}
      <Layout>
        <Routes location={state?.background || location}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/trips/new" element={<NewTrip />} />
        </Routes>
      </Layout>

      {/* Rutas de modales (solo se muestran si hay background) */}
      {state?.background && (
        <Routes>
          <Route
            path="/trips/:id"
            element={
              <Modal isOpen={true} onClose={() => window.history.back()}>
                <TripDetails />
              </Modal>
            }
          />
          <Route
            path="/trips/new"
            element={
              <Modal isOpen={true} onClose={() => window.history.back()}>
                <NewTrip />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

// Componente principal
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;