import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { toast } from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import { truncateWord } from "../../../utils/wordFunctions";

const GenerateWallet = ({
  setGenerateAddyModal,
  setSelectBankModal,
  setSellAssetModal,
  coin,
  network,
  setNetwork,
  setWalletAddy,
  walletAddy,
  selectedBankDetails,
}: any) => {
  const axiosInstance = useAuthAxios();
  const [showProceedButton, setShowProceedButton] = useState<boolean>(false);
  const [showGenerateButton, setShowGenerateButton] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const getWalletAddy = async () => {
    const response = await axiosInstance.get(
      API.getWalletAddress(coin.toLowerCase(), network)
    );
    return response.data;
  };
  const {
    data,
    error: error1,
    isSuccess: success1,
  } = useQuery({
    queryKey: ["get-wallet-address", coin, network], // Include coin and network in the queryKey
    queryFn: getWalletAddy,
    enabled: !!coin && !!network,
    retry: 1,
  });

  useEffect(() => {
    if (error1) {
      setShowGenerateButton(true);
      setShowProceedButton(false);
      const newError = error1 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1]);
  useEffect(() => {
    if (success1) {
      if (data.data.address) {
        setWalletAddy(data.data.address);
        setShowProceedButton(true);
        setShowGenerateButton(false);
      } else {
        setWalletAddy("");
        setShowGenerateButton(true);
        setShowProceedButton(false);
      }
    }
  }, [data, success1]);

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

  const generateWalletAddy = async ({ crypto_type, network }: any) => {
    const response = await axiosInstance.post(API.generateWalletAddresses, {
      crypto_type,
      network,
    });
    return response.data;
  };
  const completeGetAddy = useMutation({
    mutationFn: generateWalletAddy,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get-wallet-address"],
        });
      }, 2000);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });

  const handleGenerateClick = () => {
    completeGetAddy.mutate({
      crypto_type: coin.toLowerCase(),
      network: network,
    });
  };

  return (
    <div className="fixed inset-0 flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setGenerateAddyModal(false);
              setSelectBankModal(true);
              setWalletAddy("");
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
              setGenerateAddyModal(false);
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
        {coin === "USDT" || coin === "ETH" ? (
          <div className="w-full mt-8">
            <h4 className="dark:text-gray-400 text-gray-800 mt-2 font-medium text-[12px]">
              Network
            </h4>
            <select
              value={network}
              className="w-full bg-transparent outline-none dark:text-white text-gray-800 text-[12px] h-[48px] rounded-xl mt-2 px-4 border border-gray-300 dark:bg-transparent dark:border-gray-700 bg-[#F1F1F1]"
              onChange={(e) => {
                //   queryClient.invalidateQueries({
                //     queryKey: ["get-wallet-address"],
                //   });
                setWalletAddy("");
                setNetwork(e.target.value);
              }}
            >
              <option value="">Select Network</option>
              {coin === "USDT" || coin === "ETH" ? (
                <>
                  <option value="bep20">BEP-20</option>
                  <option value="erc20">ERC-20</option>
                </>
              ) : null}
              {coin === "USDT" && <option value="trc20">TRC-20</option>}{" "}
              {/* {coin === "SOL" && <option value="bep20">Solana</option>}{" "}
            {coin === "BTC" && <option value="btc">Bitcoin</option>}{" "} */}
            </select>
          </div>
        ) : null}
        {walletAddy && (
          <div className="w-full h-[52px] flex justify-start px-4 items-center rounded-xl border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-700 mt-4">
            <h4 className="dark:text-white text-gray-800  font-medium text-[12px]">
              {walletAddy ? truncateWord(walletAddy) : "Fetching..."}
            </h4>
          </div>
        )}
        <div className="w-full mt-6 ">
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
            Please ensure to send only {coin} to this address or you may lose
            your funds.
          </p>
        </div>
        {showProceedButton && (
          <button
            disabled={!network || !walletAddy}
            onClick={() => {
              if (walletAddy) {
                setGenerateAddyModal(false);
                setSellAssetModal(true);
              }
            }}
            className={`w-full h-[52px] rounded-[18px] mt-4 ${
              !network || !walletAddy
                ? "text-gray-400 bg-gray-600"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            Proceed
          </button>
        )}

        {showGenerateButton && (
          <button
            disabled={!network || completeGetAddy.isPending}
            onClick={handleGenerateClick}
            className={`w-full h-[52px] rounded-[18px] mt-4 ${
              !network ? "text-gray-400 bg-gray-600" : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            {completeGetAddy.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              "Generate Wallet"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateWallet;
