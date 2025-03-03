import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorMessage } from "../../../utils/errorMessage";
import { formatAmount } from "../../../utils/formatDate";
import useAuthAxios from "../../../utils/baseAxios";
import { API } from "../../../constants/api";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { ClipLoader } from "react-spinners";
const Assets = ({
  setAssets,
  setWithdrawalOnboard,
  setRecipientAddyModal,
  setWithrawcoindeets,
  setWithdrawalNetwork,
}: any) => {
  const axiosInstance = useAuthAxios();

  const getWallets = async () => {
    const response = await axiosInstance.get(API.getWallets);
    return response.data;
  };
  const {
    data: wallets,
    error: error2,
    isLoading,
  } = useQuery({
    queryKey: ["get-user-wallets"],
    queryFn: getWallets,
    retry: 1,
  });

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  const getCoinPrices = async () => {
    const response = await axiosInstance.get(API.getCoinPrices);
    return response.data.data;
  };
  const { data: prices, error: error3 } = useQuery({
    queryKey: ["get-coin-prices"],
    queryFn: getCoinPrices,
    retry: 1,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-start pt-12 overflow-auto pb-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setAssets(false);
              setWithdrawalOnboard(true);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
          <button
            onClick={() => {
              setAssets(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-8  font-semibold text-[20px]">
          Select Asset
        </h4>
        {isLoading ? (
          <div className="w-full flex justify-center pt-10 items-center">
            <ClipLoader color="#0376FF" size={30} />{" "}
          </div>
        ) : (
          <div>
            {wallets?.wallets?.map((wallet: any, index: number) => {
              const coinRate = prices?.cryptocurrencies[wallet?.crypto_symbol];
              const calculatedGet = coinRate * Number(wallet?.balance);

              // Only render if the wallet is enabled AND the toggle is on in localStorage
              if (!wallet.is_enabled) {
                return null;
              }

              return (
                <div
                  key={index}
                  onClick={() => {
                    setWithrawcoindeets(wallet);
                    setAssets(false);
                    setWithdrawalNetwork(true);
                  }}
                  className="w-full flex justify-between items-center mt-6"
                >
                  <div className="flex justify-start gap-2 items-center">
                    <div className="w-[34px] bg-white h-[34px] rounded-full">
                      <img
                        src={wallet?.crypto_logo}
                        className="rounded-full object-contain w-full h-full"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="flex justify-start items-center gap-2">
                        <h4 className="text-gray-800 dark:text-gray-100 text-[14px]">
                          {wallet?.crypto_symbol}
                        </h4>
                        <div className="px-2 py-1 text-gray-900 dark:text-gray-100 text-[9px] bg-gray-200 dark:bg-[#2F2F2F] rounded-[4px]">
                          {wallet?.crypto_name}
                        </div>
                      </div>
                      <div className="text-gray-500 text-[10px] mt-1">
                        $ {formatAmount(coinRate)}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <h4 className="text-gray-900 text-right dark:text-gray-100 text-[14px]">
                      {formatAmount(wallet?.balance)}
                    </h4>
                    <div className="text-gray-500 mt-1 text-right dark:text-gray-500 text-[9px]">
                      $ {formatAmount(calculatedGet)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;
