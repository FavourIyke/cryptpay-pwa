import React from "react";
import { depositIcon, withdrawIcon } from "../../../assets/images";

const TransactionCard = ({
  type,
  status,
  nairaAmount,
  coinAmount,
  coin,
  onClick,
}: any) => {
  return (
    <div
      onClick={onClick}
      className="font-sora cursor-pointer w-full flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-[32px] h-[32px]  rounded-full ">
          <img
            src={
              type === "Deposit"
                ? depositIcon
                : type === "Payout"
                ? withdrawIcon
                : ""
            }
            alt=""
            className="w-full h-full bg-cover"
          />
        </div>
        <div>
          <h4 className="text-white  text-[15px]">
            {type} {coin}
          </h4>

          <h4 className="text-gray-500 mt-1 text-[14px]">
            {coinAmount}{" "}
            {coin === "Solana"
              ? "SOL"
              : coin === "USDT"
              ? "USDT"
              : coin === "Bitcoin"
              ? "BTC"
              : coin === "Ethereum"
              ? "ETH"
              : ""}
          </h4>
        </div>
      </div>
      <div>
        <h4 className="text-white text-right font-medium text-[15px]">
          ₦{nairaAmount.toLocaleString("en-US")}
        </h4>
        <h4
          className={`${
            status === "Successful"
              ? "text-success_green"
              : status === "Pending"
              ? "text-pending"
              : status === "Failed"
              ? "text-red-500"
              : ""
          } mt-1 text-[14px] text-right capitalize`}
        >
          {status}
        </h4>
      </div>
    </div>
  );
};

export default TransactionCard;
