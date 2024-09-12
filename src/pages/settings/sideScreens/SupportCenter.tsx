import React from "react";
import { BiCommentError, BiSupport } from "react-icons/bi";
import { PiWechatLogo } from "react-icons/pi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const SupportCenter = ({ setSidePage, setScreen, setSupportMode }: any) => {
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
        How can we help you?
      </h4>
      <div className="mt-8 w-full">
        <button
          onClick={() => {
            setSupportMode(2);
          }}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <BiSupport className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Contact Support
              </h4>
              <h4 className="text-gray-500  dark:text-gray-400 text-left text-[11px]">
                Contact us through the platforms
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
        </button>
        <button
          onClick={() => {
            setSupportMode(3);
          }}
          className="w-full flex  justify-between mt-8 items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <BiCommentError className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                User Feedback
              </h4>
              <h4 className="text-gray-500  dark:text-gray-400 text-left text-[11px]">
                Share your feedback with us
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
        </button>
        <button
          onClick={() => {
            setSupportMode(4);
          }}
          className="w-full flex mt-8  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <PiWechatLogo className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                FAQ Section
              </h4>
              <h4 className="text-gray-500  dark:text-gray-400 text-left text-[11px]">
                Find answers to common questions
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
        </button>
      </div>
    </div>
  );
};

export default SupportCenter;
