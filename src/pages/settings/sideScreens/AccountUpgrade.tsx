import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlArrowLeft } from "react-icons/sl";

const AccountUpgrade = ({ setSidePage, setScreen }: any) => {
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSidePage(false);
          setScreen(0);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Account Upgrade
      </h4>
      <div className="w-full mt-8 overflow-auto  lgss:h-[600px]">
        <div className="w-full relative  pt-3">
          <div className="w-full  px-4 py-6  border-2 rounded-xl bg-[#F1F1F1] dark:bg-[#1F1F1F] border-text_blue ">
            <div className="w-[25%] py-1 absolute top-0  left-[6%]  flex justify-center items-center font-medium text-white bg-text_blue rounded-lg text-[12px] ">
              Current Tier
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-[18px] text-gray-900 dark:text-gray-50">
                Tier 1
              </h4>
              <div className="w-full mt-4">
                <div className="w-full flex justify-between items-center">
                  <h4 className=" text-[14px] text-gray-600 dark:text-gray-100">
                    Daily Transaction Limit
                  </h4>
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    ₦1,000,000
                  </h4>
                </div>
                <h4 className=" text-[14px] mt-2 text-gray-600 dark:text-gray-100">
                  Sell Only
                </h4>
                <h4 className=" text-[14px] mt-2 text-gray-600 dark:text-gray-100">
                  One Bank Account
                </h4>
              </div>
              <h4 className="font-semibold text-[14px] mt-4 text-gray-900 dark:text-gray-50">
                Requirements
              </h4>
              <div className="w-full mt-4">
                <div className="w-full flex justify-start gap-2 items-center">
                  <CiCircleCheck className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Bank Verification Number
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  <CiCircleCheck className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Email Address
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  <CiCircleCheck className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Liveness Check
                  </h4>
                </div>
              </div>
              <button className="w-2/3 bg-text_blue mt-4 h-[44px] rounded-xl text-[14px] font-semibold text-white">
                Click to start upgrade
              </button>
            </div>
          </div>
        </div>
        <div className="w-full relative mt-6  pt-3">
          <div className="w-full  px-4 py-6  border-2 rounded-xl bg-[#F1F1F1] dark:bg-[#1F1F1F] border-text_blue ">
            <div className="w-[25%] py-1 absolute top-0  left-[6%]  flex justify-center items-center font-medium text-white bg-text_blue rounded-lg text-[12px] ">
              Current Tier
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-[18px] text-gray-900 dark:text-gray-50">
                Tier 2
              </h4>
              <div className="w-full mt-4">
                <div className="w-full flex justify-between items-center">
                  <h4 className=" text-[14px] text-gray-600 dark:text-gray-100">
                    Daily Transaction Limit
                  </h4>
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    ₦1,000,000
                  </h4>
                </div>
                <h4 className=" text-[14px] mt-2 text-gray-600 dark:text-gray-100">
                  Unlimited Sell and Buy
                </h4>
                <h4 className=" text-[14px] mt-2 text-gray-600 dark:text-gray-100">
                  Multiple Bank Accounts{" "}
                </h4>
              </div>
              <h4 className="font-semibold text-[14px] mt-4 text-gray-900 dark:text-gray-50">
                Requirements
              </h4>
              <div className="w-full mt-4">
                <div className="w-full flex justify-start gap-2 items-center">
                  <IoIosRemoveCircleOutline className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Government ID
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  <IoIosRemoveCircleOutline className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    House Address
                  </h4>
                </div>
                <div className="w-full mt-2 flex justify-start gap-2 items-center">
                  <IoIosRemoveCircleOutline className="text-[#8CBBFF] text-[20px]" />
                  <h4 className=" text-[14px] text-right text-gray-600 dark:text-gray-100">
                    Utility Bill of House Address
                  </h4>
                </div>
              </div>
              <button className="w-2/3 bg-text_blue mt-4 h-[44px] rounded-xl text-[14px] font-semibold text-white">
                Click to start upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpgrade;
