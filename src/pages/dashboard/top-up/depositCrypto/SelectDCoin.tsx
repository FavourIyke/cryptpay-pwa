import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { API } from "../../../../constants/api";
import { useUser } from "../../../../context/user-context";
import useAuthAxios from "../../../../utils/baseAxios";
import { errorMessage } from "../../../../utils/errorMessage";
import { ClipLoader } from "react-spinners";

const SelectDCoin = ({
  setSelectDep,
  setCoinDepDeets,
  setdepositScren,
  setdepositOnboard,
  setOpenDepositNetwork,
}: any) => {
  const axiosInstance = useAuthAxios();
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const getCoins = async () => {
    const response = await axiosInstance.get(API.getCoins);
    return response.data.data;
  };
  const { data: coins, error: error1 } = useQuery({
    queryKey: ["get-coins"],
    queryFn: getCoins,
    retry: 1,
  });

  const getWallets = async () => {
    const response = await axiosInstance.get(API.getWallets);
    return response.data;
  };
  const {
    data: wallets,
    error: error2,
    isLoading,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["get-user-virtual-wallets"],
    queryFn: getWallets,
    retry: 1,
  });

  useEffect(() => {
    if (error1) {
      const newError = error1 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1, error2]);

  const renderContent = () => {
    // Check if there are any enabled wallets
    const enabledWallets = wallets?.wallets?.filter(
      (wallet: any) => wallet.is_enabled
    );

    if (!enabledWallets || enabledWallets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="text-gray-500 dark:text-gray-400 text-center">
            <h4 className="text-[16px] font-medium mb-2">No Enabled Wallets</h4>
            <p className="text-[14px]">
              Please enable wallets in your wallet settings to deposit crypto.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full font-sora mt-6 flex-col flex gap-4">
        {coins?.cryptocurrencies
          .filter((coin: any) => {
            // Only show coins that have enabled wallets
            return enabledWallets.some(
              (wallet: any) => wallet.crypto_symbol === coin.symbol
            );
          })
          .map((coin: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                setCoinDepDeets(coin);
                setSelectDep(false);
                setOpenDepositNetwork(true);
              }}
              className="flex cursor-pointer justify-between px-4 dark:bg-[#292929] bg-[#f6f5f5] rounded-xl py-3 items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full">
                  <img
                    src={coin.logo}
                    alt={`${coin.name} logo`}
                    className="w-full h-full bg-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="dark:text-white text-black font-medium text-[15px]">
                    {coin.name}
                  </h4>
                  <h4 className="text-gray-500 font-medium text-[15px]">
                    {coin.symbol}
                  </h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12 backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6 dark:bg-[#1F1F1F] mt-6 lgss:mt-12`}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectDep(false);
              setdepositOnboard(true);
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
              setSelectDep(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>

        <h4 className="text-black dark:text-gray-100 mt-6 text-[16px] font-semibold">
          Select coin
        </h4>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <ClipLoader color="#0376FF" size={30} />
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default SelectDCoin;
