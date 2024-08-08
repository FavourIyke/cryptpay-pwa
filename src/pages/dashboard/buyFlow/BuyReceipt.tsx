import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";

const BuyReceipt = ({
  setBuyCoinModal,
  setBuyReceiptModal,
  coin,
  network,
  coinAmount,
  setFinalModal,
}: any) => {
  const [copyBankName, setCopyBankName] = useState<boolean>(false);
  const [copyAccountName, setCopyAccountName] = useState<boolean>(false);
  const [copyAccNo, setCopyAccNo] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyReceiptModal(false);
              setBuyCoinModal(true);
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
              setBuyReceiptModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Buy {coin}
        </h4>
        <div className="w-full flex flex-col justify-center  mt-8 items-center">
          <h4 className="text-gray-800 text-[12px]  dark:text-gray-400  ">
            You’re about to buy
          </h4>
          <h4 className="dark:text-pending text-[#F3A218] font-semibold text-[18px] mt-1 ">
            {coinAmount}{" "}
            <span className="text-gray-800 dark:dark:text-white  font-normal">
              {coin}
            </span>
          </h4>
          <h4 className=" text-gray-800 dark:dark:text-white  text-[12px] mt-2">
            Time Left To Transfer : 14:23
          </h4>
        </div>
        <div className="w-full mt-12 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Destination
          </h4>
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Trc1q0......dwjdgfee7g
          </h4>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Network
          </h4>
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            {network}
          </h4>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Transaction Fee 1%
          </h4>
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            {coinAmount / 100} {coin}
          </h4>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Estimated confirm time
          </h4>
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            3 minutes
          </h4>
        </div>
        <h4 className="dark:text-white text-gray-800 text-[14px] mt-8">
          Payment Details
        </h4>
        <div className="w-full mt-8 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Bank Name
          </h4>
          <div className="flex items-center gap-3">
            <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
              Fidelity Bank
            </h4>
            <CopyToClipboard
              text="Fidelity Bank"
              onCopy={() => {
                setCopyBankName(true);
                setTimeout(() => {
                  setCopyBankName(false);
                }, 2500);
              }}
            >
              {copyBankName ? (
                <FiClipboard className="text-[16px] dark:text-[#D0D5DD] text-black" />
              ) : (
                <FiCopy className="text-[16px] dark:text-[#D0D5DD] text-black" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Account Number
          </h4>
          <div className="flex items-center gap-3">
            <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
              002525851625
            </h4>
            <CopyToClipboard
              text="002525851625"
              onCopy={() => {
                setCopyAccNo(true);
                setTimeout(() => {
                  setCopyAccNo(false);
                }, 2500);
              }}
            >
              {copyAccNo ? (
                <FiClipboard className="text-[16px] dark:text-[#D0D5DD] text-black" />
              ) : (
                <FiCopy className="text-[16px] dark:text-[#D0D5DD] text-black" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
            Merchant Name
          </h4>
          <div className="flex items-center gap-3 ">
            <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
              Mamudu Jeffrey
            </h4>
            <CopyToClipboard
              text="Mamudu Jeffrey"
              onCopy={() => {
                setCopyAccountName(true);
                setTimeout(() => {
                  setCopyAccountName(false);
                }, 2500);
              }}
            >
              {copyAccountName ? (
                <FiClipboard className="text-[16px] dark:text-[#D0D5DD] text-black" />
              ) : (
                <FiCopy className="text-[16px] dark:text-[#D0D5DD] text-black" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="px-6 py-4 bg-[#DD900D] rounded-xl mt-8">
          <h4 className="text-white text-[14px]">Note</h4>
          <p className="text-gray-50 text-[10px] mt-2">
            1. Do not reference <span className="font-semibold">“Crypto”</span>{" "}
            in your transfer description
            <br />
            2. Make sure you sent the exact amount
            <br />
            3. Recheck transaction details before confirming
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8 w-full">
          <button
            onClick={() => setBuyReceiptModal(false)}
            className="w-1/2  text-[14px] rounded-2xl h-[52px] border border-text_blue text-text_blue flex justify-center items-center"
          >
            Cancel trade
          </button>
          <button
            onClick={() => {
              setBuyReceiptModal(false);
              setFinalModal(true);
            }}
            className="w-1/2 text-white text-[14px] rounded-2xl h-[52px] bg-text_blue flex justify-center items-center"
          >
            Transferred
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyReceipt;
