import React, { useState } from "react";
import { BsJournalBookmark } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { TbScan } from "react-icons/tb";
import { PiWarningCircleFill } from "react-icons/pi";
import { btc, eth, nigeriaFlag, solana, usdt } from "../../../assets/images";
import { CgArrowsExchangeAltV } from "react-icons/cg";

const BuyCoin = ({
  setBuyCoinModal,
  setBuyReceiptModal,
  coin,
  setSelectNetworkModal,
  network,
  coinAmount,
  setCoinAmount,
}: any) => {
  const [walletAddy, setWalletAddy] = useState<string>("");
  const [nairaAmount, setNairaAmount] = useState("");
  const [isNairaToCoin, setIsNairaToCoin] = useState(true);
  const rate = 20000;

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
      setCoinAmount((parseFloat(value) / rate).toFixed(2));
    } else {
      setCoinAmount("");
    }
  };

  const handleCoinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setCoinAmount(value);
    if (value) {
      setNairaAmount((parseFloat(value) * rate).toFixed(2));
    } else {
      setNairaAmount("");
    }
  };
  const handleExchangeToggle = () => {
    setIsNairaToCoin(!isNairaToCoin);
  };

  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
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
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="dark:text-white text-gray-800 font-medium text-[14px]">
                Address
              </h4>
              <div className="flex items-center gap-4">
                <BsJournalBookmark className="text-[16px] dark:text-white text-gray-800" />
                <TbScan className="text-[20px] dark:text-white text-gray-800" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Wallet address"
              value={walletAddy}
              onChange={(e) => setWalletAddy(e.target.value.trim())}
              className="w-full dark:bg-transparent bg-[#FAFAFA] border outline-none dark:border-gray-400 border-gray-300 rounded-xl h-[52px] px-4 text-[14px] text-gray-800 dark:text-[#F9FAFB]  mt-4"
            />
          </div>
          <div className="flex w-full gap-2 mt-2 bg-[#F1F1F1] rounded-xl dark:bg-transparent p-4 items-start">
            <PiWarningCircleFill className="text-gray-500 text-[32px]" />
            <h4 className="text-gray-500 text-[13px] mt-1">
              Please ensure that the receiving address supports the{" "}
              <span className="dark:text-gray-100 text-[14px] text-black">
                {network}{" "}
              </span>
              network
            </h4>
          </div>
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
                    src={
                      isNairaToCoin
                        ? nigeriaFlag
                        : coin === "USDT"
                        ? usdt
                        : coin === "BTC"
                        ? btc
                        : coin === "ETH"
                        ? eth
                        : coin === "SOL"
                        ? solana
                        : ""
                    }
                    className="w-full h-full bg-cover"
                    alt=""
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
              <h4 className="text-gray-500 text-[13px] mt-1">
                Minimum: NGN 1756 = 1 {coin}
              </h4>
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
                    src={
                      isNairaToCoin
                        ? coin === "USDT"
                          ? usdt
                          : coin === "BTC"
                          ? btc
                          : coin === "ETH"
                          ? eth
                          : coin === "SOL"
                          ? solana
                          : ""
                        : nigeriaFlag
                    }
                    className="w-full h-full bg-cover"
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
          onClick={() => {
            setBuyCoinModal(false);
            setBuyReceiptModal(true);
          }}
          className={`w-full h-[52px] rounded-[18px] mt-8 ${
            !coinAmount
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyCoin;
