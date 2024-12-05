import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { validateCreatePassword } from "../utils/validations";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordC, setPasswordC] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const axiosInstance = useAuthAxios();

  const handleSignIn = async ({
    email,
    username,
    referral_code,
    password,
  }: any) => {
    const response = await axiosInstance.post(API.signup, {
      email,
      username,
      referral_code,
      password,
    });
    return response.data;
  };

  const completeSignIn = useMutation({
    mutationFn: handleSignIn,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        navigate("/verify-mail", {
          state: {
            email: info.email,
          },
        });
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });

  const createAccount = () => {
    if (!validateCreatePassword(password, passwordC)) {
      return;
    }

    const data: { [key: string]: any } = {
      username: info.username,
      email: info.email,
      password: password,
    };

    // Handle referral code logic
    if (info.referralCode?.trim()) {
      // If `referralCode` is not empty after trimming
      data.referral_code = info.referralCode.trim();
    } else if (info.referrer?.trim()) {
      // If `referralCode` is empty but `referrer` exists
      data.referral_code = info.referrer.trim();
    } else {
      // Explicitly set to null if neither exists
      data.referral_code = null;
    }

    // console.log(data);
    completeSignIn.mutate(data);
  };
  const upperCaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#_$%^&*(),.?":{}|<>]/;
  return (
    <div
      className={` w-full font-sora h-screen pb-16 overflow-auto bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030]  border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12   `}
      >
        <Link to="/sign-up" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Create Password
        </h4>
        <div className="mt-4 w-full">
          <div className="w-full">
            <label className="text-gray-800 text-[14px]  dark:text-white">
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
                className="   outline-none focus:border-text_blue dark:focus:border-text_blue active:bg-transparent w-10/12 bg-transparent "
              />
              {showPassword ? (
                <VscEyeClosed
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[16px]"
                />
              ) : (
                <VscEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[16px]"
                />
              )}
            </div>
          </div>
          <div className="w-full mt-6">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              Confirm Password
            </label>
            <div
              className={`w-full flex justify-between px-4 items-center dark:text-white text-gray-800 dark:border-gray-400 
      bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2 text-[14px] border spin-button-none rounded-xl
      ${
        passwordC
          ? "border-text_blue dark:border-text_blue" // Border color when input is not empty
          : "border-gray-300" // Reset to default border color when input is empty
      }`}
            >
              <input
                type={showCPassword ? "text" : "password"}
                value={passwordC}
                onChange={(e) => setPasswordC(e.target.value)}
                placeholder="Enter Password"
                className="   outline-none focus:border-text_blue dark:focus:border-text_blue  w-10/12 bg-transparent "
              />
              {showCPassword ? (
                <VscEyeClosed
                  onClick={() => setShowCPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[16px]"
                />
              ) : (
                <VscEye
                  onClick={() => setShowCPassword((prev) => !prev)}
                  className="text-gray-800 dark:text-white cursor-pointer text-[16px]"
                />
              )}
            </div>
          </div>
          <div className="w-full m-4">
            <h4 className="text-gray-800 text-[12px]  dark:text-white uppercase">
              Password musT contain at least
            </h4>
            <div
              className={`w-full flex items-center ${
                password.length >= 8 ? "text-[#5FC381]" : "text-[#555962]"
              }  mt-2 justify-start gap-3`}
            >
              <HiOutlineCheckCircle className=" text-[20px]" />
              <h4 className=" capitalize text-[13px] ">8 characters</h4>
            </div>
            <div
              className={`w-full flex items-center ${
                upperCaseRegex.test(password)
                  ? "text-[#5FC381]"
                  : "text-[#555962]"
              }  mt-2 justify-start gap-3`}
            >
              <HiOutlineCheckCircle className=" text-[20px]" />
              <h4 className=" capitalize text-[13px] ">One Uppercase Letter</h4>
            </div>
            <div
              className={`w-full flex items-center ${
                specialCharRegex.test(password)
                  ? "text-[#5FC381]"
                  : "text-[#555962]"
              }  mt-2 justify-start gap-3`}
            >
              <HiOutlineCheckCircle className=" text-[20px]" />
              <h4 className=" capitalize text-[13px] ">
                One Special Character e.g !^@*#(
              </h4>
            </div>
          </div>
          <button
            onClick={createAccount}
            disabled={!password || !passwordC || completeSignIn.isPending}
            className={`w-full h-[52px] rounded-[18px] mt-12 ${
              !password || !passwordC
                ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            {completeSignIn.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
