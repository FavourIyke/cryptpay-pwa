import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { avatar } from "../../../assets/images";

const InvitedFriends = ({ setRefMode }: any) => {
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setRefMode(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <div className="mt-12 flex justify-center gap-4">
        <div className="bg-text_blue w-1/2 rounded-xl p-3 pb-8">
          <h4 className="text-white   font-medium text-[12px]">Earnings</h4>
          <h4 className="text-white mt-2  font-semibold text-[24px]">
            ₦300,000
          </h4>
        </div>
        <div className="dark:bg-[#292929] bg-[#E3E3E3] w-1/2 rounded-xl p-3 pb-8">
          <h4 className="text-gray-800 dark:text-gray-400    font-medium text-[12px]">
            Number of Invites
          </h4>
          <h4 className="dark:text-white text-gray-800  mt-2  font-semibold text-[24px]">
            130
          </h4>
        </div>
      </div>
      <button
        onClick={() => setRefMode(3)}
        className="text-text_blue w-full mt-8 border border-text_blue h-[48px] rounded-2xl flex justify-center items-center text-[14px]"
      >
        View Leaderboard
      </button>
      <div className="w-full flex justify-between items-center mt-16 lgss:mt-12">
        <h4 className="text-gray-800 dark:text-gray-100   font-semibold text-[18px]">
          Invited Friends
        </h4>
      </div>
      <div className="w-full mt-8">
        <div className="font-sora bg-[#E3E3E3] dark:bg-[#292929] p-3 rounded-xl  w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-[26px] h-[26px]  rounded-full ">
              <img src={avatar} className="w-full h-full bg-cover" alt="" />
            </div>
            <div>
              <h4 className="text-black dark:text-white  text-[12px]">Peter</h4>

              <h4 className="text-gray-400 dark:text-gray-500  text-[10px]">
                Joined today
              </h4>
            </div>
          </div>
          <div>
            <h4 className="text-gray-800 dark:text-gray-400 text-right font-medium text-[12px]">
              You Earned
            </h4>
            <h4 className="text-black dark:text-white mt-1 text-right font-medium text-[10px]">
              ₦250.50
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedFriends;
