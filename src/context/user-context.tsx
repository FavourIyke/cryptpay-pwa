import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextValueType, PropsType } from "../types/index";

export const UserContext = createContext<ContextValueType>({});
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<PropsType> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") || "system"
  );
  const [userCurrency, setUserCurrency] = useState<string>("NGN");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
