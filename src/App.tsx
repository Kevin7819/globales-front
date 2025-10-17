import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Dashboard from "./pages/dashboard/page";
import Trips from "./pages/TripManagement/Trip/page";
import TripDetails from "./pages/TripManagement/TripDetails/page";
import NewTrip from "./pages/TripManagement/NewTrip/page";
import Profile from "./pages/profile/page";

function App() {
  return (
    
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rutas privadas (requieren login) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/trips/new" element={<NewTrip />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    
  );
}

export default App;
