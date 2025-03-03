import React, { createContext, useContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

import { ContextValueType, PropsType } from "../types/index";

export const AuthContext = createContext<ContextValueType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsType> = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(["celler-token"]);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("celler-token");
    setToken(token);
  }, []);

  const authenticate = async (token: string) => {
    try {
      setCookie("celler-token", token);
      setToken(token);
      return Promise.resolve("");
    } catch (error) {
      removeCookie("celler-token");
      return Promise.reject(error);
    }
  };

  const logout = () => {
    removeCookie("celler-token");
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
