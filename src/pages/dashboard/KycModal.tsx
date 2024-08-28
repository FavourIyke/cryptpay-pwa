import React from "react";
import { progress } from "../../assets/images";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const KycModal = ({ setKycModal }: any) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              setKycModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="flex flex-col px-8 justify-center mt-6 gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={progress} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            KYC INCOMPLETE
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            It appears that you have not yet completed your Know Your Customer
            (KYC) verification process.
          </p>
          <button
            onClick={() => {
              navigate("/kyc");
            }}
            className={`w-10/12 h-[52px] rounded-[18px] bg-text_blue mt-4 text-white flex justify-center items-center  font-semibold`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycModal;
