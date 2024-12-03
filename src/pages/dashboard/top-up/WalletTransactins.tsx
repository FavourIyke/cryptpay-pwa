import React, { useEffect } from "react";
import useAuthAxios from "../../../utils/baseAxios";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../constants/api";
import TransactionCard from "../transactionList/TransactionCard";
import toast from "react-hot-toast";
import { errorMessage } from "../../../utils/errorMessage";
import { noWalletTxn } from "../../../assets/images";
import { format, isToday, isYesterday, parseISO } from "date-fns";

const WalletTransactins = () => {
  const axiosInstance = useAuthAxios();
  const getPayouts = async () => {
    const response = await axiosInstance.get(API.getWalletTransactions);
    return response.data.data;
  };
  const { data: payouts, error: error3 } = useQuery({
    queryKey: ["get-wallet-txns"],
    queryFn: getPayouts,
    retry: 1,
  });
  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);

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

  // console.log(payouts);
  const groupedPayouts = groupTransactionsByDate(sortedPayouts?.slice() || []);

  return (
    <div className="h-[400px]  overflow-auto mt-4 flex-col flex gap-6 py-4">
      {sortedPayouts?.length >= 1 ? (
        Object.entries(groupedPayouts).map(([dateLabel, transactions]) => (
          <div key={dateLabel} className="w-full">
            <h4 className="text-gray-500 text-left mb-4 text-[12px]">
              {dateLabel}
            </h4>
            {transactions.map((payout: any, index: number) => (
              <div key={index} className="w-full">
                <div className="cursor-pointer w-full">
                  <TransactionCard
                    payouts={payout}
                    onClick1={() => {}}
                    onClick2={() => {}}
                    kind={payout?.transaction_type === "topup" ? false : true}
                  />
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col h-full px-12   justify-start mt-12 items-center">
          <img src={noWalletTxn} alt="" />
          <h4 className="text-[14px] mt-10 text-center text-gray-800 dark:text-gray-500">
            There are no transaction available yet
          </h4>
        </div>
      )}
    </div>
  );
};

export default WalletTransactins;
