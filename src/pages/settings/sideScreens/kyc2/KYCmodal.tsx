import React, { useEffect, useState } from "react";
import { FaRegImages, FaUser } from "react-icons/fa";
import { FaCircleCheck, FaHouseChimney } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { BiIdCard } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import GovernmentID from "./GovernmentID";
import Kyc2success from "./Kyc2success";
import HouseAddy from "./HouseAddy";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../../../constants/api";
import useAuthAxios from "../../../../utils/baseAxios";
import { errorMessage } from "../../../../utils/errorMessage";

const KYCmodal = ({ setOpenKyc2, tier }: any) => {
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
  const level = kycStatus?.data.kyc_level;

  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <button
          onClick={() => {
            setOpenKyc2(false);
          }}
          className=" flex items-center gap-2 "
        >
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </button>
        <div className="w-full mt-8">
          <h4 className="text-gray-800 dark:text-gray-100  font-semibold text-[18px]">
            KYC Verification
          </h4>
          <h4 className="text-gray-800 dark:text-gray-100 mt-2  font-medium text-[14px]">
            Each verification tier gives you access to a higher trading limits
          </h4>
        </div>
        <button className="w-full flex bg-[#ececec] dark:bg-[#262626] mt-8 justify-between items-center  p-4 rounded-lg  bg-transparent">
          <div className="flex items-center gap-4">
            <FaUser className="text-[24px] text-white dark:text-[#636363]" />

            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Full Name
              </h4>
              <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[12px]">
                Full name as shown on documents
              </h4>
            </div>
          </div>
          <FaCircleCheck className="text-[#5E91FF] text-[24px]" />
        </button>
        <button className="w-full flex bg-[#ececec] dark:bg-[#262626] mt-6 justify-between items-center  p-4 rounded-lg  bg-transparent">
          <div className="flex items-center gap-4">
            <BiIdCard className="text-[24px] text-white dark:text-[#636363]" />

            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Bank Verification Number
              </h4>
              <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[12px]">
                Registered BVN for secure verification
              </h4>
            </div>
          </div>
          <FaCircleCheck className="text-[#5E91FF] text-[24px]" />
        </button>
        <button className="w-full flex bg-[#ececec] dark:bg-[#262626] mt-6 justify-between items-center  p-4 rounded-lg  bg-transparent">
          <div className="flex items-center gap-4">
            <MdEmail className="text-[24px] text-white dark:text-[#636363]" />

            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Email Address
              </h4>
              <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[12px]">
                Provide your active email
              </h4>
            </div>
          </div>
          <FaCircleCheck className="text-[#5E91FF] text-[24px]" />
        </button>
        <button className="w-full flex bg-[#ececec] dark:bg-[#262626] mt-6 justify-between gap-4 items-center  p-4 rounded-lg  bg-transparent">
          <div className="flex items-center gap-4">
            <div>
              <FaRegImages className="text-[24px] text-white dark:text-[#636363]" />
            </div>

            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                KYC level 2
              </h4>
              <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-left text-[12px]">
                Upload your {level === "201" ? "" : "official Governement ID"}
                {tier === 2 && "and Proof of house address"}
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-black dark:text-white text-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default KYCmodal;
