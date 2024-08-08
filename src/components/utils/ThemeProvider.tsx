import React from "react";
import { ToastContainer } from "react-toastify";
import { useUser } from "../../context/user-context";

const ThemeProvider = () => {
  const { theme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return "dark";
    } else if (theme === "light") {
      return "light";
    } else if (theme === "system") {
      return darkQuery.matches ? "dark" : "light";
    }
    return "dark"; // fallback in case of an unexpected value
  };

  return (
    <ToastContainer
      autoClose={2000}
      theme={getThemeBasedImage()}
      className="toast-container"
    />
  );
};

export default ThemeProvider;
