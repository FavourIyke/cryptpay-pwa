import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import TransactionCard from "../dashboard/transactionList/TransactionCard";
import TransactionDetails from "./TransactionDetails";

const Transactions = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 dark:bg-primary_dark `}
    >
      <Navbar />
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border border-[#303030] rounded-xl mx-auto p-6 bg-[#1F1F1F] mt-12  lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="text-gray-100 font-semibold text-[20px]">
            All Transactions
          </h4>
          <Link
            to={showHistory ? "/transactions" : "/dashboard"}
            onClick={() => {
              if (showHistory) {
                setShowHistory(false);
              }
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-white text-[14px]" />
          </Link>
        </div>
        {showHistory ? (
          <TransactionDetails status="Pending" />
        ) : (
          <div className="h-[300px] lgss:h-[400px] mt-8 flex-col flex gap-6 py-4">
            <TransactionCard
              type="Deposit"
              status="Pending"
              nairaAmount={300}
              coin="Solana"
              coinAmount={200}
              onClick={() => setShowHistory(true)}
            />
            <TransactionCard
              type="Payout"
              status="Successful"
              nairaAmount={156092}
              coin="Bitcoin"
              coinAmount={0.05}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
