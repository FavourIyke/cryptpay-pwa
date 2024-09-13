import React, { useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import useAuthAxios from "../../utils/baseAxios";

const RateBoard = ({
  sellRateFlow,
  setSellRate,
  setCoin,
  setSelectNetworkModal,
  networks,
  setNetworks,
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
    <div className="w-full font-sora mt-12 flex-col flex gap-4">
      {coins?.cryptocurrencies.length >= 1 ? (
        coins?.cryptocurrencies.map((coin: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              if (sellRateFlow) {
                setSellRate(true);
                setCoin(coin.symbol);
                setNetworks(coin.networks);
                setSelectNetworkModal(true);
              }
              // else {
              //   setSellRate(false);
              //   setCoin(coin.symbol);
              //   setNetworks(coin.networks);
              //   setSelectNetworkModal(true);
              // }
            }}
            className="flex cursor-pointer justify-between px-4 dark:bg-[#1C1C1C] bg-[#F1F1F1] rounded-xl h-[58px] items-center"
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
                {coin.name}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="dark:text-gray-400 text-black font-medium text-[15px]">
                {coin.sell_rate}/$
              </h4>
              <SlArrowRight className="text-black dark:text-white text-[14px]" />
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RateBoard;
