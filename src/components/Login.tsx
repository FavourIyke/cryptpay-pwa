import React from "react";
import { logo } from "../assets/images";

const Login = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center p-8 dark:bg-primary_dark font-sora">
        <img src={logo} alt="" />
        <h4 className="dark:text-white font-bold text-[24px]">CRYPTPAY</h4>
      </div>
    </div>
  );
};

export default Login;
