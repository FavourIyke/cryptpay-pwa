import React, { useEffect, useState } from "react";
import AuthNav from "./AuthNav";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateLoginDetails } from "../utils/validations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/auth-context";

const Login = () => {
  const { token, authenticate } = useAuth();
  const location = useLocation();
  const { state } = location;
  const { from = "/dashboard" } = state || {};
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const axiosInstance = useAuthAxios();

  useEffect(() => {
    if (token && token !== "none") {
      navigate(from);
    }
  }, [token]);
  const handleSignIn = async ({ email, password }: any) => {
    const response = await axiosInstance.post(API.login, {
      email,
      password,
    });
    return response.data;
  };

  const completeLogin = useMutation({
    mutationFn: handleSignIn,
    onSuccess: (r) => {
      toast.success(r.message);

      setTimeout(() => {
        if (r.data.email_auth) {
          navigate("/verify-login", {
            state: {
              email: email,
            },
          });
        } else {
          authenticate(r.data.token);
          navigate("/dashboard");
        }
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const handleLogin = () => {
    if (!validateLoginDetails) {
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    completeLogin.mutate(data);
  };

  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12   `}
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
              className={
                email
                  ? "w-full dark:text-white border-text_blue text-gray-800   bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border  bg-transparent px-4 spin-button-none rounded-xl "
                  : "w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
              }
            />
          </div>
          <div className="w-full mt-8">
            <label className="text-gray-800 text-[14px] dark:text-white">
              Password
            </label>
            <div
              className={`w-full flex justify-between px-4 items-center dark:text-white text-gray-800 dark:border-gray-400 
      bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2 text-[14px] border spin-button-none rounded-xl
      ${
        password
          ? "border-text_blue dark:border-text_blue" // Border color when input is not empty
          : "border-gray-300" // Reset to default border color when input is empty
      }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-10/12  outline-none bg-transparent "
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
            <h4 className="text-[14px] text-text_blue  mt-2 ">
              Forget Password
            </h4>
          </Link>
          <button
            onClick={handleLogin}
            disabled={!email || !password || completeLogin.isPending}
            className={`w-full h-[52px] rounded-[18px] mt-12 ${
              !email || !password
                ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            {completeLogin.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              "Login"
            )}
          </button>
          <h4 className="dark:text-white text-center text-gray-800 mt-4 text-[14px] ">
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
