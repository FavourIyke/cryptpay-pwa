import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { avatar } from "../../../assets/images";

const Leaderboard = ({ setRefMode }: any) => {
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setRefMode(2);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <div className="font-sora mt-8 bg-[#E3E3E3] dark:bg-[#292929] p-3 rounded-xl  w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[26px] h-[26px]  rounded-full ">
            <img src={avatar} className="w-full h-full bg-cover" alt="" />
          </div>
          <div>
            <h4 className="text-black dark:text-white  text-[12px]">Daniel</h4>

            <h4 className="text-gray-400 dark:text-gray-500  text-[10px]">
              @daniel001
            </h4>
          </div>
        </div>
        <div>
          <h4 className="text-gray-800 dark:text-gray-400 text-right font-medium text-[12px]">
            Rank
          </h4>
          <h4 className="text-black dark:text-white mt-1 text-right font-medium text-[10px]">
            125
          </h4>
        </div>
      </div>
      <h4 className="text-gray-800 dark:text-gray-100  mt-12 lgss:mt-12 font-semibold text-[18px]">
        Leaderboard
      </h4>
      <div className="font-sora mt-4 bg-[#E3E3E3] dark:bg-[#292929] p-3 rounded-xl  w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[26px] h-[26px]  rounded-full ">
            <img src={avatar} className="w-full h-full bg-cover" alt="" />
          </div>
          <div>
            <h4 className="text-black dark:text-white  text-[12px]">Peter</h4>

            <h4 className="text-gray-400 dark:text-gray-500  text-[10px]">
              @peter001
            </h4>
          </div>
        </div>
        <div>
          <h4 className="text-gray-800 dark:text-gray-400 text-right font-medium text-[12px]">
            Rank
          </h4>
          <h4 className="text-black dark:text-white mt-1 text-right font-medium text-[10px]">
            1
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
