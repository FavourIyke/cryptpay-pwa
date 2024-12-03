import React from "react";
import { IoClose } from "react-icons/io5";
import { topupSuccess } from "../../../assets/images";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { formatAmount } from "../../../utils/formatDate";
import { useUser } from "../../../context/user-context";

const PaymentSuccess = ({
  amount,
  bankDetails,
  setOpenPSuccess,
  setBuyCoinModal,
  setOpenWallet,
  setSelectCoinModal,
}: any) => {
  const { refetch1 } = useUser();
  const handleRefetch = () => {
    // Trigger the refetch function for user details
    refetch1();
  };
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12     backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              setOpenPSuccess(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="flex flex-col  justify-center gap-6 items-center">
          <div className="w-[127px] h-[82px]">
            <img src={topupSuccess} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white px-8 text-gray-800 text-[22px] font-semibold text-center">
            Top Up Successful
          </h4>
          <p className="dark:text-gray-400 text-gray-800 text-[14px]  text-center">
            You have successfully deposited your Nigerian Naira wallet. You can
            now buy cryptocurrency
          </p>
          <div className="rounded-xl w-full  py-5 px-4 mt-8 bg-[#F1F1F1] dark:bg-[#2a2929]">
            <div className="w-full  flex justify-between gap-4 items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Amount
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="dark:text-white text-gray-900 text-[12px] ">
                  {formatAmount(amount)}NGN
                </h4>
              </div>
            </div>
            <div className="w-full mt-6 flex justify-between gap-4 items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Account Number
              </h4>

              <div className="flex items-center gap-2">
                <h4 className="dark:text-white text-gray-900 text-[12px] ">
                  {bankDetails?.account_number}
                </h4>
                <CopyToClipboard
                  text={bankDetails?.account_number}
                  onCopy={() => {
                    toast.success(`Account number copied`);
                  }}
                >
                  <FiCopy className="text-[16px] dark:text-white text-gray-900" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full mt-6 flex justify-between gap-4 items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Bank Name
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="dark:text-white text-gray-900 text-[12px] ">
                  {bankDetails?.bank_name}
                </h4>
              </div>
            </div>
            <div className="w-full mt-6 flex justify-between gap-4 items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Beneficiary
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="dark:text-white text-gray-900 text-[12px] ">
                  {bankDetails?.account_name}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-4 mt-8">
            <button
              onClick={() => {
                handleRefetch();
                setOpenPSuccess(false);
                setOpenWallet(true);
              }}
              className={`w-1/2 h-[52px] rounded-[18px] bg-[#E7E7E7] dark:bg-[#3D3D3D]  text-gray-400 flex justify-center items-center  font-semibold`}
            >
              Go to wallet
            </button>
            <button
              onClick={() => {
                setOpenPSuccess(false);
                setSelectCoinModal(true);
              }}
              className={`w-1/2 h-[52px] rounded-[18px] bg-text_blue  text-white flex justify-center items-center  font-semibold`}
            >
              Buy Crypto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
