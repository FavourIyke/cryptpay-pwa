import React from "react";
import { btc, eth, solana, usdt } from "../../assets/images";
import { SlArrowRight } from "react-icons/sl";

const RateBoard = ({
  sellRateFlow,
  setSellRate,
  setCoin,
  setSelectNetworkModal,
}: any) => {
  return (
    <div className="w-full font-sora mt-12 flex-col flex gap-4">
      <div
        onClick={() => {
          if (sellRateFlow) {
            setSellRate(true);
            setCoin("BTC");
            setSelectNetworkModal(true);
          } else {
            setSellRate(false);
            setCoin("BTC");
            setSelectNetworkModal(true);
          }
        }}
        className="flex cursor-pointer justify-between px-4 dark:bg-[#1C1C1C] bg-[#F1F1F1] rounded-xl h-[58px] items-center"
      >
        <div className="flex  items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={btc} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            Bitcoin
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            1780/$
          </h4>
          <SlArrowRight className="text-black dark:text-white txt-[24px]" />
        </div>
      </div>
      <div
        onClick={() => {
          if (sellRateFlow) {
            setSellRate(true);
            setCoin("ETH");
            setSelectNetworkModal(true);
          } else {
            setSellRate(false);
            setCoin("ETH");
            setSelectNetworkModal(true);
          }
        }}
        className="flex cursor-pointer justify-between px-4 dark:bg-[#1C1C1C] bg-[#F1F1F1] rounded-xl h-[58px] items-center"
      >
        <div className="flex  items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={eth} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            Ethereum
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            1780/$
          </h4>
          <SlArrowRight className="text-black dark:text-white txt-[24px]" />
        </div>
      </div>
      <div
        onClick={() => {
          if (sellRateFlow) {
            setSellRate(true);
            setCoin("USDT");
            setSelectNetworkModal(true);
          } else {
            setSellRate(false);
            setCoin("USDT");
            setSelectNetworkModal(true);
          }
        }}
        className="flex cursor-pointer justify-between px-4 dark:bg-[#1C1C1C] bg-[#F1F1F1] rounded-xl h-[58px] items-center"
      >
        <div className="flex  items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={usdt} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            USDT
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            1780/$
          </h4>
          <SlArrowRight className="text-black dark:text-white txt-[24px]" />
        </div>
      </div>
      <div
        onClick={() => {
          if (sellRateFlow) {
            setSellRate(true);
            setCoin("SOL");
            setSelectNetworkModal(true);
          } else {
            setSellRate(false);
            setCoin("SOL");
            setSelectNetworkModal(true);
          }
        }}
        className="flex cursor-pointer justify-between px-4 dark:bg-[#1C1C1C] bg-[#F1F1F1] rounded-xl h-[58px] items-center"
      >
        <div className="flex  items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={solana} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            Solana
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
            1780/$
          </h4>
          <SlArrowRight className="text-black dark:text-white txt-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default RateBoard;
