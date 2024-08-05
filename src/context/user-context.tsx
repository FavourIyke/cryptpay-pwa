import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextValueType, PropsType } from "../types/index";
export const UserContext = createContext<ContextValueType>({});
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<PropsType> = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : null
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

  useEffect(() => {
    const updateTheme = () => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && darkQuery.matches)
      ) {
        setTheme("dark");
        element.classList.add("dark");
        updateMetaTags("dark");
      } else {
        setTheme("light");
        element.classList.remove("dark");
        updateMetaTags("light");
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

    updateTheme();
    darkQuery.addEventListener("change", (e) => {
      if (!("theme" in localStorage)) {
        if (e.matches) {
          setTheme("dark");
          updateMetaTags("dark");
        } else {
          setTheme("light");
          updateMetaTags("light");
        }
      }
    });

    return () => {
      darkQuery.removeEventListener("change", updateTheme);
    };
  }, [darkQuery, element.classList]);
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        theme === "dark" ? "#0D0D0D" : "#FFFFFF"
      );
    }
  }, [theme]);

  useEffect(() => {
    switch (theme) {
      case "dark":
        setTheme("dark");
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        setTheme("light");
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");

        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });
  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
