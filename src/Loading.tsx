import React from "react";
import { logo } from "./assets/images";

const Loading = () => {
  return (
    <div className="fixed inset-0  flex font-sora justify-center items-center  bg-white dark:bg-black dark:bg-opacity-80  bg-opacity-70 backdrop-blur-sm">
      <img src={logo} alt="" />
    </div>
  );
};

export default Loading;
