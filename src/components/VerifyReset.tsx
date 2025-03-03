import { info } from "console";
import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import OtpInputField from "./utils/OtpInput";

const VerifyReset = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (otp: React.SetStateAction<string>) => {
    setOtp(otp);
  };
  const location = useLocation();
  const info = location.state;

  return (
    <div
      className={` w-full font-sora h-screen pb-16 overflow-auto bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12   `}
      >
        <Link to="/forgot-password" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Reset Password
        </h4>
        <h4 className="text-gray-800 dark:text-gray-100 mt-2 mb-10  text-[12px]">
          We’ve sent you an OTP Code via Email. Please enter 6-digit code sent
          to <span className="text-text_blue font-medium">{info.email}</span>
        </h4>
        <OtpInputField otp={otp} setOtp={setOtp} handleChange={handleChange} />
        <button
          onClick={() => {
            navigate("/reset-password", {
              state: {
                otpPassword: otp,
                email: info.email,
              },
            });
          }}
          disabled={otp.length !== 6}
          className={`w-full h-[52px] rounded-[18px] mt-12 ${
            otp.length !== 6
              ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default VerifyReset;
