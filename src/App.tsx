import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Redirect from "./components/utils/Redirect";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/transactions/Transactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
