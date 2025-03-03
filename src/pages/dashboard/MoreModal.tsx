import React from "react";
import { IoClose, IoMoonSharp, IoWalletOutline } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { useUser } from "../../context/user-context";
import { RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const MoreModal = ({ setOpenMore, setSelectCoinModal, setOpenWallet }: any) => {
  const { theme, setTheme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return "dark";
    } else if (theme === "light") {
      return "light";
    } else if (theme === "system") {
      return darkQuery.matches ? "dark" : "light";
    }
    return "light"; // fallback in case of an unexpected value
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the settings route and set state to true
    navigate("/settings", { state: { setScreen: 3 } });
  };
  const handleReferralClick = () => {
    // Navigate to the settings route and set state to true
    navigate("/settings", { state: { setScreen: 4 } });
  };
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12  backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-2/5 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => {
              setOpenMore(false);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>

          {/* <button
            onClick={() => {
              setOpenMore(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button> */}
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              setOpenMore(false);
              setSelectCoinModal(true);
            }}
            className="w-full flex  justify-between items-center  py-6  bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <AiOutlineThunderbolt className="text-[24px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                  View Rate
                </h4>
                <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
                  See exciting trading rates
                </h4>
              </div>
            </div>
            <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
          </button>
          <button
            onClick={() => {
              setOpenMore(false);
              handleReferralClick();
            }}
            className="w-full flex  justify-between items-center  py-6  bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <FaUsers className="text-[24px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                  Refer A Friend
                </h4>
                <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
                  Earn commissions from referral
                </h4>
              </div>
            </div>
            <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
          </button>
          <button
            onClick={() => {
              setOpenMore(false);
              handleButtonClick();
            }}
            className="w-full flex  justify-between items-center  py-6  bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <BsBank className="text-[24px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                  Bank Details
                </h4>
                <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
                  View your payout bank accounts
                </h4>
              </div>
            </div>
            <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
          </button>
          <button
            onClick={() => {
              setOpenMore(false);
              setOpenWallet(true);
            }}
            className="w-full flex  justify-between items-center  py-6  bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <IoWalletOutline className="text-[24px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                  Wallet
                </h4>
                <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
                  Click to have access to your wallet
                </h4>
              </div>
            </div>
            <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
          </button>
          <button
            onClick={() => {}}
            className="w-full flex  justify-between items-center  py-6  bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                {theme === "light" ? (
                  <RiSunFill className="text-[24px] text-white dark:text-gray-800" />
                ) : (
                  <IoMoonSharp className="text-[24px] text-white dark:text-gray-800" />
                )}
              </div>
              <div>
                <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                  {getThemeBasedImage() === "dark" ? "Dark" : "Light"} Theme
                </h4>
                <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
                  Select the feel of your app
                </h4>
              </div>
            </div>
            <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
              <div
                onClick={() => {
                  if (getThemeBasedImage() === "dark") {
                    setTheme("light");
                  } else if (getThemeBasedImage() === "light") {
                    setTheme("dark");
                  }
                }}
                className={`flex w-[52px] cursor-pointer h-8  rounded-full transition-all duration-500 ${
                  getThemeBasedImage() === "dark"
                    ? "bg-text_blue"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`h-8  w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                    getThemeBasedImage() === "dark" ? "ml-5" : ""
                  }`}
                ></span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreModal;
