import React from "react";
import { Toaster } from "react-hot-toast";
import { useUser } from "../../context/user-context";

const ThemeProvider = () => {
  // const { theme } = useUser();
  // const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // const getThemeBasedImage = () => {
  //   if (theme === "dark") {
  //     return "dark";
  //   } else if (theme === "light") {
  //     return "light";
  //   } else if (theme === "system") {
  //     return darkQuery.matches ? "dark" : "light";
  //   }
  //   return "dark"; // fallback in case of an unexpected value
  // };

  return (
    <Toaster
      position="top-right"
      gutter={4}
      toastOptions={{
        duration: 3000,
        success: {
          iconTheme: {
            primary: "#0F29C4",
            secondary: "#ffffff",
          },
          style: {
            color: "#0F29C4",
            backgroundColor: "#E9F4FF",
            fontSize: "14px",
            fontWeight: "600",
          },
        },
        error: {
          iconTheme: {
            primary: "#CB1A14",
            secondary: "#ffffff",
          },
          style: {
            color: "#CB1A14",
            backgroundColor: "#FBEAE9",
            fontSize: "14px",
            fontWeight: "600",
          },
        },
      }}
    />
  );
};

export default ThemeProvider;
