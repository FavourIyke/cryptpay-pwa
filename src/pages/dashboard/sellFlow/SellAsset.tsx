import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { kudaLogo } from "../../../assets/images";
import { SlArrowLeft } from "react-icons/sl";
import { truncateWord } from "../../../utils/wordFunctions";
import QRCode from "react-qr-code";
import { useUser } from "../../../context/user-context";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../../constants/api";
import { errorMessage } from "../../../utils/errorMessage";
import useAuthAxios from "../../../utils/baseAxios";

const SellAsset = ({
  setSellAssetModal,
  setGenerateAddyModal,
  setFinalModal,
  network,
  setWalletAddy,
  walletAddy,
  coin,
  selectedBankDetails,
}: any) => {
  const [onCopy, setOnCopy] = useState<boolean>(false);
  const { theme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const axiosInstance = useAuthAxios();
  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return "dark";
    } else if (theme === "light") {
      return "light";
    } else if (theme === "system") {
      return darkQuery.matches ? "dark" : "light";
    }
    return "dark"; // fallback in case of an unexpected value
  };

  const userTheme = getThemeBasedImage();
  const getAllBanks = async () => {
    const response = await axiosInstance.get(API.getAllBanks);
    return response.data;
  };

  const { data: allBanks, error: error2 } = useQuery({
    queryKey: ["all-banks"],
    queryFn: getAllBanks,
    retry: 1,
  });
  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-10 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSellAssetModal(false);
              setGenerateAddyModal(true);
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
              setSellAssetModal(false);
              setWalletAddy("");
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Sell {coin}
        </h4>
        <div className="w-full py-8 bg-[#F1F1F1] dark:bg-transparent mt-4 rounded-xl flex justify-center items-center">
          <QRCode
            size={170}
            bgColor={
              userTheme === "light"
                ? "#F1F1F1"
                : userTheme === "dark"
                ? "#1F1F1F"
                : ""
            }
            fgColor={
              userTheme === "light"
                ? "#1D2739"
                : userTheme === "dark"
                ? "#E4E7EC"
                : ""
            }
            value={walletAddy}
          />
        </div>{" "}
        <div className="w-full mt-6">
          <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
            Wallet Address
          </h4>
          <div className="flex w-full justify-between gap-4 mt-4 items-center">
            {walletAddy && (
              <div className="w-9/12 h-[40px] flex justify-start px-4 items-center rounded-xl border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-700 ">
                <h4 className="dark:text-white text-gray-800  font-medium text-[12px]">
                  {walletAddy ? truncateWord(walletAddy) : "Fetching..."}
                </h4>
              </div>
            )}
            <div className="flex gap-4 items-center">
              <CopyToClipboard
                text={walletAddy}
                onCopy={() => {
                  setOnCopy(true);
                  setTimeout(() => {
                    setOnCopy(false);
                  }, 2500);
                }}
              >
                {onCopy ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-700">
                    <FiClipboard className="text-[16px] dark:text-white text-gray-800" />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-700">
                    <FiCopy className="text-[16px] dark:text-white text-gray-800" />
                  </div>
                )}
              </CopyToClipboard>
              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-700">
                <CiExport className="text-[18px] dark:text-white text-gray-800" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
            Credited Account
          </h4>
          <div className="mt-4 w-full border border-gray-300 dark:bg-transparent dark:border-gray-700 rounded-xl p-4">
            <div className="w-full  flex justify-between items-start">
              <div className="flex gap-2 items-center">
                <div
                  className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
                    selectedBankDetails.is_default
                      ? "border-[#5E91FF]  "
                      : "bg-transparent border-[#505050]"
                  } border `}
                >
                  <div
                    className={`w-full h-full rounded-full  ${
                      selectedBankDetails.is_default
                        ? " bg-[#5E91FF] "
                        : "bg-transparent "
                    } `}
                  />
                </div>
                {allBanks?.data
                  .filter(
                    (banki: any) => banki.code === selectedBankDetails.bank_code
                  )
                  .map((bankk: any, index: any) => (
                    <h4
                      key={index}
                      className="dark:text-gray-50 text-gray-800  font-medium text-[12px]"
                    >
                      {bankk.name}
                    </h4>
                  ))}
              </div>
              <div className="">
                <h4 className="dark:text-gray-400 text-gray-800 uppercase text-right font-medium text-[12px]">
                  {selectedBankDetails.account_name}
                </h4>
                <h4 className="dark:text-gray-400 text-gray-800 mt-2 text-right  font-medium text-[12px]">
                  {selectedBankDetails.account_number}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-[#DD900D] rounded-xl mt-6">
          <h4 className="text-white text-[14px]">Note</h4>
          <p className="text-gray-50 text-[12px] mt-2">
            Please ensure to send only Bitcoin (BTC) to this address or you may
            lose your funds.
          </p>
        </div>
        <button
          disabled={!network}
          onClick={() => {
            setSellAssetModal(false);
            setFinalModal(true);
          }}
          className={`w-full h-[52px] rounded-[18px] mt-4 ${
            !network ? "text-gray-400 bg-gray-600" : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SellAsset;
