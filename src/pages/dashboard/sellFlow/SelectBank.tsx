import React from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { kudaLogo, opayLogo } from "../../../assets/images";
import { SlArrowLeft } from "react-icons/sl";

const SelectBank = ({
  setSelectBankModal,
  setSelectNetworkModal,
  setGenerateAddyModal,
  setAddBankModal,
}: any) => {
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectBankModal(false);
              setSelectNetworkModal(true);
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
              setSelectBankModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Select Bank
        </h4>
        <h4 className="dark:text-gray-300 text-gray-800 mt-2  text-[14px]">
          Select bank to receive payout
        </h4>
        <div className="mt-8 w-full">
          <div
            onClick={() => {
              setSelectBankModal(false);
              setGenerateAddyModal(true);
            }}
            className="w-full mt-6 cursor-pointer flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <div className="w-[24px] h-[24px] ">
                <img src={opayLogo} className="w-full h-full bg-cover" alt="" />
              </div>
              <h4 className="dark:text-gray-50 text-gray-800  font-medium text-[12px]">
                Opay
              </h4>
            </div>
            <div className="">
              <h4 className="dark:text-gray-400 text-gray-800 text-right font-medium text-[12px]">
                Mamudu A Jeffrey
              </h4>
              <h4 className="dark:text-gray-400 text-gray-800 mt-2 text-right  font-medium text-[12px]">
                2032321252
              </h4>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <div className="w-full mt-6 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-[24px] h-[24px] ">
                <img src={kudaLogo} className="w-full h-full bg-cover" alt="" />
              </div>
              <h4 className="dark:text-gray-50 text-gray-800  font-medium text-[12px]">
                Kuda MFB
              </h4>
            </div>
            <div className="">
              <h4 className="dark:text-gray-400 text-gray-800 text-right font-medium text-[12px]">
                Mamudu A Jeffrey
              </h4>
              <h4 className="dark:text-gray-400 text-gray-800 mt-2 text-right  font-medium text-[12px]">
                2032321252
              </h4>
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <button
            onClick={() => {
              setSelectBankModal(false);
              setAddBankModal(true);
            }}
            className="w-4/5 xs:w-3/5 mds:w-1/2 mx-auto flex gap-3 items-center justify-center h-[40px] text-[12px] font-medium rounded-xl text-[#3A66FF] border-text_blue border "
          >
            <IoAddOutline className="text-[24px] " />
            <h4>Add Bank Account</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBank;
