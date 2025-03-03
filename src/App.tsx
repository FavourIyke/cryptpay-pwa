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
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";
import SettingsPage from "./pages/settings/SettingsPage";
import PrivateRoute from "./components/utils/PrivateRoute";
import VerifyLogin from "./components/VerifyLogin";
import Kyc from "./components/Kyc";
import VerifyReset from "./components/VerifyReset";
import CacheBuster from "react-cache-buster";
import packageFiles from "../package.json";
import Loading from "./Loading";
import Wallet from "./pages/wallet/Wallet";
import History from "./pages/history/History";

function App() {
  return (
    <CacheBuster
      currentVersion={packageFiles.version}
      isEnabled={true} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
      metaFileDirectory={"."} //If public assets are hosted somewhere other than root on your server.
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify-mail" element={<VerifyMail />} />
        <Route path="/verify-login" element={<VerifyLogin />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/" element={<Redirect to="/login" />} />
        <Route
          path="/kyc"
          element={
            <PrivateRoute>
              <Kyc />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
      </Routes>
    </CacheBuster>
  );
}

export default App;
