import React from "react";
import { noWalletTxn } from "../../assets/images";

const Transaction = () => {
  return (
    <div className="w-full h-full">
      <h4 className="text-gray-900 dark:text-white text-[16px] font-semibold">
        Transaction
      </h4>
      <div className="h-[300px] lg:h-[250px] flex flex-col justify-center items-center mt-4 overflow-auto py-4">
        <div className="w-full flex flex-col h-full px-12   justify-start mt-12 items-center">
          <img src={noWalletTxn} alt="" />
          <h4 className="text-[14px] mt-4 text-center text-gray-800 w-2/3 dark:text-gray-500">
            Your recent Transactions will appear here
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
