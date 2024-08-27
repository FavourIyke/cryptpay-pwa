import { useMutation } from "@tanstack/react-query";
import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { API } from "../../constants/api";
import useAuthAxios from "../../utils/baseAxios";
import { toast } from "react-toastify";
import { errorMessage } from "../../utils/errorMessage";
import { useAuth } from "../../context/auth-context";
import ClipLoader from "react-spinners/ClipLoader";

const LogoutModal = ({ setLogout }: any) => {
  const { logout } = useAuth();
  const axiosInstance = useAuthAxios();

  const handleLogout = async () => {
    const response = await axiosInstance.post(API.logout, {});
    return response.data;
  };
  const completeLogout = useMutation({
    mutationFn: handleLogout,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        logout();
      }, 1500);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        errorMessage((error?.data as any)?.error || String(error?.data))
      );
    },
  });
  return (
    <div className="fixed inset-0 flex font-sora justify-center items-center  -top-20   backdrop-blur-sm ">
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border dark:border-[#303030] border-[#E6E6E6] bg-white  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   `}
      >
        <div className="flex flex-col px-4 justify-center mt-6 gap-4 items-center">
          <RiErrorWarningFill className="text-[100px] text-[#D42620] dark:text-[#DD524D] " />
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            Log out
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            Are you sure you want to logout of your account?
          </p>
          <div className="w-full flex items-center gap-4">
            <button
              onClick={() => {
                setLogout(false);
              }}
              className={`w-10/12 h-[52px] rounded-[18px] bg-transparent border text-[#D42620] dark:text-[#DD524D]  dark:border-[#DD524D] border-[#D42620] mt-4 flex justify-center items-center  font-semibold`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                completeLogout.mutate();
              }}
              className={`w-10/12 h-[52px] rounded-[18px] dark:bg-[#DD524D] bg-[#D42620] mt-4 text-white flex justify-center items-center  font-semibold`}
            >
              {completeLogout.isPending ? (
                <ClipLoader color="#FFFFFF" size={30} />
              ) : (
                "Log out"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
