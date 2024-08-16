import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import { toast } from "react-toastify";
import useAuthAxios from "../utils/baseAxios";
import { API } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const axiosInstance = useAuthAxios();
  const validateEmail = (mail: string) => {
    if (!mail) {
      toast("Kindly tell us your mail", { type: "error" });
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(mail)) {
      toast("Your email is not in the correct format", { type: "error" });
      return false;
    }

    return true;
  };
  const handleForgotPassword = async ({ email }: any) => {
    const response = await axiosInstance.post(API.forgotPassword, {
      email,
    });
    return response.data;
  };
  const completeForgotP = useMutation({
    mutationFn: handleForgotPassword,
    onSuccess: (r) => {
      toast.success(r.message);
      navigate("/reset-password", {
        state: {
          email: email,
        },
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const handleReset = () => {
    if (!validateEmail(email)) {
      return;
    }
    const data = {
      email: email,
    };

    completeForgotP.mutate(data);
  };

  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-9/12 mds:w-7/12 md:6/12 border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-1/3 xxl:w-1/3 `}
      >
        <Link to="/login" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Reset Password
        </h4>
        <h4 className="text-gray-800 dark:text-gray-100 mt-2 mb-10  text-[12px]">
          Please enter the email attached to your account to reset your password
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
        </div>
        <button
          onClick={handleReset}
          disabled={!email || completeForgotP.isPending}
          className={`w-full h-[52px] rounded-[18px] mt-12 ${
            !email
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          {completeForgotP.isPending ? (
            <ClipLoader color="#FFFFFF" size={30} />
          ) : (
            "Reset"
          )}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
