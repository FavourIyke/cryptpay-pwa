import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { formatAmount, formatDateAndTime } from "../../../utils/formatDate";
import { truncateWord } from "../../../utils/wordFunctions";
import { API } from "../../../constants/api";
import { useUser } from "../../../context/user-context";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorMessage } from "../../../utils/errorMessage";
import useAuthAxios from "../../../utils/baseAxios";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheck } from "react-icons/fa";

const DetailsModal = ({
  setShowDetails,
  clickedPayout,
  setClickedPayout,
}: any) => {
  const { transactionID, setTransactionID } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [onCopyTxnId, setOnCopyTxnId] = useState<boolean>(false);
  const [onCopyMerchantname, setOnCopyMerchantname] = useState<boolean>(false);
  const [onCopyBank, setOnCopyBank] = useState<boolean>(false);
  const [onCopyAccountNo, setOnCopyAccountNo] = useState<boolean>(false);
  const { monthAndYear, formattedTime } = formatDateAndTime(
    clickedPayout?.transaction_date
  );
  const axiosInstance = useAuthAxios();

  const getPayout = async () => {
    const response = await axiosInstance.get(
      API.getSingleTransaction(transactionID)
    );
    return response.data.data;
  };
  const {
    data: payout,
    error: error1,
    isLoading,
  } = useQuery({
    queryKey: ["get-payout"],
    queryFn: getPayout,
    retry: 1,
    enabled: !!transactionID,
  });
  useEffect(() => {
    if (error1) {
      const newError = error1 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1]);
  useEffect(() => {
    if (payout) {
      setClickedPayout(payout);
    }
  }, [payout]);
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12     backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
            Transaction details
          </h4>
          <button
            onClick={() => {
              setShowDetails(false);
              setTransactionID("");
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center flex-col mt-10">
            <ClipLoader color="#3A66FF" size={50} />
          </div>
        ) : (
          <div className="w-full font-sora mt-8">
            <div className="w-full flex flex-col justify-center items-center">
              <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
                {clickedPayout?.transaction_type === "payout"
                  ? "Payout"
                  : clickedPayout?.transaction_type === "topup"
                  ? "You Top Up"
                  : clickedPayout?.transaction_type === "buy"
                  ? "You Bought"
                  : clickedPayout?.transaction_type === "deposit"
                  ? "You Sold"
                  : ""}
              </h4>
              <h4
                className={` ${
                  clickedPayout?.status === "pending"
                    ? `dark:text-pending text-[#F3A218]`
                    : `text-[#0EB622] dark:text-[#0F973D]`
                }  text-[18px] mt-1 `}
              >
                {" "}
                {clickedPayout?.transaction_type === "payout"
                  ? `+ ${formatAmount(Number(clickedPayout?.fiat_amount))} `
                  : clickedPayout?.transaction_type === "topup"
                  ? `+ ${formatAmount(Number(clickedPayout?.fiat_amount))}`
                  : clickedPayout?.transaction_type === "buy"
                  ? `${formatAmount(Number(clickedPayout?.asset_amount))}`
                  : clickedPayout?.transaction_type === "deposit"
                  ? `${formatAmount(Number(clickedPayout?.asset_amount))}`
                  : ""}
                <span className="text-gray-800 dark:dark:text-white  font-normal">
                  {clickedPayout?.transaction_type === "payout"
                    ? ` NGN ${clickedPayout?.status === "pending" ? "⏳" : ""}`
                    : clickedPayout?.transaction_type === "topup"
                    ? ` NGN ${clickedPayout?.status === "pending" ? "⏳" : ""}`
                    : clickedPayout?.transaction_type === "buy"
                    ? ` ${clickedPayout.crypto_currency} ${
                        clickedPayout?.status === "pending" ? "⏳" : ""
                      }`
                    : clickedPayout?.transaction_type === "deposit"
                    ? ` ${clickedPayout.crypto_currency} ${
                        clickedPayout?.status === "pending" ? "⏳" : ""
                      }`
                    : ""}
                </span>
              </h4>
              <div className="flex justify-center items-center mt-2 gap-2">
                <h4 className=" text-gray-800 dark:text-white  text-[14px] ">
                  {monthAndYear}
                </h4>
                <div className="w-[6px] h-[6px] rounded-full bg-gray-800 dark:bg-white "></div>
                <h4 className=" text-gray-800 dark:text-white  text-[14px] ">
                  {formattedTime}
                </h4>
              </div>
            </div>
            <div className="w-full mt-8 flex justify-center items-center p-4  ">
              <button
                onClick={() => setOpen(false)}
                className={`w-1/2 flex justify-center items-center  py-3 text-[14px] ${
                  !open
                    ? "border-b-2 border-text_blue text-white"
                    : "border-b-2 border-[#262626] text-[#645D5D]"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setOpen(true)}
                className={`w-1/2 flex justify-center items-center text-white py-3 text-[14px] ${
                  open
                    ? "border-b-2 border-text_blue text-white"
                    : "border-b-2 border-[#262626] text-[#645D5D]"
                }`}
              >
                Activity
              </button>
            </div>

            {!open ? (
              <div className="w-full  rounded-xl  p-4 bg-[#F1F1F1] dark:bg-[#2f2e2e]">
                {clickedPayout?.transaction_type === "deposit" ||
                  (clickedPayout?.transaction_type === "buy" && (
                    <div className="w-full  flex justify-between items-center">
                      <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                        Hash ID
                      </h4>
                      <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                        ---
                      </h4>
                    </div>
                  ))}
                <div className="w-full mt-4 flex justify-between items-center">
                  <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                    Transaction ID
                  </h4>
                  <div className="flex items-center  gap-2">
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      {truncateWord(clickedPayout.transaction_id ?? "")}
                    </h4>
                    <CopyToClipboard
                      text={clickedPayout.transaction_id ?? ""}
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
                <div className="w-full mt-4 flex justify-between items-center">
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
                {clickedPayout?.transaction_type === "payout" && (
                  <div className="w-full mt-4 flex justify-between items-center">
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      Rate
                    </h4>
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      {formatAmount(Number(clickedPayout?.sell_rate))}/$
                    </h4>
                  </div>
                )}
                {clickedPayout?.transaction_type === "deposit" && (
                  <div className="w-full  mt-4 flex justify-between items-center">
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      Received From
                    </h4>
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      ---
                    </h4>
                  </div>
                )}

                {clickedPayout?.transaction_type === "payout" && (
                  <>
                    <div className="w-full  mt-4 flex justify-between items-center">
                      <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                        Merchant Name
                      </h4>
                      <div className="flex items-center justify-end gap-2">
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
                  </>
                )}
                {clickedPayout?.transaction_type === "buy" && (
                  <div className="w-full  mt-4 flex justify-between items-center">
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      Amount in Naira
                    </h4>
                    <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                      {formatAmount(Number(clickedPayout?.fiat_amount))} NGN
                    </h4>
                  </div>
                )}

                <div className="w-full mt-4 flex justify-between items-center">
                  <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                    Description
                  </h4>
                  <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
                    {clickedPayout?.transaction_type === "payout"
                      ? "Naira Payout"
                      : clickedPayout?.transaction_type === "topup"
                      ? "Naira Top Up"
                      : clickedPayout?.transaction_type === "buy"
                      ? "Wallet Debit"
                      : clickedPayout?.transaction_type === "deposit"
                      ? "Crypto Deposit"
                      : ""}
                  </h4>
                </div>
              </div>
            ) : (
              <div className="w-full  rounded-xl  p-4 bg-[#F1F1F1] dark:bg-[#2f2e2e]">
                <div className="flex justify-start gap-4 items-start">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center p-1 bg-[#D7EAFF] h-[32px] w-[32px] rounded-full">
                      <div
                        className={`flex justify-center items-center p-1 
                  ${
                    clickedPayout?.status === "completed" ||
                    clickedPayout?.status === "successful"
                      ? "bg-text_blue "
                      : "dark:bg-[#8D8484] bg-#B0B0B0]"
                  } 
                  
                  h-full w-full rounded-full`}
                      >
                        {clickedPayout?.status === "completed" ||
                        clickedPayout?.status === "successful" ? (
                          <FaCheck className="text-[14px] text-white" />
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={`h-[70px] w-[1px] border-dashed  border  ${
                        clickedPayout?.status === "completed" ||
                        clickedPayout?.status === "successful"
                          ? "border-text_blue"
                          : "dark:border-[#8D8484] border-#B0B0B0]"
                      } `}
                    ></div>
                  </div>
                  <div className="">
                    <div className="flex justify-start items-center  gap-2">
                      <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                        {monthAndYear}
                      </h4>
                      <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                        {formattedTime}
                      </h4>
                    </div>
                    <h4 className="text-gray-900 dark:text-gray-100 font-semibold mt-1 text-[14px]">
                      {clickedPayout?.transaction_type === "payout"
                        ? "Payout initiated"
                        : clickedPayout?.transaction_type === "topup"
                        ? "Top Up Initiated"
                        : clickedPayout?.transaction_type === "buy"
                        ? "Order Initiated"
                        : clickedPayout?.transaction_type === "deposit"
                        ? "Order Initiated"
                        : ""}
                    </h4>
                    <h4 className="text-gray-900 dark:text-gray-100  mt-1 text-[11px]">
                      {clickedPayout?.transaction_type === "payout"
                        ? "Your payout request has been received and is now being processed.Your payout request has been received and is now being processed."
                        : clickedPayout?.transaction_type === "topup"
                        ? `Your top-up request of NGN ${formatAmount(
                            Number(clickedPayout?.fiat_amount)
                          )} has been received. `
                        : clickedPayout?.transaction_type === "buy"
                        ? "Your order has been successfully placed. We’re locking in the details to proceed with your transaction."
                        : clickedPayout?.transaction_type === "deposit"
                        ? "Your order has been successfully placed. We’re locking in the details to proceed with your transaction."
                        : ""}
                    </h4>
                  </div>
                </div>
                <div className="flex justify-start gap-4 items-start">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center p-1 bg-[#D7EAFF] h-[32px] w-[32px] rounded-full">
                      <div
                        className={`flex justify-center items-center p-1 
                  ${
                    clickedPayout?.status === "completed" ||
                    clickedPayout?.status === "successful"
                      ? "bg-text_blue "
                      : "dark:bg-[#8D8484] bg-#B0B0B0]"
                  } 
                  
                  h-full w-full rounded-full`}
                      >
                        {clickedPayout?.status === "completed" ||
                        clickedPayout?.status === "successful" ? (
                          <FaCheck className="text-[14px] text-white" />
                        ) : null}
                      </div>
                    </div>
                    {clickedPayout?.transaction_type === "deposit" && (
                      <div
                        className={`h-[70px] w-[1px] border-dashed  border  ${
                          clickedPayout?.status === "completed" ||
                          clickedPayout?.status === "successful"
                            ? "border-text_blue"
                            : "dark:border-[#8D8484] border-#B0B0B0]"
                        } `}
                      ></div>
                    )}
                  </div>
                  <div className="">
                    <div className="flex justify-start items-center  gap-2">
                      <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                        {monthAndYear}
                      </h4>
                      <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                        {formattedTime}
                      </h4>
                    </div>
                    <h4 className="text-gray-900 dark:text-gray-100 font-semibold mt-1 text-[14px]">
                      {clickedPayout?.transaction_type === "payout"
                        ? "Payout Completed"
                        : clickedPayout?.transaction_type === "topup"
                        ? "Top Up Complete"
                        : clickedPayout?.transaction_type === "buy"
                        ? "Purchase Completed"
                        : clickedPayout?.transaction_type === "deposit"
                        ? "Deposit Confirmed"
                        : ""}
                    </h4>
                    <h4 className="text-gray-900 dark:text-gray-100  mt-1 text-[11px]">
                      {clickedPayout?.transaction_type === "payout"
                        ? "Your payout was successful! The funds have been transferred to your designated bank account."
                        : clickedPayout?.transaction_type === "topup"
                        ? `The top-up amount of ${formatAmount(
                            Number(clickedPayout?.fiat_amount)
                          )} has been credited to the user’s wallet balance`
                        : clickedPayout?.transaction_type === "buy"
                        ? "Your purchase was successful! The cryptocurrency has been added to your wallet"
                        : clickedPayout?.transaction_type === "deposit"
                        ? "Your deposit has been confirmed. We’re now processing your order to ensure everything is set."
                        : ""}
                    </h4>
                  </div>
                </div>
                {clickedPayout?.transaction_type === "deposit" && (
                  <div className="flex justify-start gap-4 items-start">
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex justify-center items-center p-1 bg-[#D7EAFF] h-[32px] w-[32px] rounded-full">
                        <div
                          className={`flex justify-center items-center p-1 
                  ${
                    clickedPayout?.status === "completed" ||
                    clickedPayout?.status === "successful"
                      ? "bg-text_blue "
                      : "dark:bg-[#8D8484] bg-#B0B0B0]"
                  } 
                  
                  h-full w-full rounded-full`}
                        >
                          {clickedPayout?.status === "completed" ||
                          clickedPayout?.status === "successful" ? (
                            <FaCheck className="text-[14px] text-white" />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-start items-center  gap-2">
                        <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                          {monthAndYear}
                        </h4>
                        <h4 className=" text-gray-500 dark:text-gray-400  text-[9px] ">
                          {formattedTime}
                        </h4>
                      </div>
                      <h4 className="text-gray-900 dark:text-gray-100 font-semibold mt-1 text-[14px]">
                        Payment Complete
                      </h4>
                      <h4 className="text-gray-900 dark:text-gray-100  mt-1 text-[11px]">
                        Payment is complete! Your transaction has been
                        successfully finalized.
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* <div className="mt-8 flex  gap-4 h-[52px] justify-center w-full items-center">
        <button className="w-1/2 flex h-full justify-center items-center border border-[#3A66FF] rounded-3xl text-[14px] text-[#3A66FF]">
          Share
        </button>
        <Link
          to="/dashboard"
          className="w-1/2 flex h-full justify-center items-center  bg-text_blue rounded-3xl text-[14px] text-white"
        >
          Go home
        </Link>
      </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
