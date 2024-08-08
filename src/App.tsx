import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Redirect from "./components/utils/Redirect";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/transactions/Transactions";
import Signup from "./components/Signup";
import VerifyMail from "./components/VerifyMail";
import CreatePassword from "./components/CreatePassword";
import ForgotPassword from "./components/ForgotPassword";
import VerifyResetMail from "./components/VerifyResetMail";
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";
import SettingsPage from "./pages/settings/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/verify-mail" element={<VerifyMail />} />
      <Route path="/create-password" element={<CreatePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />
      <Route path="/verify-mail-change" element={<VerifyResetMail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
