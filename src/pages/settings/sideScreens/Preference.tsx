import React, { useState } from "react";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import { SlArrowLeft } from "react-icons/sl";
import { useUser } from "../../../context/user-context";
import { IoMoonSharp } from "react-icons/io5";
import { RiSunFill } from "react-icons/ri";

const Preference = ({ setSidePage, setScreen, setMode }: any) => {
  const { theme } = useUser();
  const [pushActive, setPushActive] = useState<boolean>(false);
  const [emailActive, setEmailActive] = useState<boolean>(false);
  const [promotionsActive, setPromotionsActive] = useState<boolean>(false);
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
        Preference
      </h4>
      <div className="flex flex-col gap-12 mt-12 w-full">
        <button
          onClick={() => {
            setMode(3);
          }}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <PiCurrencyCircleDollarBold className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Currency
              </h4>
              <h4 className="text-gray-500  dark:text-gray-400 text-left text-[11px]">
                Choose your default currency
              </h4>
            </div>
          </div>
          {/* <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" /> */}
        </button>
        <button
          onClick={() => {}}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <PiCurrencyCircleDollarBold className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Push Notification
              </h4>
              <h4 className="text-gray-500 text-left dark:text-gray-400 text-[11px]">
                Send in app notification for an activity
              </h4>
            </div>
          </div>
          <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
            <div
              onClick={() => setPushActive((prev) => !prev)}
              className={`flex w-[52px] cursor-pointer h-8  rounded-full transition-all duration-500 ${
                pushActive ? "bg-text_blue" : "bg-gray-600"
              }`}
            >
              <span
                className={`h-8  w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                  pushActive ? "ml-5" : ""
                }`}
              ></span>
            </div>
          </div>
        </button>
        <button
          onClick={() => {}}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <PiCurrencyCircleDollarBold className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Email Notification
              </h4>
              <h4 className="text-gray-500 text-left dark:text-gray-400 text-[11px]">
                Send notification to email
              </h4>
            </div>
          </div>
          <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
            <div
              onClick={() => setEmailActive((prev) => !prev)}
              className={`flex w-[52px] cursor-pointer h-8  rounded-full transition-all duration-500 ${
                emailActive ? "bg-text_blue" : "bg-gray-600"
              }`}
            >
              <span
                className={`h-8  w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                  emailActive ? "ml-5" : ""
                }`}
              ></span>
            </div>
          </div>
        </button>
        <button
          onClick={() => {}}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <PiCurrencyCircleDollarBold className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Promotion
              </h4>
              <h4 className="text-gray-500 text-left dark:text-gray-400 text-[11px]">
                Send marketing update to email
              </h4>
            </div>
          </div>
          <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
            <div
              onClick={() => setPromotionsActive((prev) => !prev)}
              className={`flex w-[52px] cursor-pointer h-8  rounded-full transition-all duration-500 ${
                promotionsActive ? "bg-text_blue" : "bg-gray-600"
              }`}
            >
              <span
                className={`h-8  w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                  promotionsActive ? "ml-5" : ""
                }`}
              ></span>
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            setMode(2);
          }}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              {theme === "light" ? (
                <RiSunFill className="text-[16px] text-white dark:text-gray-800" />
              ) : (
                <IoMoonSharp className="text-[16px] text-white dark:text-gray-800" />
              )}
            </div>
            <div>
              <h4 className="text-gray-800 capitalize text-left dark:text-gray-50 text-[14px]">
                {theme} Theme
              </h4>
              <h4 className="text-gray-500 text-left dark:text-gray-400 text-[11px]">
                Select the feel of your App
              </h4>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Preference;
