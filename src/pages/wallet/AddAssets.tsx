import React, { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useStatusBarHeight } from "../../components/utils/StatusBarH";
import useAuthAxios from "../../utils/baseAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import { formatAmount } from "../../utils/formatDate";
import { ClipLoader } from "react-spinners";
import { naijaLogo } from "../../assets/images";
import { useUser } from "../../context/user-context";

// Add this type at the top of the file
interface EnabledCoin {
  symbol: string;
  isEnabled: boolean;
}

const AddAssets = ({ setOpenAddModal }: any) => {
  const statusBarHeight = useStatusBarHeight();
  const axiosInstance = useAuthAxios();
  const queryClient = useQueryClient();
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  const [loadingStates, setLoadingStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [toggleStates, setToggleStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Update the toggleStates initialization to use localStorage
  useEffect(() => {
    const savedToggles = localStorage.getItem("enabledCoinsToggles");
    if (savedToggles) {
      const parsedToggles = JSON.parse(savedToggles) as EnabledCoin[];
      const toggleStateObj = parsedToggles.reduce(
        (acc, coin) => ({
          ...acc,
          [coin.symbol]: coin.isEnabled,
        }),
        {}
      );
      setToggleStates(toggleStateObj);
    }
  }, []);

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
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  const getCoinPrices = async () => {
    const response = await axiosInstance.get(API.getCoinPrices);
    return response.data.data;
  };
  const {
    data: prices,
    error: error3,
    isLoading: loadingPrice,
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

  //   console.log(wallets);

  const createWallet = async (
    cryptoSymbol: string,
    cryptocurrencyId: number
  ) => {
    const response = await axiosInstance.post(API.createWallet, {
      crypto_symbol: cryptoSymbol,
      cryptocurrency_id: cryptocurrencyId,
      is_enabled: true,
      address_type: "holding",
    });
    return response.data;
  };

  const { mutate: createWalletMutate } = useMutation({
    mutationFn: (params: { cryptoSymbol: string; cryptocurrencyId: number }) =>
      createWallet(params.cryptoSymbol, params.cryptocurrencyId),
    onMutate: (params) => {
      setLoadingStates((prev) => ({
        ...prev,
        [params.cryptoSymbol]: true,
      }));
    },
    onSuccess: (r) => {
      toast.success(r.message);
      refetch2();
      queryClient.invalidateQueries({
        queryKey: ["get-user-virtual-wallets"],
      });
      setTimeout(() => {
        setOpenAddModal(false);
      }, 2000);
    },
    onError: (e) => {
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
    onSettled: (_, __, params) => {
      setLoadingStates((prev) => ({
        ...prev,
        [params.cryptoSymbol]: false,
      }));
    },
  });

  // Update the handleToggleChange function to store in localStorage
  const handleToggleChange = async (wallet: any) => {
    const newToggleState = !toggleStates[wallet.crypto_symbol];

    setToggleStates((prev) => ({
      ...prev,
      [wallet.crypto_symbol]: newToggleState,
    }));

    // Get existing enabled coins from localStorage
    const savedToggles = localStorage.getItem("enabledCoinsToggles");
    let enabledCoins: EnabledCoin[] = savedToggles
      ? JSON.parse(savedToggles)
      : [];

    // Update or add the coin toggle state
    const coinIndex = enabledCoins.findIndex(
      (coin) => coin.symbol === wallet.crypto_symbol
    );
    if (coinIndex !== -1) {
      enabledCoins[coinIndex].isEnabled = newToggleState;
    } else {
      enabledCoins.push({
        symbol: wallet.crypto_symbol,
        isEnabled: newToggleState,
      });
    }

    // Save to localStorage
    localStorage.setItem("enabledCoinsToggles", JSON.stringify(enabledCoins));

    // Dispatch custom event
    window.dispatchEvent(new Event("togglesUpdated"));
  };

  return (
    <div
      style={{ paddingTop: `${statusBarHeight + 80}px ` }}
      className="fixed inset-0  flex font-sora justify-start items-start lgss:items-start  bg-white dark:bg-primary_dark overflow-auto pb-12  backdrop-blur-sm"
    >
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/3 xxl:w-[30%] xxxl:w-[20%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F]   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setOpenAddModal(false);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center pt-10 items-center">
            <ClipLoader color="#0376FF" size={30} />{" "}
          </div>
        ) : (
          <div className="w-full ">
            <div className="w-full mt-6">
              <h4 className="text-gray-800 dark:text-gray-100  font-semibold text-[20px]">
                Add Assets
              </h4>
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
                      <h4 className="text-gray-800 dark:text-gray-100  text-[14px]">
                        Naira
                      </h4>
                      <div className="px-2 py-1 text-gray-900 dark:text-gray-100  text-[9px] bg-gray-200 dark:bg-[#2F2F2F] rounded-[4px]">
                        Nigerian Naira
                      </div>
                    </div>
                    <div className=" text-gray-500 text-[10px] mt-1">
                      $ 0.00
                    </div>
                  </div>
                </div>
              </div>
              {wallets?.wallets?.map((wallet: any, index: number) => {
                const coinRate =
                  prices?.cryptocurrencies[wallet?.crypto_symbol];
                return (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center mt-6"
                  >
                    <div className="flex justify-start gap-2 items-center">
                      <div className="w-[34px] h-[34px] rounded-full">
                        <img
                          src={wallet?.crypto_logo}
                          className="rounded-full object-contain w-full h-full"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="flex justify-start items-center gap-2">
                          <h4 className="text-gray-800 dark:text-gray-100  text-[14px]">
                            {wallet?.crypto_symbol}
                          </h4>
                          <div className="px-2 py-1 text-gray-900 dark:text-gray-100  text-[9px] bg-gray-200 dark:bg-[#2F2F2F] rounded-[4px]">
                            {wallet?.crypto_name}
                          </div>
                        </div>
                        <div className="text-gray-500 text-[10px] mt-1">
                          $ {formatAmount(coinRate)}
                        </div>
                      </div>
                    </div>

                    {/* Show either Create New button or Toggle based on is_enabled */}
                    {!wallet.is_enabled ? (
                      <button
                        onClick={() =>
                          createWalletMutate({
                            cryptoSymbol: wallet.crypto_symbol,
                            cryptocurrencyId: wallet.cryptocurrency_id,
                          })
                        }
                        disabled={loadingStates[wallet.crypto_symbol]}
                        className="p-2 text-white font-bold text-[12px] rounded-lg bg-text_blue flex items-center gap-2"
                      >
                        {loadingStates[wallet.crypto_symbol] ? (
                          <>
                            <ClipLoader color="#ffffff" size={12} />
                            <span>Creating...</span>
                          </>
                        ) : (
                          "Create New"
                        )}
                      </button>
                    ) : (
                      <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
                        <div
                          onClick={() => handleToggleChange(wallet)}
                          style={{
                            backgroundColor: toggleStates[wallet.crypto_symbol]
                              ? bgColor
                              : "#4b5563",
                          }}
                          className={`flex w-[52px] cursor-pointer h-8 rounded-full transition-all items-center duration-500 ${
                            toggleStates[wallet.crypto_symbol]
                              ? `bg-[${bgColor}]`
                              : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`h-8 w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                              toggleStates[wallet.crypto_symbol] ? "ml-5" : ""
                            }`}
                          ></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAssets;
