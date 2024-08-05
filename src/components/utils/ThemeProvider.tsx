import React from "react";
import { ToastContainer } from "react-toastify";
import { useUser } from "../../context/user-context";

const ThemeProvider = () => {
  const { theme } = useUser();

  return (
    <ToastContainer
      autoClose={2000}
      theme={theme}
      className="toast-container"
    />
  );
};

export default ThemeProvider;
