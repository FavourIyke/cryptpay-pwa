import React, { createContext, useContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

import { ContextValueType, PropsType } from "../types/index";

export const AuthContext = createContext<ContextValueType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsType> = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(["cryptpay-token"]);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("cryptpay-token");
    setToken(token);
  }, []);

  const authenticate = async (token: string) => {
    try {
      setCookie("cryptpay-token", token);
      setToken(token);
      return Promise.resolve("");
    } catch (error) {
      removeCookie("cryptpay-token");
      return Promise.reject(error);
    }
  };

  const logout = () => {
    removeCookie("cryptpay-token");
    setToken("none");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
