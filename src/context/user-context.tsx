import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextValueType, PropsType } from "../types/index";
import useAuthAxios from "../utils/baseAxios";
import { API } from "../constants/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorMessage } from "../utils/errorMessage";
import { useAuth } from "./auth-context";

export const UserContext = createContext<ContextValueType>({});
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<PropsType> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") || "system"
  );
  const { token } = useAuth();
  const [userCurrency, setUserCurrency] = useState<string>("NGN");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;
  const axiosInstance = useAuthAxios();

  const getUserDetails = async () => {
    const response = await axiosInstance.get(API.getUserDetails);
    return response.data;
  };

  const {
    data: userDetails,
    error: error1,
    refetch,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
    enabled: false,
    retry: 1,
  });

  useEffect(() => {
    if (error1) {
      const newError = error1 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1]);

  const getPrefrences = async () => {
    const response = await axiosInstance.get(API.userPreferences);
    return response.data.data;
  };
  const {
    data: userPreferences,
    error: error2,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["user-preferences"],
    queryFn: getPrefrences,
    enabled: false,
    retry: 1,
  });

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  useEffect(() => {
    if (token && token !== "none") {
      refetch();
      refetch2();
    }
  }, [token]);

  const applyTheme = (theme: string | null) => {
    if (theme === "dark") {
      element.classList.add("dark");
      updateMetaTags("dark");
    } else if (theme === "light") {
      element.classList.remove("dark");
      updateMetaTags("light");
    } else if (theme === "system") {
      if (darkQuery.matches) {
        element.classList.add("dark");
        updateMetaTags("dark");
      } else {
        element.classList.remove("dark");
        updateMetaTags("light");
      }
    }
  };

  const updateMetaTags = (theme: string) => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        theme === "dark" ? "#0D0D0D" : "#FFFFFF"
      );
    }
  };

  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      darkQuery.addEventListener("change", () => applyTheme("system"));
    }

    return () => {
      darkQuery.removeEventListener("change", () => applyTheme("system"));
    };
  }, [theme, darkQuery]);

  useEffect(() => {
    if (theme !== "system") {
      localStorage.setItem("theme", theme as string);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
        userCurrency,
        setUserCurrency,
        userDetails,
        userPreferences,
        refetch2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
