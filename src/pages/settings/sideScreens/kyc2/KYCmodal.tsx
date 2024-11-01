import React, { useState } from "react";
import { FaRegImages, FaUser } from "react-icons/fa";
import { FaCircleCheck, FaHouseChimney } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { BiIdCard } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import GovernmentID from "./GovernmentID";
import Kyc2success from "./Kyc2success";
import HouseAddy from "./HouseAddy";

const KYCmodal = ({ setOpenKyc2, tier }: any) => {
  const [openGovId, setOpenGovId] = useState<boolean>(false);
  const [openPOAId, setOpenPOAId] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [idNumber, setIdNumber] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);

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
        <button
          onClick={() => setOpenGovId(true)}
          className="w-full flex bg-[#ececec] dark:bg-[#262626] mt-6 justify-between gap-4 items-center  p-4 rounded-lg  bg-transparent"
        >
          <div className="flex items-center gap-4">
            <div>
              <FaRegImages className="text-[24px] text-white dark:text-[#636363]" />
            </div>

            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                KYC level 2
              </h4>
              <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-left text-[12px]">
                Upload your official Governement ID{" "}
                {tier === 2 && "and Proof of house address"}
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-black dark:text-white text-[20px]" />
        </button>
      </div>
      {openGovId && (
        <GovernmentID
          setOpenGovId={setOpenGovId}
          setOpenSuccess={setOpenSuccess}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          base64Image={base64Image}
          setBase64Image={setBase64Image}
          setOpenPOAId={setOpenPOAId}
          tier={tier}
        />
      )}
      {openPOAId && (
        <HouseAddy
          idNumber={idNumber}
          base64Image={base64Image}
          setOpenPOAId={setOpenPOAId}
          setOpenSuccess={setOpenSuccess}
          setOpenGovId={setOpenGovId}
        />
      )}
      {openSuccess && (
        <Kyc2success
          setOpenSuccess={setOpenSuccess}
          setOpenKyc2={setOpenKyc2}
        />
      )}
    </div>
  );
};

export default KYCmodal;
