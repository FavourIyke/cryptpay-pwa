import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { kudaLogo } from "../../../assets/images";
import { SlArrowLeft } from "react-icons/sl";
import useAuthAxios from "../../../utils/baseAxios";
import { API } from "../../../constants/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorMessage } from "../../../utils/errorMessage";

const SellAsset = ({
  setSellAssetModal,
  setSelectBankModal,
  setFinalModal,
  network,
  setNetwork,
  coin,
}: any) => {
  const [onCopy, setOnCopy] = useState<boolean>(false);
  // const axiosInstance = useAuthAxios();
  // const getWalletAddy = async ({ crypto_type }: any) => {
  //   const response = await axiosInstance.post(API.walletAddresses, {
  //     crypto_type,
  //   });
  //   return response.data;
  // };
  // const completeGetAddy = useMutation({
  //   mutationFn: getWalletAddy,
  //   onSuccess: (r) => {
  //     console.log(r);
  //     // toast.success(r.message);
  //     // queryClient.invalidateQueries({
  //     //   queryKey: ["user-preferences"],
  //     // });
  //   },
  //   onError: (e) => {
  //     console.log(e);
  //     const err = e as any;
  //     toast.error(errorMessage(err?.message || err?.data?.message));
  //   },
  // });

  // useEffect(() => {
  //   completeGetAddy.mutate({
  //     crypto_type: "eth",
  //     // coin === "BTC"
  //     //   ? "btc"
  //     //   : coin === "ETH"
  //     //   ? "eth"
  //     //   : coin === "SOL"
  //     //   ? "sol"
  //     //   : coin === "USDT"
  //     //   ? "usdt"
  //     //   : "",
  //   });
  // }, [coin]);

  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-10 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSellAssetModal(false);
              setSelectBankModal(true);
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
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Sell Asset
        </h4>
        <div className="w-full py-8 bg-[#F1F1F1] dark:bg-transparent mt-12 rounded-xl">
          <div className="w-4/5 xs:3/5 mds:w-1/2 h-[170px] bg-red-500  mx-auto"></div>
        </div>{" "}
        <div className="w-full mt-8">
          <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
            Network
          </h4>
          <select
            value={network}
            className="w-full bg-transparent outline-none dark:text-white text-gray-800 text-[12px] h-[48px] rounded-xl mt-2 px-4 border border-gray-300 dark:bg-transparent dark:border-transparent bg-[#F1F1F1]"
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="">Select Network</option>
            {coin === "USDT" || coin === "ETH" ? (
              <>
                <option value="BEP-20">BEP-20</option>
                <option value="ERC-20">ERC-20</option>
              </>
            ) : null}
            {coin === "USDT" && <option value="TRC-20">TRC-20</option>}{" "}
            {coin === "SOL" && <option value="SOL">Solana</option>}{" "}
            {coin === "BTC" && <option value="BTC">Bitcoin</option>}{" "}
          </select>
        </div>
        <div className="w-full mt-6">
          <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
            Wallet Address
          </h4>
          <div className="flex w-full justify-between gap-4 mt-4 items-center">
            <div className="w-9/12 h-[40px] flex justify-start px-4 items-center rounded-xl border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-transparent">
              <h4 className="dark:text-white text-gray-800  font-medium text-[12px]">
                bc1q04......wjdgfee7g
              </h4>
            </div>
            <div className="flex gap-4 items-center">
              <CopyToClipboard
                text="bc1q04sdhdgjmnbvwjdgfee7g"
                onCopy={() => {
                  setOnCopy(true);
                  setTimeout(() => {
                    setOnCopy(false);
                  }, 2500);
                }}
              >
                {onCopy ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-transparent">
                    <FiClipboard className="text-[16px] dark:text-white text-gray-800" />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-transparent">
                    <FiCopy className="text-[16px] dark:text-white text-gray-800" />
                  </div>
                )}
              </CopyToClipboard>
              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-transparent">
                <CiExport className="text-[18px] dark:text-white text-gray-800" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
            Credited Account
          </h4>
          <div className="mt-4 w-full">
            <div className="w-full  flex justify-between items-start">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] ">
                  <img
                    src={kudaLogo}
                    className="w-full h-full bg-cover"
                    alt=""
                  />
                </div>
                <h4 className="dark:text-gray-50  text-gray-800 font-medium text-[12px]">
                  Kuda MFB
                </h4>
              </div>
              <div className="">
                <h4 className="dark:text-gray-400 text-gray-800 text-right font-medium text-[12px]">
                  Mamudu A Jeffrey
                </h4>
                <h4 className="dark:text-gray-400 text-gray-800 mt-2 text-right  font-medium text-[12px]">
                  2032321252
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
