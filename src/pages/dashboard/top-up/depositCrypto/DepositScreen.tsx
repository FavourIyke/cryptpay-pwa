import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import QRCode from "react-qr-code";
import { pendingAddy } from "../../../../assets/images";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { IoMdShare } from "react-icons/io";
import { useUser } from "../../../../context/user-context";
import { API } from "../../../../constants/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthAxios from "../../../../utils/baseAxios";
import { errorMessage } from "../../../../utils/errorMessage";

const DepositScreen = ({
  setSelectDep,
  setdepositScren,
  coinDepDeets,
  depositNetwork,
  setOpenDepositNetwork,
  from,
  setFrom,
}: any) => {
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");
  const axiosInstance = useAuthAxios();
  const coinName =
    from === "SidePage" ? coinDepDeets?.crypto_symbol : coinDepDeets?.symbol;
  const getWalletAddy = async () => {
    const response = await axiosInstance.get(
      API.getHoldingWalletAddress(coinName.toLowerCase(), depositNetwork)
    );
    return response.data;
  };
  const {
    data,
    error: error1,
    isSuccess: success1,
    refetch,
  } = useQuery({
    queryKey: ["get-holding-wallet-address", coinName, depositNetwork], // Include coin and network in the queryKey
    queryFn: getWalletAddy,
    enabled: !!coinName && !!depositNetwork,
    retry: 1,
  });
  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const walletAddy = data?.data?.address ?? "";
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setdepositScren(false);
              setOpenDepositNetwork(true);
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
              setdepositScren(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="mt-6 w-full">
          <div className="w-full    items-center">
            <div className="justify-center cursor-pointer flex w-full gap-2 items-center">
              <div className="[32px] h-[32px] rounded-full">
                <img
                  src={
                    from === "SidePage"
                      ? coinDepDeets?.crypto_logo
                      : coinDepDeets?.logo
                  }
                  className="[32px] h-[32px]  rounded-full"
                  alt=""
                />
              </div>
              <h4 className="text-[#141414] dark:text-white  font-semibold text-[16px]">
                {from === "SidePage"
                  ? coinDepDeets?.crypto_symbol
                  : coinDepDeets?.symbol}
              </h4>
            </div>
          </div>
          <div className="w-full p-4 mt-6 dark:bg-[#DD900D1A] bg-[#DD900D] bg-opacity-10 text-[#664101] rounded-xl dark:text-[#F7D394] text-[12px]">
            This wallet only accept{" "}
            <strong className="text-[#DD900D] font-semibold">
              {from === "SidePage"
                ? coinDepDeets?.crypto_symbol?.toUpperCase()
                : coinDepDeets?.symbol?.toUpperCase()}
            </strong>{" "}
            and a minimum of $10 worth of{" "}
            <strong className="text-[#DD900D] font-semibold">
              {from === "SidePage"
                ? coinDepDeets?.crypto_symbol?.toUpperCase()
                : coinDepDeets?.symbol?.toUpperCase()}
            </strong>{" "}
            . Failure to comply will result in loss of your deposit. to this
            address or you may lose your funds.
          </div>
          <div className="w-10/12  xs:w-7/12 md:w-3/5  mb-6 mx-auto bg-white flex mt-4 flex-col justify-center items-center rounded-xl px-4 py-6">
            <div className=" hidden xs:flex">
              {walletAddy ? (
                <QRCode size={220} value={walletAddy ?? ""} />
              ) : (
                <img
                  src={pendingAddy}
                  className="mb-4 w-[60px] h-[60px] rounded-full mt-6"
                  alt=""
                />
              )}
            </div>
            <div className="xs:hidden">
              {walletAddy ? (
                <QRCode size={180} value={walletAddy ?? ""} />
              ) : (
                <img
                  src={pendingAddy}
                  className="mb-4 w-[60px] h-[60px] rounded-full mt-6"
                  alt=""
                />
              )}
            </div>
            <h4
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              className="mt-4 text-[#141414] text-left font-bold break-words text-[14px]"
            >
              {walletAddy ? walletAddy : "No Wallet Address yet"}
            </h4>
          </div>
          <div className="w-full mt-12 flex gap-4 justify-center items-center">
            <button className="w-1/2 flex justify-center gap-2 h-[58px] text-[14px] font-semibold rounded-xl border items-center border-gray-700 text-gray-800 dark:text-gray-50">
              <IoMdShare className="text-[20px]" /> Share
            </button>
            <CopyToClipboard
              text={walletAddy ?? ""}
              onCopy={() => {
                toast.success(`${coinDepDeets?.symbol} wallet address copied`);
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
        </div>
      </div>
    </div>
  );
};

export default DepositScreen;
