import React from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { btc, eth, usdt, solana } from "../../../assets/images";

const SelectCoin = ({
  setSelectCoinModal,
  setSelectNetworkModal,
  setCoin,
}: any) => {
  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectCoinModal(false);
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
              setSelectCoinModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 mt-4 dark:text-gray-100 font-semibold text-[20px]">
          Select Coin
        </h4>
        <h4 className="text-black dark:text-gray-300 mt-2  text-[14px]">
          Select an asset to start trading
        </h4>
        <div className="w-full font-sora mt-6 flex-col flex gap-4">
          <div
            onClick={() => {
              setCoin("BTC");
              setSelectNetworkModal(true);
              setSelectCoinModal(false);
            }}
            className="flex cursor-pointer justify-between px-4  rounded-xl h-[58px] items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px]  rounded-full ">
                <img src={btc} alt="" className="w-full h-full bg-cover" />
              </div>
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                Bitcoin
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                1780/$
              </h4>
              <SlArrowRight className="text-black dark:text-white txt-[24px]" />
            </div>
          </div>
          <div
            onClick={() => {
              setCoin("ETH");
              setSelectNetworkModal(true);
              setSelectCoinModal(false);
            }}
            className="flex cursor-pointer justify-between px-4  rounded-xl h-[58px] items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px]  rounded-full ">
                <img src={eth} alt="" className="w-full h-full bg-cover" />
              </div>
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                Ethereum
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                1780/$
              </h4>
              <SlArrowRight className="text-black dark:text-white txt-[24px]" />
            </div>
          </div>
          <div
            onClick={() => {
              setCoin("USDT");
              setSelectNetworkModal(true);
              setSelectCoinModal(false);
            }}
            className="flex cursor-pointer justify-between px-4  rounded-xl h-[58px] items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px]  rounded-full ">
                <img src={usdt} alt="" className="w-full h-full bg-cover" />
              </div>
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                USDT
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                1780/$
              </h4>
              <SlArrowRight className="text-black dark:text-white txt-[24px]" />
            </div>
          </div>
          <div
            onClick={() => {
              setCoin("SOL");
              setSelectNetworkModal(true);
              setSelectCoinModal(false);
            }}
            className="flex cursor-pointer justify-between px-4  rounded-xl h-[58px] items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px]  rounded-full ">
                <img src={solana} alt="" className="w-full h-full bg-cover" />
              </div>
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                Solana
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="text-black dark:text-gray-400 font-medium text-[12px]">
                1780/$
              </h4>
              <SlArrowRight className="text-black dark:text-white txt-[24px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCoin;
