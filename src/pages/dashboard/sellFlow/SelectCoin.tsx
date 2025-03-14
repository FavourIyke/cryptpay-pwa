import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { toast } from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { useUser } from "../../../context/user-context";

const SelectCoin = ({
  setSelectCoinModal,
  setSelectNetworkModal,
  setCoin,
  setNetworks,
  setSelectBankModal,
  setNetwork,
  sellRateFlow,
  setBuyCoinModal,
  setCoinDeets,
  setSellType,
  setBuyType,
  setSellModal,
  buyType,
  sellType,
  setBuyExModal,
}: any) => {
  const axiosInstance = useAuthAxios();
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");
  const [type, setType] = useState<string>(buyType || sellType || "Celler");

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

  useEffect(() => {
    if (!sellRateFlow) {
      setType(buyType);
    } else {
      setType(sellType);
    }
  }, [buyType, sellRateFlow, sellType]);
  // console.log(type);
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectCoinModal(false);
              setSellModal(true);
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

        <div className="flex w-full mt-4 mb-6 rounded-2xl items-center">
          <button
            onClick={() => {
              setType("Celler");
              if (sellRateFlow) {
                setSellType("Celler");
              } else {
                setBuyType("Celler");
              }
            }}
            className={`py-4 w-full font-semibold text-[14px] border-b-2 ${
              type === "Celler"
                ? `text-gray-900 dark:text-white ${
                    bgColor ? `border-[${bgColor}]` : "border-text_blue"
                  }`
                : "dark:border-[#645D5D] dark:text-[#645D5D] border-[#B7AFAF] text-[#B7AFAF]"
            } flex justify-center items-center`}
          >
            Celler Rate
          </button>
          <button
            onClick={() => {
              setType("Ex");
              if (sellRateFlow) {
                setSellType("Ex");
              } else {
                setBuyType("Ex");
              }
            }}
            className={`py-4 w-full font-semibold text-[14px] border-b-2 ${
              type === "Ex"
                ? `text-gray-900 dark:text-white ${
                    bgColor ? `border-[${bgColor}]` : "border-text_blue"
                  }`
                : "dark:border-[#645D5D] dark:text-[#645D5D] border-[#B7AFAF] text-[#B7AFAF]"
            } flex justify-center items-center`}
          >
            External Rate
          </button>
        </div>
        <h4 className="text-black dark:text-gray-300 mt-2  text-[14px]">
          These are the rates you will be {sellRateFlow ? "selling" : "buying"}{" "}
          a specific asset.
        </h4>
        <div className="w-full font-sora mt-6 flex-col flex gap-4">
          {coins?.cryptocurrencies.length >= 1 ? (
            coins?.cryptocurrencies.map((coin: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  setCoin(coin.symbol);
                  setNetworks(coin.networks);
                  setCoinDeets(coin);
                  setSelectCoinModal(false); // Close the coin selection modal by default

                  if (sellRateFlow) {
                    if (coin.networks.length === 1) {
                      setSelectBankModal(true); // Directly open the bank modal if only one network exists
                      setNetwork(coin.networks[0].code); // Set the network automatically
                    } else {
                      setSelectNetworkModal(true); // Open network selection modal for multiple networks
                    }
                  } else {
                    if (buyType === "Celler") {
                      setBuyExModal(true);
                      // Directly open the bank modal if only one network exists
                    } else if (buyType === "Ex") {
                      if (coin.networks.length === 1) {
                        setBuyCoinModal(true);
                        setNetwork(coin.networks[0].code); // Set the network automatically
                      } else {
                        setSelectNetworkModal(true);
                      }
                    }
                  }
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
                    {sellRateFlow
                      ? Math.round(coin.sell_rate).toLocaleString()
                      : Math.round(coin.buy_rate).toLocaleString()}
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
  );
};

export default SelectCoin;
