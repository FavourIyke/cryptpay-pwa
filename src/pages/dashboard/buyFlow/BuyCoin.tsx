import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { nigeriaFlag } from "../../../assets/images";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import GetRates from "../../../components/utils/GetRates";
import { formatAmount } from "../../../utils/formatDate";
import { useUser } from "../../../context/user-context";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";

const BuyCoin = ({
  setBuyCoinModal,
  setBuyCoinAddy,
  coin,
  setSelectNetworkModal,
  network,
  coinAmount,
  setCoinAmount,
  nairaAmount,
  setNairaAmount,
}: any) => {
  const [isNairaToCoin, setIsNairaToCoin] = useState(true);
  const { userDetails, displayColor } = useUser();
  //  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const rate = GetRates("USDT", "buy");
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
  const selectedCoin = coins?.cryptocurrencies.find(
    (c: any) => c.symbol === coin
  );

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);

  const formatValue = (value: string) => {
    const number = parseFloat(value.replace(/,/g, ""));
    return isNaN(number)
      ? ""
      : number.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const handleNairaAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setNairaAmount(value);
    if (value) {
      setCoinAmount((parseFloat(value) / calculatedRate).toFixed(2));
    } else {
      setCoinAmount("");
    }
  };

  const handleCoinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setCoinAmount(value);
    if (value) {
      setNairaAmount((parseFloat(value) * calculatedRate).toFixed(2));
    } else {
      setNairaAmount("");
    }
  };
  const handleExchangeToggle = () => {
    setIsNairaToCoin(!isNairaToCoin);
  };
  const fiatBalance = userDetails?.data?.profile?.fiat_balance;
  // console.log(fiatBalance);
  const validateAmount = (buyAmount: number) => {
    if (buyAmount > fiatBalance) {
      toast.error(`You don't have sufficient funds. Top up your balance`);
      return false;
    }
    return true;
  };

  const handleProceed = () => {
    if (!validateAmount(Number(nairaAmount))) {
      return;
    }
    setBuyCoinModal(false);
    setBuyCoinAddy(true);
  };

  const getCoinPrices = async () => {
    const response = await axiosInstance.get(API.getCoinPrices);
    return response.data.data;
  };
  const {
    data: prices,
    error: error3,
    isLoading,
  } = useQuery({
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
  const coinRate = prices?.cryptocurrencies[coin];
  const calculatedRate = coinRate * rate;

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyCoinModal(false);
              setSelectNetworkModal(true);
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
              setBuyCoinModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Buy {coin}
        </h4>
        <div className="w-full mt-8 ">
          <div className="w-full mt-6">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h4 className="dark:text-white text-gray-800 font-medium text-[14px]">
                  {isNairaToCoin
                    ? "You’ll pay (NGN)"
                    : `You’ll receive (${coin})`}
                </h4>
              </div>
              <div className="w-full bg-transparent  flex justify-between items-center dark:bg-transparent bg-[#FAFAFA] border outline-none dark:border-gray-400 border-gray-300 rounded-xl h-[52px] px-4 text-[14px] text-gray-800 dark:text-[#F9FAFB] mt-4">
                <div className="w-[24px] h-[24px]">
                  <img
                    src={isNairaToCoin ? nigeriaFlag : selectedCoin?.logo}
                    alt={`${coin.name || "Currency"} logo`} // Fallback alt text
                    className="w-full h-full bg-cover rounded-full"
                  />
                </div>
                <input
                  type="text"
                  value={
                    isNairaToCoin
                      ? formatValue(nairaAmount)
                      : formatValue(coinAmount)
                  }
                  onChange={
                    isNairaToCoin
                      ? handleNairaAmountChange
                      : handleCoinAmountChange
                  }
                  placeholder="Amount"
                  className="outline-none w-10/12 bg-transparent text-right"
                />
              </div>
              <div className="flex justify-between items-center mt-2 w-full">
                <h4 className="dark:text-gray-400 text-gray-500 text-[12px] font-bold mt-1">
                  NGN {isLoading ? "---" : formatAmount(calculatedRate)} = 1{" "}
                  {coin}
                </h4>
                <h4 className="dark:text-gray-400 text-gray-500 text-[12px] font-bold mt-1">
                  Wallet Balance: ₦{formatAmount(Number(fiatBalance))}
                </h4>
              </div>
            </div>
            <div
              className="w-[24px] h-[24px] flex justify-center mt-6 items-center mx-auto rounded-md border-2 bg-transparent border-[#5E91FF] text-[#5E91FF] cursor-pointer"
              onClick={handleExchangeToggle}
            >
              <CgArrowsExchangeAltV className="text-[17px]" />
            </div>
            <div className="w-full mt-4">
              <div className="flex justify-between items-center">
                <h4 className="dark:text-white text-gray-800 font-medium text-[14px]">
                  {isNairaToCoin
                    ? `You’ll receive (${coin})`
                    : "You’ll pay (NGN)"}
                </h4>
              </div>
              <div className="w-full bg-transparent  flex justify-between items-center dark:bg-transparent bg-[#FAFAFA] border outline-none dark:border-gray-400 border-gray-300 rounded-xl h-[52px] px-4 text-[14px] text-gray-800 dark:text-[#F9FAFB] mt-4">
                <div className="w-[24px] h-[24px]">
                  <img
                    src={isNairaToCoin ? selectedCoin?.logo : nigeriaFlag}
                    className="w-full h-full bg-cover rounded-full"
                    alt=""
                  />
                </div>
                <h4 className="text-[14px] dark:text-[#F9FAFB] text-gray-800">
                  {isNairaToCoin
                    ? formatValue(coinAmount)
                    : formatValue(nairaAmount)}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={!coinAmount}
          onClick={handleProceed}
          style={{
            backgroundColor: !coinAmount ? "" : bgColor,
          }}
          className={`w-full h-[52px] rounded-[18px] mt-8 ${
            !coinAmount
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"} text-white`
          }  flex justify-center items-center  font-semibold`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyCoin;
