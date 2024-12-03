import React from "react";
import { success } from "../../../assets/images";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";

const BankAddedModal = ({
  setSelectBankModal,
  setBankAddedModal,
  setAddBankModal,
}: any) => {
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-12 pb-16 overflow-auto bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBankAddedModal(false);
              setAddBankModal(true);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
          <button
            onClick={() => {
              setBankAddedModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="flex flex-col px-8 justify-center mt-6 gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={success} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            Bank Added
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            You have successfully added a new bank account details
          </p>
          <button
            onClick={() => {
              setBankAddedModal(false);
              setSelectBankModal(true);
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

export default BankAddedModal;
