import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { API } from "../../../constants/api";
import { useUser } from "../../../context/user-context";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { formatAmount } from "../../../utils/formatDate";
import GetRates from "../../../components/utils/GetRates";

const Withdraw = ({
  setWithdraw,
  setRecipientAddyModal,
  setWithdrawRequest,
  withdrawcoindeets,
  withdrawAmount,
  setWithrawAmount,
  from,
  setFrom,
}: any) => {
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const axiosInstance = useAuthAxios();
  const rate = GetRates(withdrawcoindeets?.crypto_symbol, "sell");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  const [displayAmount, setDisplayAmount] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      // Prevent multiple decimal points
      if ((value.match(/\./g) || []).length <= 1) {
        if (value.includes(".")) {
          // Limit to 6 decimal places
          const [whole, decimal] = value.split(".");
          if (decimal.length <= 6) {
            setDisplayAmount(value);
            setWithrawAmount(value || "");
          }
        } else {
          // Format whole numbers using toLocaleString
          const formattedValue = Number(value).toLocaleString();
          setDisplayAmount(formattedValue);
          setWithrawAmount(value || "");
        }
      }
    }
  };

  // Debounce formatting to run when the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (withdrawAmount) {
        const formattedValue = Number(withdrawAmount).toLocaleString("en-US");
        setDisplayAmount(formattedValue); // Set formatted value after debounce
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(handler); // Cleanup on re-render
  }, [withdrawAmount]);

  const getWallets = async () => {
    const response = await axiosInstance.get(API.getWallets);
    return response.data;
  };
  const { data: wallets, error: error2 } = useQuery({
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
  //   console.log(withdrawcoindeets);
  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);
  const selectedCrypto = wallets?.wallets?.find(
    (crypto: { crypto_symbol: any }) =>
      crypto.crypto_symbol === withdrawcoindeets?.crypto_symbol
  );
  const coinRate = prices?.cryptocurrencies[withdrawcoindeets?.crypto_symbol];
  const calculatedGet = coinRate * Number(withdrawAmount);
  const coinBalance = selectedCrypto?.balance;
  const lowBalance = Number(withdrawAmount) > selectedCrypto?.balance;

  useEffect(() => {
    if (lowBalance || !withdrawAmount || !calculatedGet) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [withdrawAmount, calculatedGet, lowBalance]);
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setWithdraw(false);
              setRecipientAddyModal(true);
              if (from === "SidePage") {
                setFrom("");
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
              setWithdraw(false);
              if (from === "SidePage") {
                setFrom("");
              }
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="w-full mt-4">
          <div className="flex justify-between items-center w-full">
            <h4 className="text-gray-800 dark:text-gray-100 font-semibold mt-4  text-[20px]">
              Withdraw {withdrawcoindeets?.crypto_symbol}
            </h4>
            <h4 className="text-gray-800 dark:text-gray-400 mt-4  text-[16px]">
              Rate: <strong className="text-[#5E91FF] ">{rate}/$</strong>
            </h4>
          </div>
          <div className="w-full p-4  border border-gray-200 mt-10 dark:border-[#2F2F2F] rounded-xl">
            <div className="w-full flex justify-between gap-4 items-center">
              <div className="flex justify-start gap-1 text-gray-800 dark:text-gray-200 text-[14px]">
                {/* <h4>₦</h4> */}
                <input
                  type="text"
                  placeholder="Amount"
                  value={displayAmount}
                  autoFocus
                  onChange={handleChange}
                  className="text-gray-800 dark:text-gray-200 text-[13px] text-left bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[20px] h-[20px] rounded-full">
                  <img
                    src={withdrawcoindeets?.crypto_logo}
                    className="h-full w-full rounded-full object-contain"
                    alt=""
                  />
                </div>
                <h4 className="text-gray-900 dark:text-gray-200 text-[14px] tracking-wider ">
                  {withdrawcoindeets?.crypto_symbol}
                </h4>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex justify-start items-center gap-2 mt-4">
                <h4 className="text-gray-600  text-[14px] ">Balance:</h4>
                <h4 className="text-gray-900 dark:text-gray-400 text-[14px]  ">
                  {formatAmount(coinBalance)} {withdrawcoindeets?.crypto_symbol}
                </h4>
              </div>
              {lowBalance && (
                <div className="flex justify-start items-center gap-2 mt-4">
                  <h4 className="text-[#DD524D] italic  text-[14px] ">
                    Insufficient Balance
                  </h4>
                  <BsFillInfoCircleFill className="text-[#DD524D]" />
                </div>
              )}
            </div>
          </div>
          <div className="  mt-4  inline-block">
            <div className="p-3 items-center flex gap-1 justify-start bg[#F9F9F9] border rounded-full  border-[#EAEAEA] dark:bg-[#3B3B3B33] dark:border-[#242424]">
              <h4 className="text-gray-400 dark:text-gray-500 text-[14px]">
                You will spend:
              </h4>
              <h4 className="text-[#020513] dark:text-white text-[14px]">
                ${loadingPrice ? "---" : formatAmount(calculatedGet)}
              </h4>
            </div>
          </div>
          <button
            disabled={disabled}
            onClick={() => {
              setWithdraw(false);
              setWithdrawRequest(true);
            }}
            style={{
              backgroundColor: disabled ? "" : bgColor,
            }}
            className={`w-full h-[52px] rounded-xl mt-16  ${
              disabled
                ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"} text-white`
            }  flex justify-center items-center  font-semibold`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
