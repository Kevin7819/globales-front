import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./pages/dashboard/page";
import Login from "./pages/auth/login/page";
import Register from "./pages/auth/register/page";
import ProfilePage from "./pages/profile/page";
import './App.css'



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profilePage" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
