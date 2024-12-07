import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaUserPlus } from "react-icons/fa6";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { SlArrowLeft } from "react-icons/sl";
import { useUser } from "../../../context/user-context";
import { APP_URL } from "../../../constants/api";
import toast from "react-hot-toast";
import { formatAmount } from "../../../utils/formatDate";

const Referral = ({ setSidePage, setScreen, setRefMode }: any) => {
  const { userDetails } = useUser();
  const referralCode = userDetails?.data?.profile?.username;
  const referralEarnings = userDetails?.data?.profile?.referral_earnings;
  const referralPoints = userDetails?.data?.profile?.total_referrals;

  // console.log(userDetails);
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
      <div className="w-full flex justify-between items-center mt-12 lgss:mt-8">
        <h4 className="text-gray-800 dark:text-gray-100   font-semibold text-[18px]">
          Referral
        </h4>
        <button
          onClick={() => setRefMode(2)}
          className="text-text_blue text-[14px]"
        >
          Invited Friends
        </button>
      </div>
      <div className="w-full mt-8 bg-[#E3E3E3] rounded-xl flex items-center gap-3 p-3 dark:bg-[#292929]">
        <FaUserPlus className="text-gray-800 dark:text-gray-50 text-[24px]" />
        <h4 className="text-gray-800 dark:text-gray-50   font-semibold text-[12px]">
          Invite your friends and earn up to 25% from their trading fees
        </h4>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <div className="bg-text_blue w-1/2 rounded-xl p-3 pb-8">
          <h4 className="text-white   font-medium text-[12px]">Earnings</h4>
          <h4 className="text-white mt-2  font-semibold text-[19px]">
            ₦{referralEarnings ? formatAmount(referralEarnings) : "0"}
          </h4>
        </div>
        <div className="dark:bg-[#292929] bg-[#E3E3E3] w-1/2 rounded-xl p-3 pb-8">
          <h4 className="text-gray-800 dark:text-gray-400    font-medium text-[12px]">
            Number of Invites
          </h4>
          <h4 className="dark:text-white text-gray-800  mt-2  font-semibold text-[20px]">
            {referralPoints ? referralPoints.toLocaleString("en-US") : "0"}
          </h4>
        </div>
      </div>
      <div className="mt-16 w-full">
        <h4 className="dark:text-white text-gray-800     text-[14px]">
          Referral Code
        </h4>
        <div className="w-full h-[52px] flex justify-between px-4 mt-2 items-center rounded-xl border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-500">
          <h4 className="dark:text-white text-gray-800  text-[12px]">
            {referralCode ?? ""}
          </h4>
          <CopyToClipboard
            text={referralCode ?? ""}
            onCopy={() => {
              toast.success("Referral code copied");
            }}
          >
            <FiCopy className="text-[12px] text-gray-500 dark:text-gray-300" />
          </CopyToClipboard>
        </div>
        <h4 className="dark:text-white text-gray-800 mt-8   text-[14px]">
          Referral Link
        </h4>
        <div className="w-full h-[52px] flex justify-between px-4 mt-2 items-center rounded-xl border border-gray-300 bg-[#F1F1F1] dark:bg-transparent dark:border-gray-500">
          <h4 className="dark:text-white text-gray-800   text-[12px]">
            {APP_URL}/sign-up?r={referralCode}
          </h4>
          <CopyToClipboard
            text={`${APP_URL}/sign-up?r=${referralCode}`}
            onCopy={() => {
              toast.success("Referral link copied");
            }}
          >
            <FiCopy className="text-[12px] text-gray-500 dark:text-gray-300" />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Referral;
