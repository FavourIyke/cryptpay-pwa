import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { toast } from "react-toastify";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";

const SelectCoin = ({
  setSelectCoinModal,
  setSelectNetworkModal,
  setCoin,
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
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectCoinModal(false);
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
              setSelectCoinModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 mt-4 dark:text-gray-100 font-semibold text-[20px]">
          Select Coin
        </h4>
        <h4 className="text-black dark:text-gray-300 mt-2  text-[14px]">
          Select an asset to start trading
        </h4>
        <div className="w-full font-sora mt-6 flex-col flex gap-4">
          {coins?.cryptocurrencies.length >= 1 ? (
            coins?.cryptocurrencies.map((coin: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  setCoin(coin.symbol);
                  setNetworks(coin.networks);
                  setSelectNetworkModal(true);
                }}
                className="flex cursor-pointer justify-between py-4  rounded-xl h-[58px] items-center"
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
                    1780/$
                  </h4>
                  <SlArrowRight className="text-black dark:text-white text-[14px]" />
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCoin;
