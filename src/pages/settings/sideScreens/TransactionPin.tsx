import React from "react";
import { SlArrowLeft } from "react-icons/sl";

const TransactionPin = ({ setSecScreen }: any) => {
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSecScreen(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Transaction Pin
      </h4>
    </div>
  );
};

export default TransactionPin;
