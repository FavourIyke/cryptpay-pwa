import React from "react";
import { BsBank } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { PiUserFocusLight } from "react-icons/pi";
import { RiListSettingsFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { BiSupport } from "react-icons/bi";

const ButtonConfig = ({
  setScreen,
  setSidePage,
  number,
  name,
  subtext,
}: any) => {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setSidePage(true);
          setScreen(number);
        }}
        className="w-full flex  justify-between items-center px-4 mt-12 bg-transparent"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
            {number === 2 ? (
              <PiUserFocusLight className="text-[16px] text-white dark:text-gray-800" />
            ) : number === 3 ? (
              <BsBank className="text-[16px] text-white dark:text-gray-800" />
            ) : number === 4 ? (
              <FaUsers className="text-[16px] text-white dark:text-gray-800" />
            ) : number === 5 ? (
              <RiListSettingsFill className="text-[16px] text-white dark:text-gray-800" />
            ) : number === 6 ? (
              <CiLock className="text-[16px] text-white dark:text-gray-800" />
            ) : number === 7 ? (
              <BiSupport className="text-[16px] text-white dark:text-gray-800" />
            ) : null}
          </div>
          <div>
            <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
              {name}
            </h4>
            <h4 className="text-gray-500 mt-1 dark:text-gray-400 text-[11px]">
              {subtext}
            </h4>
          </div>
        </div>
        <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
      </button>
    </div>
  );
};

export default ButtonConfig;
