import React, { useEffect } from "react";
import useAuthAxios from "../../../utils/baseAxios";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../constants/api";
import { getFormattedDate } from "../../../utils/formatDate";
import TransactionCard from "../transactionList/TransactionCard";
import toast from "react-hot-toast";
import { errorMessage } from "../../../utils/errorMessage";
import { noWalletTxn } from "../../../assets/images";

const WalletTransactins = () => {
  const axiosInstance = useAuthAxios();
  const getPayouts = async () => {
    const response = await axiosInstance.get(API.getWalletTransactions);
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

  const sortedPayouts = payouts?.sort((a: any, b: any) => {
    return (
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
    );
  });
  return (
    <div className="h-[400px]  overflow-auto mt-4 flex-col flex gap-6 py-4">
      {sortedPayouts?.length >= 1 ? (
        sortedPayouts.slice(0, 4).map((payout: any, index: number) => (
          <div key={index} className="w-full">
            <h4 className="text-gray-500 text-left mb-4 text-[12px]">
              {getFormattedDate(payout.transaction_date)}
            </h4>
            <div className="cursor-pointer w-full">
              <TransactionCard
                payouts={payout}
                onClick1={() => {}}
                onClick2={() => {}}
              />
            </div>
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
