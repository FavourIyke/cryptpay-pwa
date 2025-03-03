import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { naijaLogo } from "../../assets/images";
import { useUser } from "../../context/user-context";
import { formatAmount } from "../../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../constants/api";
import useAuthAxios from "../../utils/baseAxios";
import { errorMessage } from "../../utils/errorMessage";
import { ClipLoader } from "react-spinners";

// Add the interface at the top
interface EnabledCoin {
  symbol: string;
  isEnabled: boolean;
}

const MainPage = ({
  setScreen,
  setSidePage,
  setOpenAddModal,
  setCoinDetails,
  setKycModal,
  setKyc2Modal,
}: any) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("all");
  const { userDetails } = useUser();
  const [totalUSDValue, setTotalUSDValue] = useState(0);
  const [totalNairaValue, setTotalNairaValue] = useState(0);
  const fiatBalance = userDetails?.data?.profile?.fiat_balance;
  const axiosInstance = useAuthAxios();

  // Add state to store enabled coins from localStorage
  const [enabledCoinsMap, setEnabledCoinsMap] = useState<{
    [key: string]: boolean;
  }>({});

  // Function to update enabled coins from localStorage
  const updateEnabledCoinsFromStorage = () => {
    const savedToggles = localStorage.getItem("enabledCoinsToggles");
    if (savedToggles) {
      const enabledCoins = JSON.parse(savedToggles) as EnabledCoin[];
      const toggleMap = enabledCoins.reduce(
        (acc, coin) => ({
          ...acc,
          [coin.symbol]: coin.isEnabled,
        }),
        {}
      );
      setEnabledCoinsMap(toggleMap);
    }
  };

  // Initial load
  useEffect(() => {
    updateEnabledCoinsFromStorage();

    // Add event listener for toggle updates
    const handleTogglesUpdate = () => {
      updateEnabledCoinsFromStorage();
    };

    window.addEventListener("togglesUpdated", handleTogglesUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("togglesUpdated", handleTogglesUpdate);
    };
  }, []);

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

  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const { data: kycStatus, error: error4 } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });
  // console.log(kycStatus);
  const getRates = async () => {
    const response = await axiosInstance.get(API.getCoins);
    return response.data.data;
  };

  const { data: coins } = useQuery({
    queryKey: ["get-coins"],
    queryFn: getRates,
    retry: 1,
  });
  //   Find the specific cryptocurrency by its symbol

  useEffect(() => {
    if (error4) {
      const newError = error4 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error4]);

  // Add this useEffect
  const sellRates = wallets?.wallets?.map(
    (wallet: { crypto_symbol: string }) =>
      coins?.cryptocurrencies?.find(
        (crypto: { symbol: string }) => crypto.symbol === wallet?.crypto_symbol
      )?.sell_rate || 0
  );

  useEffect(() => {
    let sumUSD = 0;
    let sumNaira = 0;

    wallets?.wallets?.forEach(
      (
        wallet: {
          is_enabled: any;
          crypto_symbol: string | number;
          balance: any;
        },
        index: string | number
      ) => {
        if (wallet.is_enabled && enabledCoinsMap[wallet.crypto_symbol]) {
          const coinRate = prices?.cryptocurrencies[wallet?.crypto_symbol] || 0;
          const sellRate = sellRates[index]; // ✅ Use the value from the hook
          const balance = Number(wallet?.balance) || 0;

          const usdValue = coinRate * balance;
          const nairaValue = usdValue * sellRate;

          sumUSD += usdValue;
          sumNaira += nairaValue;
        }
      }
    );

    setTotalUSDValue(sumUSD);
    setTotalNairaValue(sumNaira);
  }, [wallets, prices, enabledCoinsMap, sellRates]);

  // console.log(wallets);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center items-center">
          <ClipLoader color="#0376FF" size={30} />
        </div>
      );
    }

    return (
      <div>
        {/* Show Naira only for 'all' or 'fiat' */}
        {(activeButton === "all" || activeButton === "fiat") && (
          <div className="w-full opacity-60 flex justify-between items-center mt-6">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-[34px] bg-white h-[34px] rounded-full">
                <img
                  src={naijaLogo}
                  className="rounded-full object-contain w-full h-full"
                  alt=""
                />
              </div>
              <div>
                <div className="flex justify-start items-center gap-2">
                  <h4 className="text-gray-800 dark:text-gray-100 text-[14px]">
                    Naira
                  </h4>
                  <div className="px-2 py-1 text-gray-900 dark:text-gray-100 text-[9px] bg-gray-200 dark:bg-[#2F2F2F] rounded-[4px]">
                    Nigerian Naira
                  </div>
                </div>
                <div className="text-gray-500 text-[10px] mt-1">$ 0.00</div>
              </div>
            </div>
            <div className="">
              <h4 className="text-gray-900 text-right dark:text-gray-100 text-[14px]">
                {formatAmount(fiatBalance)}
              </h4>
            </div>
          </div>
        )}

        {/* Show crypto wallets only for 'all' or 'crypto' */}
        {(activeButton === "all" || activeButton === "crypto") && (
          <>
            {wallets?.wallets?.map((wallet: any, index: number) => {
              const coinRate = prices?.cryptocurrencies[wallet?.crypto_symbol];
              const calculatedUSDTGet = coinRate * Number(wallet?.balance);

              if (
                !wallet.is_enabled ||
                !enabledCoinsMap[wallet.crypto_symbol]
              ) {
                return null;
              }

              return (
                <div
                  key={index}
                  onClick={() => {
                    setCoinDetails(wallet);
                    setSidePage(true);
                    setScreen(1);
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
                    <div className="text-gray-500 mt-1 text-right dark:text-gray-500 text-[12px]">
                      $ {formatAmount(calculatedUSDTGet)}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="font-sora w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center">
          <h4 className="text-[20px] font-medium text-gray-900 dark:text-white">
            Wallet
          </h4>
          <div
            onClick={() => {
              if (
                kycStatus?.data.kyc_level === "000" ||
                kycStatus?.data.kyc_status === null ||
                (kycStatus?.data.kyc_level === "000" &&
                  kycStatus?.data.kyc_status === "pending")
              ) {
                setKycModal(true);
              } else if (
                kycStatus?.data.kyc_level === "100" ||
                (kycStatus?.data.kyc_level === "100" &&
                  kycStatus?.data.kyc_status === "pending")
              ) {
                setKyc2Modal(true);
              } else {
                setOpenAddModal(true);
              }
            }}
            className="rounded-full w-[44px] h-[36px] cursor-pointer bg-text_blue flex justify-center items-center"
          >
            <MdAdd className="text-[20px] text-white" />
          </div>
        </div>
        <div className="rounded-xl w-full mt-6 bg-[#F1F1F1] dark:bg-[#1F1F1F] flex flex-col items-start justify-center p-4">
          <div className="flex cursor-pointer justify-center items-center gap-2">
            <h4 className="uppercase text-center text-black dark:text-white tracking-wider text-[12px]">
              Total Assets
            </h4>

            {showBalance ? (
              <VscEyeClosed
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-black dark:text-white cursor-pointer text-[16px]"
              />
            ) : (
              <VscEye
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-black dark:text-white cursor-pointer text-[16px]"
              />
            )}
          </div>
          <h4
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            className="uppercase text-start mt-3 break-words  text-black dark:text-white tracking-wider text-[20px] font-semibold"
          >
            {!showBalance ? `$${formatAmount(totalUSDValue)}` : `******`}
          </h4>
          <h4
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            className="uppercase text-start mt-2 break-words text-[#667185] tracking-wider text-[12px]"
          >
            {!showBalance ? `NGN ${formatAmount(totalNairaValue)}` : `******`}
          </h4>
        </div>
        <div className="w-full flex justify-start items-center gap-4 mt-6">
          <button
            onClick={() => setActiveButton("all")}
            className={`${
              activeButton === "all"
                ? "text-text_blue text-[14px] border-b border-b-text_blue"
                : "bg-transparent text-gray-400 text-[13px]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveButton("fiat")}
            className={`${
              activeButton === "fiat"
                ? "text-text_blue text-[14px] border-b border-b-text_blue"
                : "bg-transparent text-gray-400 text-[13px]"
            }`}
          >
            Fiat
          </button>
          <button
            onClick={() => setActiveButton("crypto")}
            className={`${
              activeButton === "crypto"
                ? "text-text_blue text-[14px] border-b border-b-text_blue"
                : "bg-transparent text-gray-400 text-[13px]"
            }`}
          >
            Crypto
          </button>
        </div>
        <div className="w-full ">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MainPage;
