import React, { useState } from "react";
import AuthNav from "./AuthNav";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginDetails } from "../utils/validations";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!validateLoginDetails) {
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-9/12 mds:w-7/12 md:6/12 border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-1/3 xxl:w-1/3 `}
      >
        <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
          Login
        </h4>
        <div className="w-full mt-8">
          <div className="w-full">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="eg: johndoe@example.com"
              className="w-full dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            />
          </div>
          <div className="w-full mt-8">
            <label className="text-gray-800 text-[14px] dark:text-white">
              Password
            </label>
            <div className="w-full flex justify-between px-4  items-center dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2 text-[14px] border border-gray-300 bg-transparent  spin-button-none rounded-xl">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-10/12   outline-none bg-transparent "
              />
              {showPassword ? (
                <VscEyeClosed
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[20px]"
                />
              ) : (
                <VscEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[20px]"
                />
              )}
            </div>
          </div>
          <Link to="/forgot-password">
            <h4 className="text-[13px] text-text_blue  mt-2 ">
              Forget Password
            </h4>
          </Link>
          <button
            onClick={handleLogin}
            disabled={!email || !password}
            className={`w-full h-[52px] rounded-[18px] mt-12 ${
              !email || !password
                ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            Login
          </button>
          <h4 className="dark:text-white text-center text-gray-800 mt-4 text-[12px] ">
            Don't have an account yet?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="text-text_blue cursor-pointer"
            >
              Sign up
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
