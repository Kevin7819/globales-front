import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Dashboard from "./pages/dashboard/page";
import Trips from "./pages/TripManagement/page";
import Profile from "./pages/profile/page";
import TravelGuides from "./pages/TravelGuides/page";
import NotificationProvider from "./components/Notification/NotificationProvider";

function App() {
  return (
    
      <NotificationProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rutas privadas (requieren login) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/travel-guides" element={<TravelGuides/>}/>
        </Route>
      </Routes>
      </NotificationProvider>
  );
}

export default App;
