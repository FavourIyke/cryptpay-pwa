import React from "react";
import { topupCancel } from "../../../assets/images";
import { IoClose } from "react-icons/io5";

const PaymentCancelled = ({
  setOpenWallet,
  setOpenDeposit,
  setOpenPCancel,
}: any) => {
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12 lgss:pb-4  backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              setOpenPCancel(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="flex flex-col px-8 justify-center gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={topupCancel} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            Top Up Cancelled
          </h4>
          <p className="dark:text-gray-400 text-gray-800 text-[12px]  text-center">
            You have successfully cancelled your deposit to your Nigerian Naira
            wallet.
          </p>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => {
                setOpenPCancel(false);
                setOpenWallet(true);
              }}
              className={`w-1/2 h-[52px] rounded-[18px] bg-[#E7E7E7] dark:bg-[#3D3D3D]  text-gray-400 flex justify-center items-center  font-semibold`}
            >
              Go to wallet
            </button>
            <button
              onClick={() => {
                setOpenPCancel(false);
                setOpenDeposit(true);
              }}
              className={`w-1/2 h-[52px] rounded-[18px] bg-text_blue  text-white flex justify-center items-center  font-semibold`}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
