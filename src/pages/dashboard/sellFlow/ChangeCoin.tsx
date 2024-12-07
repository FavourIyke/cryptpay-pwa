import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { SlArrowLeft } from "react-icons/sl";
import { useStatusBarHeight } from "../../../components/utils/StatusBarH";

const ChangeCoin = ({
  setCoinDeets,
  setNetworks,
  setShowDD,
  setWalletAddy,
  setNetwork,
}: any) => {
  const axiosInstance = useAuthAxios();
  const statusBarHeight = useStatusBarHeight();

  const getCoins = async () => {
    const response = await axiosInstance.get(API.getCoins);
    return response.data.data;
  };
  const { data: coins, error: error2 } = useQuery({
    queryKey: ["get-coins"],
    queryFn: getCoins,
    retry: 1,
  });

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  return (
    <div
      style={{ paddingTop: `${statusBarHeight + 80}px ` }}
      className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start  bg-white dark:bg-primary_dark overflow-auto pb-12  backdrop-blur-sm"
    >
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F]   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setShowDD(false);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
        </div>
        <div className="w-full  mt-6">
          <h4 className="text-black dark:text-gray-100 font-semibold  text-[16px]">
            Select Coin
          </h4>
          <div className="w-full font-sora mt-6 flex-col px-2  flex gap-4">
            {coins?.cryptocurrencies.length >= 1 ? (
              coins?.cryptocurrencies.map((coin: any, index: any) => (
                <div
                  key={index}
                  onClick={() => {
                    setWalletAddy("");
                    setShowDD(false); // Close the coin selection modal by default
                    setNetworks(coin.networks);
                    setNetwork(coin?.networks[0]?.code);
                    setCoinDeets(coin);
                  }}
                  className={`flex cursor-pointer justify-between  py-4 ${
                    coins?.cryptocurrencies?.length === index + 1
                      ? ""
                      : "border-b border-gray-100 dark:border-gray-800"
                  } items-start`}
                >
                  <div className="flex  items-center gap-3">
                    <div className="w-[32px] h-[32px]  rounded-full ">
                      <img
                        src={coin.logo}
                        alt={`${coin.name} logo`}
                        className="w-full h-full bg-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
                        {coin.name}
                      </h4>
                      <h4 className="dark:text-gray-500 text-black font-medium text-[13px]">
                        {coin.symbol}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
                      {Math.round(coin.sell_rate).toLocaleString()}
                      /$
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeCoin;
