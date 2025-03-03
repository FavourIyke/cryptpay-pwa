import React from "react";
import { BsArrowDown } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const SellOnboard = ({
  setSellModal,
  setSelectCoinModal,
  setSellType,
}: any) => {
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12   backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSellModal(false);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
        </div>
        <div className="w-full mt-8">
          <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
            How do you want to sell?
          </h4>
          <div className="flex flex-col gap-6 mt-6">
            <button
              onClick={() => {
                setSellType("Celler");
                setSellModal(false);
                setSelectCoinModal(true);
              }}
              className="w-full flex  justify-between items-center border-[#CDC4C4] dark:border-[#424242] border px-4 rounded-xl  py-6  bg-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full  dark:bg-[#2F2F2F] dark:text-white bg-text_blue text-white">
                  <FiUsers className="text-[18px] " />
                </div>
                <div>
                  <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                    From Celler Wallet
                  </h4>
                  <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[12px]">
                    Sell crypto using celler wallet
                  </h4>
                </div>
              </div>
              <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
            </button>
            <button
              onClick={() => {
                setSellType("Ex");
                setSellModal(false);
                setSelectCoinModal(true);
              }}
              className="w-full flex  justify-between items-center border-[#CDC4C4] dark:border-[#424242] border px-4 rounded-xl  py-6  bg-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full  dark:bg-[#2F2F2F] dark:text-white bg-text_blue text-white">
                  <BsArrowDown className="text-[18px] " />
                </div>
                <div>
                  <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                    From External Apps
                  </h4>
                  <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[12px]">
                    Sell crypto asset using other apps
                  </h4>
                </div>
              </div>
              <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellOnboard;
