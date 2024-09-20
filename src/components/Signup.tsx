import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import { validateSignUp } from "../utils/validations";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!validateSignUp(email, username)) {
      return;
    }
    navigate("/create-password", {
      state: {
        email: email,
        username: username,
      },
    });
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
          Create Account
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
          <div className="w-full mt-6">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="eg: johndoe"
              className={
                username
                  ? "w-full dark:text-white border-text_blue text-gray-800   bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border  bg-transparent px-4 spin-button-none rounded-xl "
                  : "w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
              }
            />
          </div>
          <div className="w-full mt-6">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter Referral code"
              className={
                referralCode
                  ? "w-full dark:text-white border-text_blue text-gray-800   bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border  bg-transparent px-4 spin-button-none rounded-xl "
                  : "w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
              }
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={!email || !username}
            className={`w-full h-[52px] rounded-[18px] mt-12 ${
              !email || !username
                ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            Continue
          </button>
          <h4 className="dark:text-white text-center text-gray-800 mt-4 text-[14px] ">
            Already a user?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-text_blue cursor-pointer"
            >
              Sign In
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Signup;
