import isJwtExpired from "../constants/isJwtExpired";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

import { ContextValueType, PropsType } from "../types/index";

export const AuthContext = createContext<ContextValueType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsType> = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token || isJwtExpired(token)) {
      logout();
    } else {
      setToken(token);
    }
  }, []);

  const authenticate = async (token: string) => {
    try {
      setCookie("token", token);
      setToken(token);
      return Promise.resolve("");
    } catch (error) {
      removeCookie("token");
      return Promise.reject(error);
    }
  };
  const logout = () => {
    removeCookie("token");
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
