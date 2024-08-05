import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { paddingX } from "../../constants";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import RateBoard from "./RateBoard";
import TransactionCard from "./transactionList/TransactionCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [sellRate, setSellRate] = useState<boolean>(false);

  return (
    <div
      className={` w-full font-sora h-full lgss:h-screen pb-16 lgss:pb-0 dark:bg-primary_dark `}
    >
      <Navbar />
      <div className={`${paddingX} w-full mt-12 lgss:flex lgss:gap-12 `}>
        <div className="w-full lgss:w-3/5">
          <div className="w-full  h-[401px] flex justify-center items-center">
            <div className="w-full bg-dashboardBg bg-cover bg-center py-6 rounded-[40px] h-full flex flex-col gap-24 justify-end items-center">
              <div>
                <h4 className="uppercase text-center text-white tracking-wider text-[10px] font-semibold ">
                  total payout
                </h4>
                <div className="flex  justify-center mt-3 items-center gap-4">
                  <h4 className="text-[40px] text-white">
                    {showBalance ? `$7,524` : "*****"}.
                    <span className="text-[#646464]">
                      {showBalance ? `08` : "**"}
                    </span>
                  </h4>
                  {showBalance ? (
                    <VscEyeClosed
                      onClick={() => setShowBalance((prev) => !prev)}
                      className="text-white cursor-pointer text-[16px]"
                    />
                  ) : (
                    <VscEye
                      onClick={() => setShowBalance((prev) => !prev)}
                      className="text-white cursor-pointer text-[16px]"
                    />
                  )}
                </div>
                <h4 className="mt-1 text-center text-white  text-[12px]  ">
                  ~ NGN 10,235,674.98
                </h4>
              </div>
              <div className="flex gap-12 justify-center items-center">
                <div>
                  <button className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center">
                    <BsArrowUp className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    Sell
                  </h4>
                </div>
                <div>
                  <button className="w-[45px] h-[45px] rounded-full bg-text_blue flex justify-center items-center">
                    <BsArrowDown className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    Buy
                  </h4>
                </div>
                <div>
                  <button className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center">
                    <IoIosMore className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    More
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[70%] xs:w-3/5 mds:w-1/2 mt-8 px-2 bg-[#1C1C1C] h-[56px] rounded-2xl items-center">
            <button
              onClick={() => setSellRate(false)}
              className={
                sellRate
                  ? "h-[40px] w-[48%] rounded-full  font-semibold text-[14px] text-[#A0A0A0] flex justify-center items-center"
                  : "h-[40px] w-[48%] rounded-full text-white font-semibold text-[14px] bg-text_blue flex justify-center items-center"
              }
            >
              Buy Rate
            </button>
            <button
              onClick={() => setSellRate(true)}
              className={
                !sellRate
                  ? "h-[40px] w-[48%] rounded-full  font-semibold text-[14px] text-[#A0A0A0] flex justify-center items-center"
                  : "h-[40px] w-[48%] rounded-full text-white font-semibold text-[14px] bg-text_blue flex justify-center items-center"
              }
            >
              Sell Rate
            </button>
          </div>
          <h4 className="text-gray-300 mt-10 text-[16px] font-medium">
            This are the rates you will be buying a specific asset at{" "}
          </h4>
          <RateBoard />
        </div>
        <div className="w-full lgss:w-2/5 mt-12 lgss:mt-6">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-white  text-[15px] ">Recent Transactions</h4>
            <Link to="/transactions" className="text-[15px] text-text_blue">
              View all
            </Link>
          </div>
          <div className="h-[600px] lgss:h-[800px] mt-8 flex-col flex gap-6 py-4">
            <TransactionCard
              type="Deposit"
              status="Pending"
              nairaAmount={300}
              coin="Solana"
              coinAmount={200}
            />
            <TransactionCard
              type="Payout"
              status="Successful"
              nairaAmount={156092}
              coin="Bitcoin"
              coinAmount={0.05}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
