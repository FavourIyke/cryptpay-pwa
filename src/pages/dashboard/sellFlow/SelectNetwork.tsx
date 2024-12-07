import React, { useEffect, useState } from "react";
import { IoMdStopwatch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { useUser } from "../../../context/user-context";
import { bnb, btc, eth, solana, trx } from "../../../assets/images";

const SelectNetwork = ({
  setSelectNetworkModal,
  setSelectCoinModal,
  setSelectBankModal,
  setBuyCoinModal,
  setNetwork,
  coin,
  sellRate,
  networks,
}: any) => {
  const { displayColor } = useUser();
  const [networkSelect, setNetworkSelect] = useState<number>(100);
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  const networkImages: { [key: string]: string } = {
    Bitcoin: btc,
    "Ethereum Mainnet": eth,
    "Ethereum Network": eth,
    "Binance Smart Chain": bnb,
    "Tron Network": trx,
    Solana: solana,
  };
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectNetworkModal(false);
              setSelectCoinModal(true);
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
              setSelectNetworkModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Select Network
        </h4>
        <div className="w-full mt-12">
          {networks.map((networkk: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                if (networkSelect === index) {
                  setNetworkSelect(100);
                  setNetwork("");
                } else {
                  setNetworkSelect(index);
                  setNetwork(networkk.code);
                }
              }}
              style={{
                border:
                  networkSelect === index
                    ? `1px solid ${bgColor}`
                    : "1px solid transparent",
              }}
              className={`w-full flex p-4 rounded-xl mb-4 dark:bg-[#303030] bg-[#F1F1F1] ${
                networkSelect === index
                  ? `${bgColor ? `border-[${bgColor}] border` : " "}  `
                  : ""
              }  justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                <div className="w-[32px] h-[32px]  rounded-full ">
                  <img
                    src={networkImages[networkk.name] || ""} // Default image fallback
                    alt={`${networkk.name} logo`}
                    className="w-full h-full bg-cover rounded-full"
                  />
                </div>
                <h4 className="text-[14px] dark:text-gray-300 uppercase text-black tracking-widest">
                  {networkk.code}
                </h4>
              </div>

              <div className="">
                <h4 className="text-[12px] dark:text-[#D0D5DD] text-black tracking-widest">
                  Fee = Free
                </h4>
                <h4 className="text-[12px] text-right dark:text-gray-400 mt-1 text-black tracking-widest">
                  ⚡️ 5mins
                </h4>
              </div>
            </div>
          ))}
        </div>
        <button
          disabled={networkSelect === 100}
          onClick={() => {
            setSelectNetworkModal(false);
            if (sellRate) {
              setSelectBankModal(true);
            } else {
              setBuyCoinModal(true);
            }
          }}
          style={{ backgroundColor: networkSelect !== 100 ? bgColor : "" }}
          className={`w-full h-[52px] rounded-[18px] mt-16 ${
            networkSelect === 100
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"}  text-white`
          }  flex justify-center items-center  font-semibold`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SelectNetwork;
