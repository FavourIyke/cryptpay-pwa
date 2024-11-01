import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { truncateWord } from "../../../utils/wordFunctions";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../../constants/api";
import { errorMessage } from "../../../utils/errorMessage";
import useAuthAxios from "../../../utils/baseAxios";
import ClipLoader from "react-spinners/ClipLoader";
import { formatAmount } from "../../../utils/formatDate";
import { useUser } from "../../../context/user-context";
import OtpInputField from "../../../components/utils/OtpInput";

const BuyReceipt = ({
  setBuyCoinModal,
  setBuyReceiptModal,
  coin,
  network,
  setFinalModal,
  walletAddy,
  setWalletAddy,
  setBuySummary,
  setNairaAmount,
  buySummary,
}: any) => {
  const [copyBankName, setCopyBankName] = useState<boolean>(false);
  const { refetch2 } = useUser();

  const [addPin, setAddPin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const axiosInstance = useAuthAxios();
  const handleChange = (otp: React.SetStateAction<string>) => {
    setPin(otp);
  };
  const buyCoin = async (data: any) => {
    const response = await axiosInstance.post(API.buyCryptoConfirm, data);
    return response.data;
  };

  const comfirmBuy = useMutation({
    mutationFn: buyCoin,
    onSuccess: (r) => {
      // console.log(r);
      toast.success(r.message);
      setTimeout(() => {
        setBuyReceiptModal(false);
        refetch2();
        setFinalModal(true);
        setWalletAddy("");
        setNairaAmount("");
        setBuySummary([]);
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
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyReceiptModal(false);
              setBuyCoinModal(true);
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
              setBuyReceiptModal(false);
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
                    crypto_symbol: coin,
                    network: network,
                    amount_naira: buySummary?.amount_naira,
                    wallet_address: walletAddy,
                    pin: pin,
                  };
                  comfirmBuy.mutate(data);
                }}
                disabled={pin.length !== 4 || comfirmBuy.isPending}
                className={`w-full h-[52px] rounded-[18px] mt-[200px] ${
                  pin.length !== 4
                    ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : "bg-text_blue text-white"
                }  flex justify-center items-center  font-semibold`}
              >
                {comfirmBuy?.isPending ? (
                  <ClipLoader color="#FFFFFF" size={30} />
                ) : (
                  " Next"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
              Buy {coin}
            </h4>
            <div className="w-full flex flex-col justify-center  mt-10 items-center">
              <h4 className="text-gray-800 text-[12px]  dark:text-gray-400  ">
                You’re about to buy
              </h4>
              <h4 className="dark:text-pending text-[#F3A218] font-semibold text-[18px] mt-1 ">
                {formatAmount(buySummary?.crypto_amount)}{" "}
                <span className="text-gray-800 dark:dark:text-white  font-normal">
                  {coin}
                </span>
              </h4>
            </div>

            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                Network
              </h4>
              <h4 className="dark:text-gray-400 text-[12px] uppercase text-gray-800">
                {network}
              </h4>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                Transaction Fee
              </h4>
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                {formatAmount(buySummary?.transaction_fee)} {coin}
              </h4>
            </div>

            <h4 className="dark:text-white text-gray-800 text-[14px] mt-8">
              Transaction Details
            </h4>
            <div className="w-full mt-8 flex justify-between items-center">
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                Reciepeint Address
              </h4>
              <div className="flex items-center gap-3">
                <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                  {truncateWord(walletAddy)}
                </h4>
                <CopyToClipboard
                  text={walletAddy}
                  onCopy={() => {
                    setCopyBankName(true);
                    setTimeout(() => {
                      setCopyBankName(false);
                    }, 2500);
                  }}
                >
                  {copyBankName ? (
                    <FiClipboard className="text-[16px] dark:text-[#D0D5DD] text-black" />
                  ) : (
                    <FiCopy className="text-[16px] dark:text-[#D0D5DD] text-black" />
                  )}
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                Amount Paid
              </h4>
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                {formatAmount(buySummary?.amount_naira)} NGN
              </h4>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <h4 className="dark:text-gray-400 text-[12px] text-gray-800">
                Amount Received
              </h4>
              <h4 className="dark:text-gray-400 uppercase text-[12px] text-gray-800">
                {formatAmount(buySummary?.crypto_amount)} {coin}
              </h4>
            </div>

            <div className="flex items-center gap-4 mt-8 w-full">
              <button
                onClick={() => setBuyReceiptModal(false)}
                className="w-1/2  text-[14px] rounded-2xl h-[52px] border border-text_blue text-text_blue flex justify-center items-center"
              >
                Cancel trade
              </button>
              <button
                onClick={() => {
                  setAddPin(true);
                }}
                className="w-1/2 text-white text-[14px] rounded-2xl h-[52px] bg-text_blue flex justify-center items-center"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyReceipt;
