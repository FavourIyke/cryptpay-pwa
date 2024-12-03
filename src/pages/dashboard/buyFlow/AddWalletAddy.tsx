import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsJournalBookmark } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";
import { SlArrowLeft } from "react-icons/sl";
import { TbScan } from "react-icons/tb";
import QrScanner from "react-qr-scanner";
import { validateWalletAddress } from "../../../utils/validateWallet";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import { useUser } from "../../../context/user-context";

const AddWalletAddy = ({
  setBuyCoinModal,
  setBuyReceiptModal,
  coin,
  network,
  setBuyCoinAddy,
  walletAddy,
  setWalletAddy,
  setBuySummary,
  nairaAmount,
  setBuyCoinPin,
}: any) => {
  const [walletAddyC, setWalletAddyC] = useState<string>("");
  const { userPreferences } = useUser();
  const [scan, setScan] = useState(false);
  const [scanC, setScanC] = useState(false);

  const handleScan = (data: any) => {
    if (data) {
      setWalletAddy(data.text); // Set the scanned data to exWalletAddy
      setScan(false); // Close the scanner after scanning
    }
  };
  const handleScanC = (data: any) => {
    if (data) {
      setWalletAddyC(data.text); // Set the scanned data to exWalletAddy
      setScanC(false); // Close the scanner after scanning
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner Error: ", err);
    toast.error("There was an error scanning the QR Code");
  };
  const validateAddresses = () => {
    if (!walletAddy || !walletAddyC) {
      toast.error("Both wallet addresses are required.");
      return false;
    }
    if (walletAddy !== walletAddyC) {
      toast.error("Wallet addresses do not match.");
      return false;
    }
    const isValid = validateWalletAddress(walletAddy, coin, network);
    const isValidC = validateWalletAddress(walletAddyC, coin, network);
    if (!isValid) {
      toast.error(`Invalid ${coin} address for the selected network.`);
      return false;
    }
    if (!isValidC) {
      toast.error(`Invalid confirm address for the selected network.`);
      return false;
    }
    return true;
  };
  const isPinAvailable = userPreferences?.preferences?.pin_set;

  const axiosInstance = useAuthAxios();
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
        setBuyCoinAddy(false);
        if (isPinAvailable) {
          setBuyReceiptModal(true);
        } else {
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

  const handleNext = () => {
    if (!validateAddresses()) {
      return;
    }
    const data = {
      crypto_symbol: coin,
      network: network,
      amount_naira: nairaAmount,
      wallet_address: walletAddy,
    };
    completeBuy.mutate(data);
  };

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12  backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyCoinAddy(false);
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
              setBuyCoinAddy(false);
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
                <TbScan
                  className="text-[20px] dark:text-white cursor-pointer text-gray-800"
                  onClick={() => {
                    setScan(true);
                  }}
                />
                {scan && (
                  <div className="fixed inset-0 flex px-4 xs:px-6 mds:px-20 md:px-28 lgss:px-[200px] xxl:px-[300px] xxxl:px-[600px] items-start pt-[200px] justify-center bg-black bg-opacity-70 z-50">
                    <QrScanner
                      delay={300}
                      onError={handleError}
                      onScan={handleScan}
                      style={{
                        width: "100%", // Full width of the container
                        height: "auto", // Adjust height based on width
                        maxHeight: "80vh", // Ensure it doesn't overflow vertically
                      }}
                    />
                    <button
                      onClick={() => setScan(false)}
                      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                )}{" "}
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={walletAddy}
              onChange={(e) => setWalletAddy(e.target.value.trim())}
              className="w-full dark:bg-transparent bg-[#FAFAFA] border outline-none dark:border-gray-400 border-gray-300 rounded-xl h-[52px] px-4 text-[14px] text-gray-800 dark:text-[#F9FAFB]  mt-4"
            />
          </div>
          <div className="flex w-full gap-2 mt-2 bg-[#F1F1F1] rounded-xl dark:bg-transparent p-4 items-start">
            <PiWarningCircleFill className="text-gray-500 text-[32px]" />
            <h4 className="text-gray-500 text-[13px] mt-1">
              Please ensure that the receiving address supports the{" "}
              <span className="dark:text-gray-100 uppercase text-[14px] text-black">
                {network}{" "}
              </span>
              network
            </h4>
          </div>
        </div>
        <div className="w-full mt-4 ">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="dark:text-white text-gray-800 font-medium text-[14px]">
                Confirm Address
              </h4>
              <div className="flex items-center gap-4">
                <BsJournalBookmark className="text-[16px] dark:text-white text-gray-800" />
                <TbScan
                  className="text-[20px] dark:text-white cursor-pointer text-gray-800"
                  onClick={() => {
                    setScanC(true);
                  }}
                />
                {scanC && (
                  <div className="fixed inset-0 flex px-4 xs:px-6 mds:px-20 md:px-28 lgss:px-[200px] xxl:px-[300px] xxxl:px-[600px] items-start pt-[200px] justify-center bg-black bg-opacity-70 z-50">
                    <QrScanner
                      delay={300}
                      onError={handleError}
                      onScan={handleScanC}
                      style={{
                        width: "100%", // Full width of the container
                        height: "auto", // Adjust height based on width
                        maxHeight: "80vh", // Ensure it doesn't overflow vertically
                      }}
                    />
                    <button
                      onClick={() => setScanC(false)}
                      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                )}{" "}
              </div>
            </div>
            <input
              type="text"
              placeholder="Re-Enter Wallet Address"
              value={walletAddyC}
              onChange={(e) => setWalletAddyC(e.target.value.trim())}
              className="w-full dark:bg-transparent bg-[#FAFAFA] border outline-none dark:border-gray-400 border-gray-300 rounded-xl h-[52px] px-4 text-[14px] text-gray-800 dark:text-[#F9FAFB]  mt-4"
            />
          </div>
          <div className="flex w-full gap-2 mt-2 bg-[#F1F1F1] rounded-xl dark:bg-transparent p-4 items-start">
            <PiWarningCircleFill className="text-gray-500 text-[32px]" />
            <h4 className="text-gray-500 text-[13px] mt-1">
              Please ensure that the receiving address supports the{" "}
              <span className="dark:text-gray-100 uppercase text-[14px] text-black">
                {network}{" "}
              </span>
              network
            </h4>
          </div>
        </div>
        <button
          disabled={!walletAddy || !walletAddyC || walletAddy !== walletAddyC}
          onClick={handleNext}
          className={`w-full h-[52px] rounded-[18px] mt-8 ${
            !walletAddy || !walletAddyC || walletAddy !== walletAddyC
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
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
  );
};

export default AddWalletAddy;
