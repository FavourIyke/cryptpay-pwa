import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";

const ChangeCoin = ({
  setCoinDeets,
  setNetworks,
  setShowDD,
  setWalletAddy,
  setNetwork,
}: any) => {
  const axiosInstance = useAuthAxios();

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
    <div className="w-full dark:bg-[#1C1C1C] h-[450px] overflow-auto bg-[#F1F1F1] p-4 rounded-xl mt-3">
      <div className="w-full font-sora mt-6 flex-col flex gap-4">
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
              className="flex cursor-pointer justify-between px-4  dark:bg-[#292929] bg-[#f6f5f5] rounded-xl h-[58px] items-center"
            >
              <div className="flex  items-center gap-3">
                <div className="w-[32px] h-[32px]  rounded-full ">
                  <img
                    src={coin.logo}
                    alt={`${coin.name} logo`}
                    className="w-full h-full bg-cover rounded-full"
                  />
                </div>
                <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
                  {coin.name === "Tether" ? "USDT" : coin.name}
                </h4>
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
  );
};

export default ChangeCoin;
