import React, { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlArrowLeft } from "react-icons/sl";
import { verifyBadge } from "../../../assets/images";
import { useUser } from "../../../context/user-context";
import { FaCircleCheck } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../../constants/api";
import { errorMessage } from "../../../utils/errorMessage";
import useAuthAxios from "../../../utils/baseAxios";

const AccountUpgrade = ({ setSidePage, setScreen }: any) => {
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const axiosInstance = useAuthAxios();

  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const { data: kycStatus, error: error2 } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });
  // console.log(kycStatus);

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  const email = userDetails?.data?.profile.email;
  const level = kycStatus?.data.kyc_level;
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSidePage(false);
          setScreen(0);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        KYC Verification
      </h4>
      <h4 className="text-gray-500 dark:text-gray-400 mt-4   text-[14px]">
        Each verification tier gives you access to a higher trading limits
      </h4>
      <div className="w-full mt-8 overflow-auto  lgss:h-[600px]">
        <div className="w-full">
          <div className="flex justify-start gap-4 items-center">
            <h4 className="text-gray-900 dark:text-white">
              You are currently on
            </h4>
            <div className="px-3 py-1 bg-text_blue rounded-lg text-white text-[11px]">
              Level {level === "100" ? 1 : 0}
            </div>
          </div>
          <div className="w-full p-4 mt-3 mb-6  bg-[#E9F4FF] rounded-xl">
            <div className="w-full flex gap-4 justify-center items-center">
              <div>
                <h4 className="font-bold text-[14px] ">
                  Upgrade to Level {level === "100" ? 2 : 1}
                </h4>
                <h4 className="mt-1 text-[#060B29] text-[12px]">
                  Complete your profile to start trading, depositing, and
                  receiving both crypto and fiat.
                </h4>
              </div>
              <img src={verifyBadge} alt="" />
            </div>
            <div className="w-full flex justify-between gap-4 items-center mt-4">
              <div className="w-11/12 flex justify-start items-center rounded-full h-[12px] bg-[#B7D7FF] ">
                {level === "100" && (
                  <div className="w-1/3 bg-text_blue rounded-l-full h-full" />
                )}
              </div>
              <h4 className=" text-black text-[14px]">
                {level === "100" && "1"}/3
              </h4>
            </div>
          </div>
        </div>
        <div className="w-full relative  pt-3">
          <div className="w-full  px-4 py-4   rounded-xl bg-[#ececec] dark:bg-[#262626]  ">
            {/* <div className="w-[25%] py-1 absolute top-0  left-[6%]  flex justify-center items-center font-medium text-white bg-text_blue rounded-lg text-[12px] ">
              Current Tier
            </div> */}
            <div className="w-full">
              <div className="w-full mt-4">
                <div className="w-full flex justify-between items-center">
                  <h4 className=" text-[14px] text-gray-600 dark:text-gray-100">
                    Daily Buy Limit
                  </h4>
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Not available
                  </h4>
                </div>
                <div className="w-full flex justify-between mt-4 items-center">
                  <h4 className=" text-[14px] text-gray-600 dark:text-gray-100">
                    Daily Sell Limit
                  </h4>
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    ₦1,000,000
                  </h4>
                </div>

                <h4 className=" text-[14px] mt-2 text-gray-600 dark:text-gray-100">
                  One Bank Account
                </h4>
              </div>
              <h4 className="font-semibold text-[14px] mt-4 text-gray-900 dark:text-gray-50">
                Requirements
              </h4>
              <div className="w-full mt-4">
                <div className="w-full flex justify-start gap-2 items-center">
                  {email ? (
                    <FaCircleCheck className="text-[#5E91FF] text-[20px]" />
                  ) : (
                    <IoIosRemoveCircleOutline className="text-gray-100 text-[20px]" />
                  )}
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Email Address
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  {level === "100" ? (
                    <FaCircleCheck className="text-[#5E91FF] text-[20px]" />
                  ) : (
                    <IoIosRemoveCircleOutline className="text-gray-100 text-[20px]" />
                  )}{" "}
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Bank Verification Number
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  {level === "100" ? (
                    <FaCircleCheck className="text-[#5E91FF] text-[20px]" />
                  ) : (
                    <IoIosRemoveCircleOutline className="text-gray-100 text-[20px]" />
                  )}{" "}
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Liveness check
                  </h4>
                </div>
              </div>
              <button
                onClick={() => {
                  if (level === "100") {
                  } else {
                    navigate("/kyc");
                  }
                }}
                className={
                  level === "100"
                    ? "w-full bg-gray-500 mt-6 h-[44px] rounded-xl text-[14px] font-semibold text-gray-300"
                    : "w-full bg-text_blue mt-6 h-[44px] rounded-xl text-[14px] font-semibold text-white"
                }
              >
                {level === "100"
                  ? "Upgrade to level 2"
                  : "Click to start upgrade"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpgrade;
