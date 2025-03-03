import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { formatAmount } from "../../../../utils/formatDate";
import { API } from "../../../../constants/api";
import useAuthAxios from "../../../../utils/baseAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorMessage } from "../../../../utils/errorMessage";
import GetRates from "../../../../components/utils/GetRates";
import { ClipLoader } from "react-spinners";
import { useUser } from "../../../../context/user-context";
const SellPreview = ({
  setSellFromExModal,
  setSellPreviewModal,
  amountEx,
  coinDeets,
  setSellPendingModal,
  from,
  setFrom,
}: any) => {
  const axiosInstance = useAuthAxios();
  const { refetch1, displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");
  const queryClient = useQueryClient();
  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const getSellRate = (symbol: string) => {
    return GetRates(symbol, "sell");
  };
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
  const getCoins = async () => {
    const response = await axiosInstance.get(API.getCoins);
    return response.data.data;
  };
  const { data: coins, error: error1 } = useQuery({
    queryKey: ["get-coins"],
    queryFn: getCoins,
    retry: 1,
  });
  const selectedCoin = coins?.cryptocurrencies?.find(
    (coin: any) => coin.symbol === coinDeets?.crypto_symbol
  );

  const coinRate =
    prices?.cryptocurrencies[
      from === "SidePage" ? selectedCoin?.symbol : coinDeets?.symbol
    ];
  const calculatedRate =
    coinRate *
    getSellRate(
      from === "SidePage" ? selectedCoin?.symbol : coinDeets?.symbol
    ) *
    Number(amountEx);
  const sellCoin = async (data: any) => {
    const response = await axiosInstance.post(API.sellCrypto, data);
    return response.data;
  };
  const completeSellCoin = useMutation({
    mutationFn: sellCoin,
    onSuccess: (r) => {
      toast.success(r.message);
      refetch1();
      queryClient.invalidateQueries({ queryKey: ["userDetailsx"] });
      setTimeout(() => {
        setSellPreviewModal(false);
        setSellPendingModal(true);
      }, 2000);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSellPreviewModal(false);
              setSellFromExModal(true);
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
              setSellPreviewModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="w-full mt-4">
          <div className="w-full flex flex-col justify-center items-center">
            <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
              You’re about to sell
            </h4>

            <h4
              className={` ${`dark:text-pending text-[#F3A218]`}  text-[18px] mt-1 `}
            >
              {formatAmount(amountEx)}{" "}
              <span className="text-gray-800 dark:dark:text-white  font-normal">
                {from === "SidePage"
                  ? selectedCoin?.symbol
                  : coinDeets?.crypto_symbol}
              </span>
            </h4>
            <div className="flex justify-center items-center mt-2 gap-2">
              <h4 className=" text-gray-500 dark:text-gray-400  text-[14px] ">
                for NGN {formatAmount(calculatedRate)}
              </h4>
            </div>
          </div>
          <div className="w-full  rounded-xl mt-6 p-4 bg-[#F1F1F1] dark:bg-[#2f2e2e]">
            <div className="w-full  flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[14px] ">
                Exchange Rate
              </h4>
              <h4 className="text-gray-800 dark:text-white text-[14px] font-semibold ">
                {formatAmount(
                  Number(
                    from === "SidePage"
                      ? selectedCoin?.sell_rate
                      : coinDeets?.sell_rate
                  )
                )}
                /$
              </h4>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[14px] ">
                Transaction Fee
              </h4>
              <h4 className="text-gray-800 dark:text-white text-[14px] font-semibold ">
                0{" "}
                {from === "SidePage"
                  ? selectedCoin?.symbol
                  : coinDeets?.crypto_symbol}
              </h4>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="text-gray-800 dark:text-gray-400 text-[14px] ">
                Estimated Value
              </h4>
              <h4 className="text-gray-800 dark:text-white text-[14px] font-semibold ">
                {formatAmount(Number(amountEx))}{" "}
                {from === "SidePage" ? selectedCoin?.symbol : coinDeets?.symbol}
              </h4>
            </div>
          </div>
          <div className="mt-36 flex justify-center items-center gap-4 w-full">
            <button
              onClick={() => {
                setSellPreviewModal(false);
              }}
              style={{
                border: `1px solid ${bgColor}`,
              }}
              className={`w-1/2  text-[14px] rounded-2xl h-[52px] border ${
                bgColor
                  ? `border-[${bgColor}] text-gray-900 dark:text-gray-100`
                  : "text-gray-900 dark:text-gray-100 border-text_blue"
              } flex justify-center items-center`}
            >
              Cancel trade
            </button>
            <button
              onClick={() => {
                completeSellCoin.mutate({
                  crypto_type:
                    from === "SidePage"
                      ? selectedCoin?.symbol
                      : coinDeets?.crypto_symbol,
                  amount: amountEx,
                });
              }}
              style={{
                backgroundColor: bgColor,
              }}
              className={`w-1/2 text-white text-[14px] rounded-2xl h-[52px] ${
                bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
              } flex justify-center items-center`}
            >
              {completeSellCoin.isPending ? (
                <ClipLoader color="#FFFFFF" size={30} />
              ) : (
                "Sell"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPreview;
