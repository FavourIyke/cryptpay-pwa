import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { progress } from "../../../assets/images";
import { useUser } from "../../../context/user-context";

const FinalModal = ({
  setFinalModal,
  setSellAssetModal,
  sellRate,
  setBuyReceiptModal,
  setWalletAddy,
}: any) => {
  const { displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              setFinalModal(false);
              if (sellRate) {
                setSellAssetModal(true);
              } else {
                setBuyReceiptModal(true);
              }
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="flex flex-col px-8 justify-center gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={progress} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            In progress
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            Your order has been received. We will notify you when it's ready,
            usually within 45 seconds
          </p>
          <button
            style={{
              backgroundColor: bgColor,
            }}
            onClick={() => {
              setFinalModal(false);
              setWalletAddy("");
            }}
            className={`w-10/12 h-[52px] rounded-[18px] ${
              bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
            } mt-4 text-white flex justify-center items-center  font-semibold`}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalModal;
