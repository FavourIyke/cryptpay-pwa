import React from "react";
import { logo } from "../assets/images";
import { paddingX } from "../constants";

const AuthNav = () => {
  return (
    <div
      className={`${paddingX} w-full font-sora py-6  flex justify-center items-center`}
    >
      <img src={logo} alt="" />
    </div>
  );
};

export default AuthNav;
