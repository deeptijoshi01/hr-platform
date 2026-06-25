import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeProfile from "../pages/EmployeeProfile";
import Attendance from "../pages/Attendance";
import Recruitment from "../pages/Recruitment";
import Interviews from "../pages/Interviews";
import Payroll from "../pages/Payroll";
import Performance from "../pages/Performance";
import Onboarding from "../pages/Onboarding";
import Settings from "../pages/Settings";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<EmployeeProfile />} />

      <Route path="/attendance" element={<Attendance />} />
      <Route path="/recruitment" element={<Recruitment />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;