import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { cryptpay, darkCrypt } from "../../assets/images";
import { API } from "../../constants/api";
import { useUser } from "../../context/user-context";
import useAuthAxios from "../../utils/baseAxios";
import { errorMessage } from "../../utils/errorMessage";

import TransactionCard from "../dashboard/transactionList/TransactionCard";
import DepositDetails from "../transactions/DepositDetails";
import TransactionDetails from "../transactions/TransactionDetails";
import { SlArrowLeft } from "react-icons/sl";

const History = () => {
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
    const response = await axiosInstance.get(API.getAllTransactions);
    return response.data.data;
  };
  const { data: payouts, error: error3 } = useQuery({
    queryKey: ["get-all-payouts"],
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
  const groupTransactionsByDate = (transactions: any[]) => {
    const groupedTransactions: { [key: string]: any[] } = {};

    transactions.forEach((transaction) => {
      const transactionDate = parseISO(transaction.transaction_date);
      let dateLabel = format(transactionDate, "MMMM d, yyyy");

      if (isToday(transactionDate)) {
        dateLabel = "Today";
      } else if (isYesterday(transactionDate)) {
        dateLabel = "Yesterday";
      }

      if (!groupedTransactions[dateLabel]) {
        groupedTransactions[dateLabel] = [];
      }
      groupedTransactions[dateLabel].push(transaction);
    });

    return groupedTransactions;
  };

  const groupedPayouts = groupTransactionsByDate(sortedPayouts || []);
  return (
    <div className="lgss:flex font-manrope  lgss:flex-row h-screen lgss:h-screen bg-[#F7F8F9]   dark:bg-primary_dark">
      <Sidebar />
      <div
        className={`w-full  lgss:w-[80%] font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
      >
        <Navbar />
        <div
          className={` w-[96%] mds:w-9/12  md:6/12 lgss:w-3/5 xxl:w-[35%] xxxl:w-[25%]  rounded-xl mx-auto p-4 mds:p-6   mt-16 lgss:mt-12  `}
        >
          <div className="w-full flex flex-row gap-2 justify-start items-center">
            {showHistory === 2 || showHistory === 3 ? (
              <button
                onClick={() => {
                  if (showHistory === 2 || showHistory === 3) {
                    setShowHistory(1);
                  }
                }}
                className="w-[40px] h-[40px] rounded-full  flex justify-center items-center"
              >
                <SlArrowLeft className="text-black dark:text-white text-[20px]" />
              </button>
            ) : null}
            <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
              {showHistory === 1 && "All Transactions"}
            </h4>
          </div>
          {showHistory === 2 ? (
            <TransactionDetails clickedPayout={clickedPayout} />
          ) : showHistory === 3 ? (
            <DepositDetails clickedPayout={clickedPayout} />
          ) : (
            <div className=" overflow-auto mt-4 flex-col flex gap-6 py-4">
              {sortedPayouts?.length >= 1 ? (
                Object.entries(groupedPayouts).map(
                  ([dateLabel, transactions]) => (
                    <div key={dateLabel} className="w-full">
                      <h4 className="text-gray-500 text-left mb-4 text-[12px]">
                        {dateLabel}
                      </h4>
                      {transactions.map((payout: any, index: number) => (
                        <div key={index} className="w-full">
                          <div className="cursor-pointer w-full">
                            <TransactionCard
                              payouts={payout}
                              onClick1={() => {
                                setClickedPayout(payout);
                                setShowHistory(2);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )
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
    </div>
  );
};

export default History;
