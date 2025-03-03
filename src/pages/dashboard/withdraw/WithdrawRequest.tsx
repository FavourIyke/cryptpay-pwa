import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { ClipLoader } from "react-spinners";
import GetRates from "../../../components/utils/GetRates";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { formatAmount } from "../../../utils/formatDate";
import { truncateWord } from "../../../utils/wordFunctions";
import OtpInputField from "../../../components/utils/OtpInput";
import { useUser } from "../../../context/user-context";
const WithdrawRequest = ({
  setWithdrawRequest,
  setWithdraw,
  setWithdrawPending,
  recipientAddy,
  withdrawAmount,
  withdrawcoindeets,
  networkW,
  from,
  setFrom,
}: any) => {
  const rate = GetRates(withdrawcoindeets?.crypto_symbol, "sell");

  //   console.log(rate);
  const [addPin, setAddPin] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>("");
  const { displayColor, refetch1 } = useUser();
  const queryClient = useQueryClient();
  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  const [pin, setPin] = useState<string>("");
  const axiosInstance = useAuthAxios();
  const handleChange = (otp: React.SetStateAction<string>) => {
    setPin(otp);
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
  const coinRate = prices?.cryptocurrencies[withdrawcoindeets?.crypto_symbol];
  const calculatedRate = coinRate * rate * Number(withdrawAmount);

  const withdrawCoin = async (data: any) => {
    const response = await axiosInstance.post(API.withdrawCrypto, data);
    return response.data;
  };

  const comfirmWithdraw = useMutation({
    mutationFn: withdrawCoin,
    onSuccess: (r) => {
      // console.log(r);
      toast.success(r.message);
      refetch1();
      queryClient.invalidateQueries({
        queryKey: ["userDetails", "get-user-wallets"],
      });
      setTimeout(() => {
        setWithdrawRequest(false);
        setWithdrawPending(true);
      }, 1500);
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

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setWithdrawRequest(false);
              setWithdraw(true);
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
              setWithdrawRequest(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        {addPin ? (
          <div className="mt-10 w-full">
            <div className="mt-10 w-full">
              <h4 className="text-gray-800 dark:text-gray-100 mt- lgss:mt-8 font-semibold text-[18px]">
                Enter your transaction pin
              </h4>
              <div className="px-8 mt-6">
                <OtpInputField
                  otp={pin}
                  input={4}
                  setOtp={setPin}
                  handleChange={handleChange}
                />
              </div>
              <button
                onClick={() => {
                  const data = {
                    crypto_symbol: withdrawcoindeets?.crypto_symbol,
                    amount: withdrawAmount,
                    wallet_address: recipientAddy,
                    network: networkW,
                    pin: pin,
                  };

                  comfirmWithdraw.mutate(data);
                }}
                disabled={pin.length !== 4 || comfirmWithdraw.isPending}
                style={{
                  backgroundColor: pin.length !== 4 ? "" : bgColor,
                }}
                className={`w-full h-[52px] rounded-[18px] mt-[200px] ${
                  pin.length !== 4
                    ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : `${
                        bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                      } text-white`
                }  flex justify-center items-center  font-semibold`}
              >
                {comfirmWithdraw?.isPending ? (
                  <ClipLoader color="#FFFFFF" size={30} />
                ) : (
                  " Next"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <div className="w-full flex flex-col justify-center items-center">
              <h4 className="text-gray-800  dark:text-gray-400 text-[12px] ">
                You’re about to withdraw
              </h4>

              <h4
                className={` ${`dark:text-pending text-[#F3A218]`}  text-[18px] mt-1 `}
              >
                {formatAmount(withdrawAmount)}{" "}
                <span className="text-gray-800 dark:dark:text-white  font-normal">
                  {withdrawcoindeets?.crypto_symbol}
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
                  Destination
                </h4>
                <h4 className="text-gray-800 dark:text-white text-[14px] font-semibold ">
                  {truncateWord(recipientAddy ?? "")}
                </h4>
              </div>
              {/* <div className="w-full mt-3 flex justify-between items-center">
                <h4 className="text-gray-800 dark:text-gray-400 text-[14px] ">
                  Exchange Rate
                </h4>
                <h4 className="text-gray-800 dark:text-white text-[14px] font-semibold ">
                  {rate}/$
                </h4>
              </div> */}
              <div className="w-full mt-3 flex justify-between items-center">
                <h4 className="text-gray-800 dark:text-gray-400 text-[14px] ">
                  Transaction Fee
                </h4>
                <h4 className="text-black dark:text-white text-[14px] font-semibold ">
                  0 {withdrawcoindeets?.crypto_symbol}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-32 w-full">
              <button
                style={{
                  border: `1px solid ${bgColor}`,
                }}
                onClick={() => setWithdrawRequest(false)}
                className={`w-1/2  text-[14px] rounded-2xl h-[52px] border ${
                  bgColor
                    ? `border-[${bgColor}] text-gray-900 dark:text-gray-100`
                    : "text-gray-900 dark:text-gray-100 border-text_blue"
                } flex justify-center items-center`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAddPin(true);
                }}
                style={{
                  backgroundColor: bgColor,
                }}
                className={`w-1/2 text-white text-[14px] rounded-2xl h-[52px] ${
                  bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                } flex justify-center items-center`}
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawRequest;
