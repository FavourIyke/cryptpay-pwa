/* eslint-disable no-param-reassign */
import React from "react";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./auth-context";
import { UserProvider } from "./user-context";
interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </CookiesProvider>
  );
};

export default AppProviders;
