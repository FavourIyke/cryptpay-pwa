import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { formatAmount } from "../../../utils/formatDate";
import { truncateWord } from "../../../utils/wordFunctions";

const DetailsModal = ({ setShowDetails, clickedPayout }: any) => {
  const [onCopyRef, setOnCopyRef] = useState<boolean>(false);
  const [onCopyTxnId, setOnCopyTxnId] = useState<boolean>(false);
  const [onCopyMerchantname, setOnCopyMerchantname] = useState<boolean>(false);
  const [onCopyBank, setOnCopyBank] = useState<boolean>(false);
  const [onCopyAccountNo, setOnCopyAccountNo] = useState<boolean>(false);
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
            Transaction details
          </h4>
          <button
            onClick={() => {
              setShowDetails(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="w-full font-sora mt-8">
          <div className="w-full flex flex-col justify-center items-center">
            <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
              You {clickedPayout.transaction_type === "sell" ? "Sold" : ""}
            </h4>
            <h4 className="dark:text-pending text-[#F3A218] font-semibold text-[18px] mt-1 ">
              {formatAmount(Number(clickedPayout?.asset_amount))}{" "}
              <span className="text-gray-800 dark:dark:text-white  font-normal">
                {clickedPayout.crypto_currency}
              </span>
            </h4>
            <h4 className=" text-gray-800 dark:dark:text-white  text-[12px] mt-2">
              Completed time: 04:25
            </h4>
          </div>
          <div className="w-full mt-8 rounded-xl p-4  bg-[#F1F1F1] dark:bg-transparent">
            <div className="w-full flex mt-2 justify-between items-center">
              <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
                Hash
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
                  {truncateWord(clickedPayout.transaction_reference)}
                </h4>
                <CopyToClipboard
                  text={clickedPayout.transaction_reference}
                  onCopy={() => {
                    setOnCopyRef(true);
                    setTimeout(() => {
                      setOnCopyRef(false);
                    }, 2500);
                  }}
                >
                  {onCopyRef ? (
                    <FiClipboard className="text-[16px] dark:text-white text-gray-700" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-white text-gray-700" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <h4 className="dark:text-white text-gray-700 text-[14px] mt-8">
            Payment Details
          </h4>
          <div className="w-full mt-4 rounded-xl p-4  bg-[#F1F1F1] dark:bg-transparent">
            <div className="w-full  flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Status
              </h4>
              <div
                className={`px-2 py-1 gap-2 rounded-md  flex justify-center items-center bg-opacity-30 dark:bg-opacity-10 ${
                  clickedPayout?.status === "completed" ||
                  clickedPayout?.status === "successful"
                    ? "bg-success_green "
                    : clickedPayout?.status === "pending" ||
                      clickedPayout?.status === "processing"
                    ? "bg-pending"
                    : clickedPayout?.status === "failed"
                    ? "bg-red-500"
                    : ""
                }`}
              >
                <div
                  className={`w-[6px] h-[6px] rounded-full  ${
                    clickedPayout?.status === "completed" ||
                    clickedPayout?.status === "successful"
                      ? "dark:bg-success_green bg-[#0E871D]"
                      : clickedPayout?.status === "pending" ||
                        clickedPayout?.status === "processing"
                      ? "dark:bg-pending bg-[#DD900D]"
                      : clickedPayout?.status === "failed"
                      ? "bg-red-500"
                      : ""
                  }`}
                />
                <h4
                  className={`${
                    clickedPayout?.status === "completed" ||
                    clickedPayout?.status === "successful"
                      ? "dark:text-success_green text-[#0E871D]"
                      : clickedPayout?.status === "pending" ||
                        clickedPayout?.status === "processing"
                      ? "dark:text-pending text-[#DD900D]"
                      : clickedPayout?.status === "failed"
                      ? "text-red-500"
                      : ""
                  } text-[12px] capitalize`}
                >
                  {clickedPayout?.status}
                </h4>
              </div>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Rate
              </h4>
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                {formatAmount(Number(clickedPayout?.sell_rate))}/$
              </h4>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Transaction ID
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                  {truncateWord(clickedPayout.transaction_id)}
                </h4>
                <CopyToClipboard
                  text="6521T5841sg3rgwid"
                  onCopy={() => {
                    setOnCopyTxnId(true);
                    setTimeout(() => {
                      setOnCopyTxnId(false);
                    }, 2500);
                  }}
                >
                  {onCopyTxnId ? (
                    <FiClipboard className="text-[16px] dark:text-white text-gray-700" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-white text-gray-700" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full  mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Merchant Name
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                  {clickedPayout.receiver_account_name}
                </h4>
                <CopyToClipboard
                  text={clickedPayout.receiver_account_name}
                  onCopy={() => {
                    setOnCopyMerchantname(true);
                    setTimeout(() => {
                      setOnCopyMerchantname(false);
                    }, 2500);
                  }}
                >
                  {onCopyMerchantname ? (
                    <FiClipboard className="text-[16px] dark:text-white text-gray-700" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-white text-gray-700" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Bank Name
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                  {clickedPayout.receiver_bank_name}
                </h4>
                <CopyToClipboard
                  text={clickedPayout.receiver_bank_name}
                  onCopy={() => {
                    setOnCopyBank(true);
                    setTimeout(() => {
                      setOnCopyBank(false);
                    }, 2500);
                  }}
                >
                  {onCopyBank ? (
                    <FiClipboard className="text-[16px] dark:text-white text-gray-700" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-white text-gray-700" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                Account Number
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                  {clickedPayout.receiver_account_number}
                </h4>
                <CopyToClipboard
                  text={clickedPayout.receiver_account_number}
                  onCopy={() => {
                    setOnCopyAccountNo(true);
                    setTimeout(() => {
                      setOnCopyAccountNo(false);
                    }, 2500);
                  }}
                >
                  {onCopyAccountNo ? (
                    <FiClipboard className="text-[16px] dark:text-white text-gray-700" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-white text-gray-700" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="mt-8 flex  gap-4 h-[52px] justify-center w-full items-center">
            <button className="w-full flex h-full justify-center items-center border border-[#3A66FF] rounded-3xl text-[14px] text-[#3A66FF]">
              Share
            </button>
            {/* <Link
              to="/dashboard"
              className="w-1/2 flex h-full justify-center items-center  bg-text_blue rounded-3xl text-[14px] text-white"
            >
              Go home
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
