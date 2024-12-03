import React from "react";
import { success } from "../assets/images";
import AuthNav from "./AuthNav";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      className={` w-full font-sora h-screen pb-16 overflow-auto bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  `}
      >
        <div className="flex flex-col px-8 justify-center gap-6 items-center">
          <div className="w-[72px] h-[72px]">
            <img src={success} className="w-full h-full bg-cover" alt="" />
          </div>
          <h4 className="dark:text-white text-gray-800 text-[22px] font-semibold text-center">
            Password Changed
          </h4>
          <p className="dark:text-white text-gray-800 text-[12px]  text-center">
            You have successfully changed your password, please login with the
            new password
          </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className={`w-10/12 h-[52px] rounded-[18px] bg-text_blue mt-4 text-white flex justify-center items-center  font-semibold`}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
