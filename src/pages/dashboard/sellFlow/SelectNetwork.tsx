import React, { useState } from "react";
import { IoMdStopwatch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";

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
  const [networkSelect, setNetworkSelect] = useState<number>(100);
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12 lgss:pb-4  backdrop-blur-sm">
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
              className="w-full flex mt-8 justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    if (networkSelect === index) {
                      setNetworkSelect(100);
                      setNetwork("");
                    } else {
                      setNetworkSelect(index);
                      setNetwork(networkk.code);
                    }
                  }}
                  className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
                    networkSelect === index
                      ? "border-[#5E91FF]  "
                      : "bg-transparent border-[#505050]"
                  } border `}
                >
                  <div
                    className={`w-full h-full rounded-full  ${
                      networkSelect === index
                        ? " bg-[#5E91FF] "
                        : "bg-transparent "
                    } `}
                  />
                </div>
                <h4 className="text-[14px] dark:text-gray-300 uppercase text-black tracking-widest">
                  {networkk.code}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <IoMdStopwatch className="text-[16px] dark:text-[#D0D5DD] text-black" />
                <h4 className="text-[10px] dark:text-[#D0D5DD] text-black tracking-widest">
                  ~ 15 mins
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
          className={`w-full h-[52px] rounded-[18px] mt-16 ${
            networkSelect === 100
              ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SelectNetwork;
