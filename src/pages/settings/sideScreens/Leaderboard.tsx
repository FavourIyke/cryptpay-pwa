import React, { useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { avatar, cryptpay, darkCrypt } from "../../../assets/images";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../../constants/api";
import { useUser } from "../../../context/user-context";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { formatAmount } from "../../../utils/formatDate";

const Leaderboard = ({ setRefMode }: any) => {
  const { userDetails, theme } = useUser();
  const axiosInstance = useAuthAxios();

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const referralCode = userDetails?.data?.profile?.username;

  const referralPoints = userDetails?.data?.profile?.total_points;
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
  const getLeaderboard = async () => {
    const response = await axiosInstance.get(API.getLeaderboard);
    return response.data.data;
  };
  const {
    data: leaderboard,
    error: error2,
    isLoading,
  } = useQuery({
    queryKey: ["get-leaderboard"],
    queryFn: getLeaderboard,
    retry: 1,
  });
  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  console.log(leaderboard);
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
            <h4 className="text-black dark:text-white  text-[12px]">
              {referralCode ?? ""}
            </h4>

            <h4 className="text-gray-400  text-[10px]">
              {referralPoints ? referralPoints : 0}
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
      <div className="w-full mt-4 h-[650px] lgss:h-[500px] overflow-auto">
        {leaderboard?.leaderboard.length >= 1 ? (
          <div className="w-full">
            {leaderboard?.leaderboard?.map((board: any, index: number) => (
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
                      {board?.username}
                    </h4>

                    <h4 className="text-gray-400   text-[10px]">
                      {formatAmount(board.points)} points
                    </h4>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-800 dark:text-gray-400 text-right font-medium text-[12px]">
                    Rank
                  </h4>
                  <h4 className="text-black dark:text-white mt-1 text-right font-medium text-[10px]">
                    {board?.rank}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col h-full    justify-start overflow-auto items-center">
            <img src={getThemeBasedImage()} alt="" />
            <h4 className="text-[14px] mt-5 text-center text-gray-800 dark:text-gray-400">
              There are no Leaderboards available yet
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
