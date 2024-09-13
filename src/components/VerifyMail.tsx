import React, { useEffect, useState } from "react";
import AuthNav from "./AuthNav";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInputField from "./utils/OtpInput";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/auth-context";

const VerifyMail = () => {
  const { authenticate } = useAuth();
  const [seconds, setSeconds] = useState<number>(59);
  const [otp, setOtp] = useState<string>("");
  const [sendOtp, setSendOtp] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const axiosInstance = useAuthAxios();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const handleChange = (otp: React.SetStateAction<string>) => {
    setOtp(otp);
  };
  useEffect(() => {
    if (seconds > 0) {
      setSendOtp(true);
    } else {
      setSendOtp(false);
    }
  }, [seconds]);

  const handleVerifyMail = async ({ email, verification_code }: any) => {
    const response = await axiosInstance.post(API.verifyMail, {
      email,
      verification_code,
    });
    return response.data;
  };
  const handleResendOTP = async ({ email }: any) => {
    const response = await axiosInstance.post(API.resendOTP, {
      email,
    });
    return response.data;
  };

  const completeResendOtp = useMutation({
    mutationFn: handleResendOTP,
    onSuccess: (r) => {
      toast.success(r.message);
      setSeconds(59);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const completeVerifcation = useMutation({
    mutationFn: handleVerifyMail,
    onSuccess: (r) => {
      toast.success(r.message);
      authenticate(r.data.token);
      setTimeout(() => {
        navigate("/kyc");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });

  const verifyMail = () => {
    const data = {
      email: info.email,
      verification_code: otp,
    };
    completeVerifcation.mutate(data);
  };
  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12   `}
      >
        <Link to="/sign-up" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Verify Email
        </h4>
        <h4 className="text-gray-800 dark:text-gray-100 mt-2 mb-10  text-[12px]">
          We’ve sent you an OTP Code via Email. Please enter 6-digit code sent
          to <span className="text-text_blue font-medium">{info.email}</span>
        </h4>
        <OtpInputField otp={otp} setOtp={setOtp} handleChange={handleChange} />
        <div className="flex justify-start mt-4 items-center">
          {seconds > 0 ? (
            <p className="text-gray-800 dark:text-white   text-[12px]">
              Resend code in{" "}
              <span className="">{seconds < 10 ? `0${seconds}` : seconds}</span>{" "}
              secs
            </p>
          ) : (
            <p className="text-gray-800 dark:text-white   text-[12px]">
              Didn't recieve code?
            </p>
          )}
          {!sendOtp && (
            <button
              onClick={(e) => {
                e.preventDefault();
                completeResendOtp.mutate({ email: info.email });
              }}
              className="text-text_blue text-[12px] flex ml-2 justify-center items-center  font-medium"
            >
              {completeResendOtp.isPending ? (
                <ClipLoader color="#FFFFFF" size={30} />
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>
        <button
          onClick={verifyMail}
          disabled={otp.length !== 6 || completeVerifcation.isPending}
          className={`w-full h-[52px] rounded-[18px] mt-12 ${
            otp.length !== 6
              ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          {completeVerifcation.isPending ? (
            <ClipLoader color="#FFFFFF" size={30} />
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyMail;
