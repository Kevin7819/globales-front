import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Rutas privadas (requieren login) */}
      <Route path="/gestion/*" element={<PrivateRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
