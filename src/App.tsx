import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Location } from "react-router-dom";

import Layout from "./layout";
import Home from "./home/page";
import Dashboard from "./pages/dashboard/page";
import Login from "./pages/auth/login/page";
import Register from "./pages/auth/register/page";
import Trips from "./pages/TripManagement/Trip/page";
import TripDetails from "./pages/TripManagement/TripDetails/page";
import NewTrip from "./pages/TripManagement/NewTrip/page";
import Modal from "./components/modal";
import './App.css';

// 👇 Componente para manejar rutas y modales
function AppRoutes() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      {/* Layout principal con rutas normales */}
      <Layout>
        <Routes location={state?.background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/trips/new" element={<NewTrip />} />
        </Routes>
      </Layout>

      {/* Rutas de modales, se renderizan solo si hay un background */}
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

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
