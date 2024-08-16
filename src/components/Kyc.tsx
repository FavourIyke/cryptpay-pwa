import React, { useState } from "react";
import AuthNav from "./AuthNav";
import "@smile_identity/smart-camera-web";
import SmartCameraComponent from "./SmartCamera";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";

const Kyc = () => {
  const [bvn, setBvn] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);

  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-9/12 mds:w-7/12 md:6/12 border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-1/3 xxl:w-1/3 `}
      >
        <Link to="/dashboard" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Skip
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Verify
        </h4>
        <div className="w-full mt-8">
          <div className="w-full">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              BVN Number
            </label>
            <input
              type="number"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              placeholder="Enter your BVN"
              className="w-full dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            />
            <h4 className="text-gray-800 dark:text-gray-300  text-[11px] mt-2">
              Dial *565*0# to check for your BVN
            </h4>
          </div>
          <div className="w-full mt-10">
            <label className="text-gray-800 text-[14px] dark:text-white">
              Surname
            </label>
            <div className="w-full flex justify-between px-4  items-center dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2 text-[14px] border border-gray-300 bg-transparent  spin-button-none rounded-xl">
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="eg: Chidi"
                className="w-10/12   outline-none bg-transparent "
              />
            </div>
          </div>
          {isImageCaptured && (
            <SmartCameraComponent setIsImageCaptured={setIsImageCaptured} />
          )}

          <button
            onClick={() => {
              setIsImageCaptured(true);
            }}
            // disabled={!email || !password || completeLogin.isPending}
            className={`w-full h-[52px] rounded-[18px] mt-12 ${
              !bvn || !surname
                ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
