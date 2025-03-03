import React from "react";
import { progress } from "../../../assets/images";
const WithdrwaPeending = ({ setWithdrawPending, from, setFrom }: any) => {
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-12 pb-16 overflow-auto bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="flex flex-col px-8 justify-center mt-6 gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={progress} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            In progress
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            Your order has been received. We will notify you when transaction
            gets completed
          </p>
          <button
            onClick={() => {
              setWithdrawPending(false);
            }}
            className={`w-10/12 h-[52px] rounded-[18px] bg-text_blue mt-4 text-white flex justify-center items-center  font-semibold`}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrwaPeending;
