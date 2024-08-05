import React from "react";
import { btc, eth, solana, usdt } from "../../assets/images";
import { SlArrowRight } from "react-icons/sl";

const RateBoard = () => {
  return (
    <div className="w-full font-sora mt-12 flex-col flex gap-4">
      <div className="flex justify-between px-4 bg-[#1C1C1C] rounded-xl h-[58px] items-center">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={btc} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="text-gray-400 font-medium text-[15px]">Bitcoin</h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-gray-400 font-medium text-[15px]">1780/$</h4>
          <SlArrowRight className="text-white txt-[24px]" />
        </div>
      </div>
      <div className="flex justify-between px-4 bg-[#1C1C1C] rounded-xl h-[58px] items-center">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={eth} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="text-gray-400 font-medium text-[15px]">Ethereum</h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-gray-400 font-medium text-[15px]">1780/$</h4>
          <SlArrowRight className="text-white txt-[24px]" />
        </div>
      </div>
      <div className="flex justify-between px-4 bg-[#1C1C1C] rounded-xl h-[58px] items-center">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={usdt} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="text-gray-400 font-medium text-[15px]">USDT</h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-gray-400 font-medium text-[15px]">1780/$</h4>
          <SlArrowRight className="text-white txt-[24px]" />
        </div>
      </div>
      <div className="flex justify-between px-4 bg-[#1C1C1C] rounded-xl h-[58px] items-center">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px]  rounded-full ">
            <img src={solana} alt="" className="w-full h-full bg-cover" />
          </div>
          <h4 className="text-gray-400 font-medium text-[15px]">Solana</h4>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-gray-400 font-medium text-[15px]">1780/$</h4>
          <SlArrowRight className="text-white txt-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default RateBoard;
