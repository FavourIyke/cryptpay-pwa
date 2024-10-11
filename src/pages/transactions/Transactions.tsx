import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import TransactionCard from "../dashboard/transactionList/TransactionCard";
import TransactionDetails from "./TransactionDetails";
import { cryptpay, darkCrypt } from "../../assets/images";
import { useUser } from "../../context/user-context";
import { getFormattedDate } from "../../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import useAuthAxios from "../../utils/baseAxios";
import DepositDetails from "./DepositDetails";

const Transactions = () => {
  const [showHistory, setShowHistory] = useState<number>(1);
  const [clickedPayout, setClickedPayout] = useState<any[]>([]);
  const { theme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const axiosInstance = useAuthAxios();
  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return cryptpay;
    } else if (theme === "light") {
      return darkCrypt;
    } else if (theme === "system") {
      return darkQuery.matches ? cryptpay : darkCrypt;
    }
    return darkCrypt; // fallback in case of an unexpected value
  };
  const getPayouts = async () => {
    const response = await axiosInstance.get(API.getTransactions);
    return response.data.data;
  };
  const { data: payouts, error: error3 } = useQuery({
    queryKey: ["get-payouts"],
    queryFn: getPayouts,
    retry: 1,
  });
  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);
  // console.log(payouts);

  const sortedPayouts = payouts?.sort((a: any, b: any) => {
    return (
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
    );
  });
  return (
    <div
      className={` w-full font-sora overflow-auto h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <Navbar />
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
            All Transactions
          </h4>
          {showHistory === 2 || showHistory === 3 ? (
            <button
              onClick={() => {
                if (showHistory === 2 || showHistory === 3) {
                  setShowHistory(1);
                }
              }}
              className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
            >
              <IoClose className="text-black dark:text-white text-[14px]" />
            </button>
          ) : null}
          {showHistory === 1 ? (
            <Link
              to={"/dashboard"}
              className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
            >
              <IoClose className="text-black dark:text-white text-[14px]" />
            </Link>
          ) : null}
        </div>
        {showHistory === 2 ? (
          <TransactionDetails clickedPayout={clickedPayout} />
        ) : showHistory === 3 ? (
          <DepositDetails clickedPayout={clickedPayout} />
        ) : (
          <div className="h-[600px] lgss:h-[700px] overflow-auto mt-4 flex-col flex gap-6 py-4">
            {sortedPayouts?.length >= 1 ? (
              sortedPayouts.map((payout: any, index: any) => (
                <div onClick={() => {}} key={index} className="w-full">
                  <h4 className="text-gray-500 text-left mb-4 text-[12px]">
                    {getFormattedDate(payout.transaction_date)}
                  </h4>
                  <TransactionCard
                    payouts={payout}
                    onClick1={() => {
                      setClickedPayout(payout);
                      setShowHistory(2);
                    }}
                    onClick2={() => {
                      setClickedPayout(payout);
                      setShowHistory(3);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col h-full px-12   justify-start mt-12 items-center">
                <img src={getThemeBasedImage()} alt="" />
                <h4 className="text-[14px] mt-10 text-center text-gray-800 dark:text-gray-500">
                  There are no transaction available yet
                </h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
