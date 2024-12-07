import React, { useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { avatar, cryptpay, darkCrypt } from "../../../assets/images";
import { useUser } from "../../../context/user-context";
import { formatAmount, getFormattedDate } from "../../../utils/formatDate";
import useAuthAxios from "../../../utils/baseAxios";
import { API } from "../../../constants/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { errorMessage } from "../../../utils/errorMessage";

const InvitedFriends = ({ setRefMode }: any) => {
  const { userDetails, theme } = useUser();
  const axiosInstance = useAuthAxios();
  const referralEarnings = userDetails?.data?.profile?.referral_earnings;
  const referralPoints = userDetails?.data?.profile?.total_referrals;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return cryptpay;
    } else if (theme === "light") {
      return darkCrypt;
    } else if (theme === "system") {
      return darkQuery.matches ? cryptpay : darkCrypt;
    }
    return darkCrypt; // fallback in case of an unexpected value
  };
  const getReferrals = async () => {
    const response = await axiosInstance.get(API.getReferrals);
    return response.data.data;
  };
  const {
    data: referrals,
    error: error2,
    isLoading,
  } = useQuery({
    queryKey: ["get-referrals"],
    queryFn: getReferrals,
    retry: 1,
  });
  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  // console.log(userDetails);
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
      <div className="w-full mt-4 h-[500px] lgss:h-[350px] overflow-auto">
        {referrals?.referrals.length >= 1 ? (
          <div className="w-full">
            {referrals?.referrals?.map((referral: any, index: number) => (
              <div
                key={index}
                className="font-sora mt-4 bg-[#E3E3E3] dark:bg-[#292929] p-3 rounded-xl  w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-[26px] h-[26px]  rounded-full ">
                    <img
                      src={avatar}
                      className="w-full h-full bg-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-black dark:text-white  text-[12px]">
                      {referral?.referee_username}
                    </h4>

                    <h4 className="text-gray-400 dark:text-gray-500  text-[10px]">
                      Joined {getFormattedDate(referral?.date_joined)}
                    </h4>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-800 dark:text-gray-400 text-right font-medium text-[12px]">
                    You Earned
                  </h4>
                  <h4 className="text-black dark:text-white mt-1 text-right font-medium text-[10px]">
                    {formatAmount(referral?.points_earned)} points
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col h-full    justify-start overflow-auto items-center">
            <img src={getThemeBasedImage()} alt="" />
            <h4 className="text-[14px] mt-5 text-center text-gray-800 dark:text-gray-500">
              There are no referrals available yet
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedFriends;
