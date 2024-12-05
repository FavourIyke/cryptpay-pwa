import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoClose } from "react-icons/io5";

import { SlArrowLeft } from "react-icons/sl";

import QRCode from "react-qr-code";
import { toast } from "react-hot-toast";

import { useStatusBarHeight } from "../../../components/utils/StatusBarH";
import { IoIosArrowDown, IoMdShare } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import ChangeCoin from "./ChangeCoin";
import { useUser } from "../../../context/user-context";

const SellAsset = ({
  setSellAssetModal,
  setSelectBankModal,
  setNetwork,
  network,
  networks,
  coinDeets,
  setWalletAddy,
  walletAddy,
  setCoinDeets,
  setNetworks,
}: any) => {
  const statusBarHeight = useStatusBarHeight();
  const axiosInstance = useAuthAxios();
  const [showGenerateButton, setShowGenerateButton] = useState<boolean>(false);
  const [showDD, setShowDD] = useState<boolean>(false);
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
  const getWalletAddy = async () => {
    const response = await axiosInstance.get(
      API.getWalletAddress(coinDeets?.symbol.toLowerCase(), network)
    );
    return response.data;
  };
  const {
    data,
    error: error1,
    isSuccess: success1,
    refetch,
  } = useQuery({
    queryKey: ["get-wallet-address", coinDeets?.symbol, network], // Include coin and network in the queryKey
    queryFn: getWalletAddy,
    enabled: !!coinDeets?.symbol && !!network,
    retry: 1,
  });

  useEffect(() => {
    if (error1) {
      setShowGenerateButton(true);
      const newError = error1 as any;
      toast(errorMessage(newError?.message || newError?.data?.message), {
        duration: 3000,
        icon: "🚫",
        iconTheme: {
          primary: "#ffffff",
          secondary: "#DD900D",
        },
        style: {
          color: "#ffffff",
          backgroundColor: "#DD900D",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    }
  }, [error1]);
  useEffect(() => {
    if (success1) {
      if (data.data.address) {
        setWalletAddy(data.data.address);
        setShowGenerateButton(false);
      } else {
        setWalletAddy("");
        setShowGenerateButton(true);
      }
    }
  }, [data, success1]);

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
      refetch();
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
      crypto_type: coinDeets?.symbol.toLowerCase(),
      network: network,
    });
  };

  return (
    <div
      style={{ paddingTop: `${statusBarHeight + 80}px ` }}
      className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start  bg-white dark:bg-primary_dark overflow-auto pb-12  backdrop-blur-sm"
    >
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F]   `}
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
          <h4 className="text-gray-800 dark:text-gray-100  font-semibold text-[20px]">
            Sell
          </h4>
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
        <div className="w-full mt-10">
          <div className="w-full relative   items-center">
            <div
              onClick={() => {
                setShowDD((prev) => !prev);
              }}
              className="justify-center cursor-pointer flex w-full gap-2 items-center"
            >
              <div className="[32px] h-[32px] rounded-full">
                <img
                  src={coinDeets?.logo}
                  className="w-full h-full  rounded-full"
                  alt=""
                />
              </div>
              <h4 className="text-[#141414] dark:text-white  font-semibold text-[16px]">
                {coinDeets?.symbol}
              </h4>
              <IoIosArrowDown className="text-[#141414] dark:text-white text-[20px]" />
            </div>
            {showDD && (
              <div className="w-full absolute mx-auto">
                <ChangeCoin
                  setCoinDeets={setCoinDeets}
                  setNetworks={setNetworks}
                  setShowDD={setShowDD}
                  setWalletAddy={setWalletAddy}
                  setNetwork={setNetwork}
                />
              </div>
            )}
          </div>

          <div className="w-full p-4 mt-6 dark:bg-[#DD900D1A] bg-[#DD900D] bg-opacity-10 text-[#664101] rounded-xl dark:text-[#F7D394] text-[12px]">
            Please ensure to send only{" "}
            <strong className="text-[#DD900D] font-semibold">
              {coinDeets?.symbol.toUpperCase()} ({network.toUpperCase()})
            </strong>{" "}
            to this address or you may lose your funds.
          </div>
          <div className="mt-6 w-full py-6 px-16 rounded-xl bg-[#F0F0F0] dark:bg-[#2b2a2a]">
            <div className="flex justify-center items-center gap-2 mt-3">
              {networks?.map((networki: any, index: number) => {
                const networkNameMap: { [key: string]: string } = {
                  "Tron Network": "TRX",
                  "Binance Smart Chain": "BSC",
                  "Ethereum Network": "ETH",
                  "Ethereum Mainnet": "ETH",
                  Bitcoin: "BTC",
                  Solana: "SOL",
                };

                const networkCodeMap: { [key: string]: string } = {
                  bep20: "BEP-20",
                  trc20: "TRC-20",
                  erc20: "ERC-20",
                  btc: "BTC",
                };

                const transformedName =
                  networkNameMap[networki?.name] || networki?.name;
                const transformedCode =
                  networkCodeMap[networki?.code] || networki?.code;

                return (
                  <div
                    key={index}
                    onClick={() => setNetwork(networki?.code)}
                    className="w-full flex justify-center items-center"
                  >
                    <div className="w-full cursor-pointer flex flex-col justify-center items-center">
                      <h4
                        style={{
                          color: network !== networki?.code ? "" : bgColor,
                        }}
                        className={
                          network === networki?.code
                            ? `${
                                bgColor ? `text-[${bgColor}]` : "bg-text_blue"
                              } text-[12px] font-semibold `
                            : "text-gray-800 text-[12px] font-semibold dark:text-gray-50"
                        }
                      >
                        {transformedName}
                      </h4>
                      <h4
                        style={{
                          color: network !== networki?.code ? "" : bgColor,
                        }}
                        className={
                          network === networki?.code
                            ? `${
                                bgColor ? `text-[${bgColor}]` : "bg-text_blue"
                              } text-[12px] `
                            : "text-gray-400 text-[12px] dark:text-gray-50"
                        }
                      >
                        {transformedCode}
                      </h4>
                    </div>
                    {/* Add a divider if it's not the last item */}
                    {index < networks.length - 1 && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-[1px] h-[21px] bg-[#888888] "
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full bg-white flex mt-4 flex-col justify-center items-center rounded-xl p-4">
              <div>
                <QRCode size={240} value={walletAddy ?? ""} />
              </div>
              <h4
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                className="mt-4 text-[#141414] font-bold break-words text-[14px]"
              >
                {walletAddy ?? ""}
              </h4>
            </div>
          </div>
          {showGenerateButton ? (
            <button
              style={{
                backgroundColor:
                  !network || completeGetAddy.isPending ? "" : bgColor,
              }}
              disabled={!network || completeGetAddy.isPending}
              onClick={handleGenerateClick}
              className={`w-full h-[52px] rounded-[18px] mt-4 ${
                !network
                  ? "text-gray-400 bg-gray-600"
                  : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"} text-white`
              }  flex justify-center items-center  font-semibold`}
            >
              {completeGetAddy.isPending ? (
                <ClipLoader color="#FFFFFF" size={30} />
              ) : (
                "Generate Wallet"
              )}
            </button>
          ) : (
            <div className="w-full mt-12 flex gap-4 justify-center items-center">
              <button className="w-1/2 flex justify-center gap-2 h-[58px] text-[14px] font-semibold rounded-xl border items-center border-gray-700 text-gray-800 dark:text-gray-50">
                <IoMdShare className="text-[20px]" /> Share
              </button>
              <CopyToClipboard
                text={walletAddy ?? ""}
                onCopy={() => {
                  toast.success(`${coinDeets?.symbol} wallet address copied`);
                }}
              >
                <button
                  style={{
                    backgroundColor: bgColor,
                  }}
                  className={`w-1/2 flex justify-center gap-2 h-[58px] text-[14px] font-semibold rounded-xl text-white ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  } items-center `}
                >
                  <FiCopy className="text-[20px]" /> Copy Address
                </button>
              </CopyToClipboard>
            </div>
          )}
        </div>

        {/* <button
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
        </button> */}
      </div>
    </div>
  );
};

export default SellAsset;
