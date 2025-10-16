import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login/page";
import Register from "../pages/auth/register/page";
import Home from "../pages/Home/page";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default PublicRoutes;
