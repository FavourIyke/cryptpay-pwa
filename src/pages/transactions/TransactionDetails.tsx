import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { Link } from "react-router-dom";

const TransactionDetails = ({ status }: any) => {
  const [onCopyRef, setOnCopyRef] = useState<boolean>(false);
  const [onCopyHash, setOnCopyHash] = useState<boolean>(false);
  const [onCopyTxnId, setOnCopyTxnId] = useState<boolean>(false);
  const [onCopyMerchantname, setOnCopyMerchantname] = useState<boolean>(false);
  const [onCopyBank, setOnCopyBank] = useState<boolean>(false);
  const [onCopyAccountNo, setOnCopyAccountNo] = useState<boolean>(false);
  return (
    <div className="w-full font-sora mt-8">
      <div className="w-full flex flex-col justify-center items-center">
        <h4 className="text-gray-400 text-[12px] ">You bought</h4>
        <h4 className="text-pending text-[18px] mt-1 ">
          0.0011828 <span className="text-white">BTC</span>
        </h4>
        <h4 className=" text-white text-[12px] mt-2">Completed time: 04:25</h4>
      </div>
      <div className="w-full mt-8 flex justify-between items-center">
        <h4 className="text-gray-400 text-[12px] ">Reference</h4>
        <div className="flex items-center gap-2">
          <h4 className="text-gray-400 text-[12px] ">256521T....sjsg</h4>
          <CopyToClipboard
            text="256521T5841sgasga5514sjsg"
            onCopy={() => {
              setOnCopyRef(true);
              setTimeout(() => {
                setOnCopyRef(false);
              }, 2500);
            }}
          >
            {onCopyRef ? (
              <FiClipboard className="text-[16px] text-white" />
            ) : (
              <FiCopy className="text-[16px] text-white" />
            )}
          </CopyToClipboard>
        </div>
      </div>
      <div className="w-full mt-3 flex justify-between items-center">
        <h4 className="text-gray-400 text-[12px] ">Hash</h4>
        <div className="flex items-center gap-2">
          <h4 className="text-gray-400 text-[12px] ">shhddi...41sga</h4>
          <CopyToClipboard
            text="shhdiiuhgdg567uytrfg41sga"
            onCopy={() => {
              setOnCopyHash(true);
              setTimeout(() => {
                setOnCopyHash(false);
              }, 2500);
            }}
          >
            {onCopyHash ? (
              <FiClipboard className="text-[16px] text-white" />
            ) : (
              <FiCopy className="text-[16px] text-white" />
            )}
          </CopyToClipboard>
        </div>
      </div>
      <h4 className="text-white text-[14px] mt-8">Payment Details</h4>
      <div className="full mt-8">
        <div className="w-full  flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Status</h4>
          <div
            className={`p-2 gap-2 rounded-xl flex justify-center items-center bg-opacity-10 ${
              status === "Successful"
                ? "bg-success_green"
                : status === "Pending"
                ? "bg-pending"
                : status === "Failed"
                ? "bg-red-500"
                : ""
            }`}
          >
            <div
              className={`w-[6px] h-[6px] rounded-full ${
                status === "Successful"
                  ? "bg-success_green"
                  : status === "Pending"
                  ? "bg-pending"
                  : status === "Failed"
                  ? "bg-red-500"
                  : ""
              }`}
            />
            <h4
              className={`${
                status === "Successful"
                  ? "text-success_green"
                  : status === "Pending"
                  ? "text-pending"
                  : status === "Failed"
                  ? "text-red-500"
                  : ""
              } text-[12px]`}
            >
              {status}
            </h4>
          </div>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Rate</h4>
          <h4 className="text-gray-400 text-[12px] ">1705.56/$</h4>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Transaction ID</h4>
          <div className="flex items-center gap-2">
            <h4 className="text-gray-400 text-[12px] ">6521T5....wid</h4>
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
                <FiClipboard className="text-[16px] text-white" />
              ) : (
                <FiCopy className="text-[16px] text-white" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-full  mt-4 flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Merchant Name</h4>
          <div className="flex items-center gap-2">
            <h4 className="text-gray-400 text-[12px] ">Mamudu Jeffrey</h4>
            <CopyToClipboard
              text="Mamudu Jeffrey"
              onCopy={() => {
                setOnCopyMerchantname(true);
                setTimeout(() => {
                  setOnCopyMerchantname(false);
                }, 2500);
              }}
            >
              {onCopyMerchantname ? (
                <FiClipboard className="text-[16px] text-white" />
              ) : (
                <FiCopy className="text-[16px] text-white" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Bank Name</h4>
          <div className="flex items-center gap-2">
            <h4 className="text-gray-400 text-[12px] ">Fidelity Bank</h4>
            <CopyToClipboard
              text="Fidelity Bank"
              onCopy={() => {
                setOnCopyBank(true);
                setTimeout(() => {
                  setOnCopyBank(false);
                }, 2500);
              }}
            >
              {onCopyBank ? (
                <FiClipboard className="text-[16px] text-white" />
              ) : (
                <FiCopy className="text-[16px] text-white" />
              )}
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-full mt-4 flex justify-between items-center">
          <h4 className="text-gray-400 text-[12px] ">Account Number</h4>
          <div className="flex items-center gap-2">
            <h4 className="text-gray-400 text-[12px] ">00125480881</h4>
            <CopyToClipboard
              text="00125480881"
              onCopy={() => {
                setOnCopyAccountNo(true);
                setTimeout(() => {
                  setOnCopyAccountNo(false);
                }, 2500);
              }}
            >
              {onCopyAccountNo ? (
                <FiClipboard className="text-[16px] text-white" />
              ) : (
                <FiCopy className="text-[16px] text-white" />
              )}
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className="mt-8 flex  gap-4 h-[52px] justify-center w-full items-center">
        <button className="w-1/2 flex h-full justify-center items-center border border-[#3A66FF] rounded-3xl text-[14px] text-[#3A66FF]">
          Share
        </button>
        <Link
          to="/dashboard"
          className="w-1/2 flex h-full justify-center items-center  bg-text_blue rounded-3xl text-[14px] text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default TransactionDetails;
