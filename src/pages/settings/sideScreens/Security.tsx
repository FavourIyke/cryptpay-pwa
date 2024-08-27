import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { toast } from "react-toastify";
import { API } from "../../../constants/api";
import { useUser } from "../../../context/user-context";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { MdMarkEmailUnread } from "react-icons/md";
import { GoLock } from "react-icons/go";

const Security = ({ setSidePage, setScreen, setSecScreen }: any) => {
  const { userPreferences, refetch2 } = useUser();
  const axiosInstance = useAuthAxios();
  // const queryClient = useQueryClient();

  const updateEmailN = async ({ email_auth }: any) => {
    const response = await axiosInstance.post(API.userPreferences, {
      email_auth,
    });
    return response.data;
  };

  const handleUpdateEmailN = useMutation({
    mutationFn: updateEmailN,
    onSuccess: (r) => {
      toast.success(r.message);
      // queryClient.invalidateQueries({
      //   queryKey: ["user-preferences"],
      // });
      refetch2();
    },
    onError: (e) => {
      console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });

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
        Security
      </h4>
      <div className="flex flex-col gap-12 mt-12 w-full">
        {/* <button
          onClick={() => {
            setSecScreen(2);
          }}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <GoLock className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Transaction PIN
              </h4>
              <h4 className="text-gray-500  dark:text-gray-400 text-left text-[11px]">
                Setup and change your PIN for added security
              </h4>
            </div>
          </div>
          <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
        </button> */}

        <button
          onClick={() => {}}
          className="w-full flex  justify-between items-center  bg-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
              <MdMarkEmailUnread className="text-[16px] text-white dark:text-gray-800" />
            </div>
            <div>
              <h4 className="text-gray-800 text-left dark:text-gray-50 text-[14px]">
                Email Authentication
              </h4>
              <h4 className="text-gray-500 text-left dark:text-gray-400 text-[11px]">
                Secure your account by using email 2FA
              </h4>
            </div>
          </div>
          <div className="flex justify-center gap-2 lgss:gap-4 mx-4 lgss:mx-0 items-center flex-col lgss:flex-row">
            <div
              onClick={() => {
                handleUpdateEmailN.mutate({
                  email_auth: !userPreferences?.preferences.email_auth,
                });
              }}
              className={`flex w-[52px] cursor-pointer h-8  rounded-full transition-all duration-500 ${
                userPreferences?.preferences.email_auth
                  ? "bg-text_blue"
                  : "bg-gray-600"
              }`}
            >
              <span
                className={`h-8  w-8 rounded-full transition-all duration-500 bg-gray-100 ${
                  userPreferences?.preferences.email_auth ? "ml-5" : ""
                }`}
              ></span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Security;
