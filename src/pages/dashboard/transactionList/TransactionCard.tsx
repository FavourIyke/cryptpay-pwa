import React from "react";
import { btc, eth, naijaLogo, solana, trx, usdt } from "../../../assets/images";
import { useUser } from "../../../context/user-context";
import { formatAmount, formatDateAndTime } from "../../../utils/formatDate";

const TransactionCard = ({ payouts, onClick1, onClick2, kind = true }: any) => {
  const { theme } = useUser();
  const { formattedTime } = formatDateAndTime(payouts?.transaction_date);

  return (
    <div className="w-full flex-col gap-4 flex">
      <div
        onClick={onClick1}
        className="font-sora cursor-pointer w-full border-b border-gray-200 dark:border-gray-800 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="w-[32px] h-[32px] bg-white rounded-full ">
            {theme === "dark" ? (
              <img src={naijaLogo} alt="" className="w-full h-full bg-cover" />
            ) : (
              <img src={naijaLogo} alt="" className="w-full h-full bg-cover" />
            )}
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white  text-[14px]">
              {payouts?.description}
            </h4>
            <div
              className={`  rounded-md flex mt-1 justify-start items-center bg-opacity-30 dark:bg-opacity-10 ${
                // status === "Successful"
                //   ? "bg-success_green "
                //   : status === "Pending"
                //   ? "bg-pending"
                //   : status === "Failed"
                //   ? "bg-red-500"
                //   : ""

                ""
              }`}
            >
              {/* <div
              className={`w-[6px] h-[6px] rounded-full  ${
                // status === "Successful"
                //   ? "dark:bg-success_green bg-[#0E871D]"
                //   : status === "Pending"
                //   ? "dark:bg-pending bg-[#DD900D]"
                //   : status === "Failed"
                //   ? "bg-red-500"
                //   : ""
                ""
              }
              `}
            /> */}
              <h4
                className={`${
                  payouts?.status === "completed" ||
                  payouts?.status === "successful"
                    ? "dark:text-success_green text-[#0E871D]"
                    : payouts?.status === "pending" ||
                      payouts?.status === "processing"
                    ? "dark:text-pending text-[#DD900D]"
                    : payouts?.status === "failed"
                    ? "text-red-500"
                    : ""
                } text-[12px] capitalize`}
              >
                {payouts?.status}
              </h4>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-black dark:text-white text-right font-medium text-[15px]">
            ₦{formatAmount(Number(payouts?.fiat_amount))}
          </h4>
          <h4 className="text-gray-400 dark:text-gray-500 text-right mt-1 text-[14px]">
            {formattedTime}
          </h4>
        </div>
      </div>
      {kind && (
        <div
          onClick={onClick2}
          className="font-sora cursor-pointer border-b border-gray-200 dark:border-gray-800 py-4 w-full flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] bg-white rounded-full ">
              <img
                src={
                  payouts.crypto_currency === "BTC"
                    ? btc
                    : payouts.crypto_currency === "USDT"
                    ? usdt
                    : payouts.crypto_currency === "ETH"
                    ? eth
                    : payouts.crypto_currency === "SOL"
                    ? solana
                    : payouts.crypto_currency === "TRX"
                    ? trx
                    : ""
                }
                alt=""
                className="w-full h-full bg-cover"
              />
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white  text-[14px]">
                {payouts.transaction_type === "sell" ? "Deposit" : "Deposit"}
              </h4>
              <div
                className={`  rounded-md flex mt-1 justify-start items-center bg-opacity-30 dark:bg-opacity-10 ${
                  // status === "Successful"
                  //   ? "bg-success_green "
                  //   : status === "Pending"
                  //   ? "bg-pending"
                  //   : status === "Failed"
                  //   ? "bg-red-500"
                  //   : ""

                  ""
                }`}
              >
                {/* <div
              className={`w-[6px] h-[6px] rounded-full  ${
                // status === "Successful"
                //   ? "dark:bg-success_green bg-[#0E871D]"
                //   : status === "Pending"
                //   ? "dark:bg-pending bg-[#DD900D]"
                //   : status === "Failed"
                //   ? "bg-red-500"
                //   : ""
                ""
              }
              `}
            /> */}
                <h4
                  className={`${
                    payouts?.status === "completed" ||
                    payouts?.status === "successful"
                      ? "dark:text-success_green text-[#0E871D]"
                      : payouts?.status === "pending" ||
                        payouts?.status === "processing"
                      ? "dark:text-pending text-[#DD900D]"
                      : payouts?.status === "failed"
                      ? "text-red-500"
                      : ""
                  } text-[12px] capitalize`}
                >
                  {payouts?.status}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-black dark:text-white text-right font-medium text-[15px]">
              {formatAmount(Number(payouts?.asset_amount))}{" "}
              {payouts.crypto_currency}
            </h4>
            <h4 className="text-gray-400 dark:text-gray-500 text-right mt-1 text-[14px]">
              {formattedTime}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
