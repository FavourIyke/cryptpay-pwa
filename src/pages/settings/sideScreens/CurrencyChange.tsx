import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useUser } from "../../../context/user-context";

const CurrencyChange = ({ setMode }: any) => {
  const { setUserCurrency, userCurrency } = useUser();
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setMode(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Currency
      </h4>
      <div className="mt-12 w-full">
        <button
          onClick={() => {
            setUserCurrency("USD");
          }}
          className="w-full border-b border-[#505050] pb-6 flex justify-between mt-8 items-center"
        >
          <h4 className="text-gray-800 dark:text-gray-50 text-[14px]">
            United state Dollar (USD)
          </h4>
          <div
            className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
              userCurrency === "USD"
                ? "border-[#5E91FF]  "
                : "bg-transparent border-[#505050]"
            } border `}
          >
            <div
              className={`w-full h-full rounded-full  ${
                userCurrency === "USD" ? " bg-[#5E91FF] " : "bg-transparent "
              } `}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setUserCurrency("NGN");
          }}
          className="w-full border-b border-[#505050] pb-6 flex justify-between mt-8 items-center"
        >
          <h4 className="text-gray-800 dark:text-gray-50 text-[14px]">
            Nigerian Naira (NGN)
          </h4>
          <div
            className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
              userCurrency === "NGN"
                ? "border-[#5E91FF]  "
                : "bg-transparent border-[#505050]"
            } border `}
          >
            <div
              className={`w-full h-full rounded-full  ${
                userCurrency === "NGN" ? " bg-[#5E91FF] " : "bg-transparent "
              } `}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurrencyChange;
