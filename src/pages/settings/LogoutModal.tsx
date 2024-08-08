import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setLogout }: any) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex font-sora justify-center items-center  -top-20   backdrop-blur-sm ">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6] bg-white  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
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
                navigate("/login");
              }}
              className={`w-10/12 h-[52px] rounded-[18px] dark:bg-[#DD524D] bg-[#D42620] mt-4 text-white flex justify-center items-center  font-semibold`}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
