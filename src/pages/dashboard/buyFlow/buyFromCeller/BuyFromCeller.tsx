import React, { useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { nigeriaFlag, progress } from "../../../../assets/images";
import { formatAmount } from "../../../../utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import GetRates from "../../../../components/utils/GetRates";
import { API } from "../../../../constants/api";
import { useUser } from "../../../../context/user-context";
import useAuthAxios from "../../../../utils/baseAxios";
import { errorMessage } from "../../../../utils/errorMessage";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const BuyFromCeller = ({
  setSelectCoinModal,
  coin,
  network,
  coinAmount,
  setCoinAmount,
  nairaAmount,
  setNairaAmount,
  setBuyExModal,
  setOpenDeposit,
  setBuySummary,
  setBuyReceiptModal,
  setBuyCoinPin,
  from,
  buyType,
  setFrom,
}: any) => {
  const [isNairaToCoin, setIsNairaToCoin] = useState(true);
  const [isNotEnabled, setIsNotEnabled] = useState(false);
  const { userDetails, displayColor, userPreferences } = useUser();
  //  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const rate = GetRates(coin, "buy");
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
  const getWallets = async () => {
    const response = await axiosInstance.get(API.getWallets);
    return response.data;
  };
  const {
    data: wallets,
    error: error4,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["get-user-virtual-wallets"],
    queryFn: getWallets,
    retry: 1,
  });

  useEffect(() => {
    if (error4) {
      const newError = error4 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error4]);

  const isCoinEnabled = (coinSymbol: string) => {
    return wallets?.wallets?.some(
      (wallet: any) => wallet.crypto_symbol === coinSymbol && wallet.is_enabled
    );
  };

  const formatValue = (value: string) => {
    const number = parseFloat(value.replace(/,/g, ""));
    return isNaN(number)
      ? ""
      : number.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const handleNairaAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (parseFloat(value) < 0) {
      toast.error("Amount cannot be negative");
      return;
    }
    setNairaAmount(value);
    if (value) {
      setCoinAmount((parseFloat(value) / calculatedRate).toFixed(2));
    } else {
      setCoinAmount("");
    }
  };

  const handleCoinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (parseFloat(value) < 0) {
      toast.error("Amount cannot be negative");
      return;
    }
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
  const navigate = useNavigate();
  const EnabledWallet = () => {
    return (
      <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
        <div
          className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
        >
          <div className="flex flex-col px-8 justify-center mt-6 gap-6 items-center">
            <div className="w-[72px] h-[72px]">
              <img src={progress} className="w-full h-full bg-cover" alt="" />
            </div>
            <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
              No {coin} wallet
            </h4>
            <p className="dark:text-white text-gray-800 text-[12px]  text-center">
              Please enable {coin} wallet in your wallet settings to buy crypto.
              gets completed
            </p>
            <button
              onClick={() => {
                navigate("/wallet");
              }}
              className={`w-10/12 h-[52px] rounded-[18px] bg-text_blue mt-4 text-white flex justify-center items-center  font-semibold`}
            >
              Go to wallet
            </button>
          </div>
        </div>
      </div>
    );
  };
  const isPinAvailable = userPreferences?.preferences?.pin_set;

  const buyCoin = async ({
    crypto_symbol,
    network,
    amount_naira,
    wallet_address,
  }: any) => {
    const response = await axiosInstance.post(API.buyCrypto, {
      crypto_symbol,
      network,
      amount_naira,
      wallet_address,
    });
    return response.data;
  };

  const completeBuy = useMutation({
    mutationFn: buyCoin,
    onSuccess: (r) => {
      setTimeout(() => {
        setBuySummary(r.summary);
        if (isPinAvailable) {
          setBuyExModal(false);
          setBuyReceiptModal(true);
        } else {
          setBuyExModal(false);

          setBuyCoinPin(true);
        }
      }, 1000);
      // setTimeout(() => {
      //   setSelectBankModal(false);
      //   setGenerateAddyModal(true);
      // }, 1500);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });

  const handleProceed = () => {
    if (!validateAmount(Number(nairaAmount))) {
      return;
    }
    if (isCoinEnabled(coin)) {
      setIsNotEnabled(false);
      const data = {
        crypto_symbol: coin,
        network: buyType === "Ex" ? network : "Nil",
        amount_naira: nairaAmount,
        wallet_address: "Nil",
      };
      completeBuy.mutate(data);
    } else {
      setIsNotEnabled(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyExModal(false);

              setCoinAmount("");
              setNairaAmount("");
              if (from === "SidePage") {
                setFrom("");
              } else {
                setSelectCoinModal(true);
              }
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
              setBuyExModal(false);
              setCoinAmount("");
              setNairaAmount("");
              if (from === "SidePage") {
                setFrom("");
              }
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

        <div className="w-full mt-12 gap-2 flex justify-center items-center">
          {Number(nairaAmount) > Number(fiatBalance) && from !== "SidePage" && (
            <button
              onClick={() => {
                setBuyExModal(false);
                setOpenDeposit(true);
              }}
              style={{
                border: `1px solid ${bgColor}`,
                color: `${bgColor}`,
              }}
              className={`w-full mx-auto flex gap-3 items-center justify-center h-[52px] text-[14px] xs:text-[14px] font-medium rounded-xl  ${
                bgColor
                  ? `border-[${bgColor}] text-[${bgColor}] `
                  : "text-[#3A66FF] border-text_blue"
              } border `}
            >
              <h4>Top up</h4>
            </button>
          )}
          <button
            disabled={!coinAmount}
            onClick={handleProceed}
            style={{
              backgroundColor: !coinAmount ? "" : bgColor,
            }}
            className={`w-full h-[52px] rounded-xl  ${
              !coinAmount
                ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"} text-white`
            }  flex justify-center items-center  font-semibold`}
          >
            {completeBuy?.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              " Next"
            )}
          </button>
        </div>
      </div>
      {isNotEnabled && <EnabledWallet />}
    </div>
  );
};

export default BuyFromCeller;
