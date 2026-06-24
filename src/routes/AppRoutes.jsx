import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;