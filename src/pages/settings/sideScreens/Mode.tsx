import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useUser } from "../../../context/user-context";

const Mode = ({ setMode }: any) => {
  const { theme, setTheme } = useUser();
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setMode(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Mode
      </h4>
      <div className="mt-12 w-full">
        <button
          onClick={() => {
            setTheme("dark");
          }}
          className="w-full border-b border-[#505050] pb-6 flex justify-between mt-4 items-center"
        >
          <h4 className="text-gray-800 dark:text-gray-50 text-[14px]">
            Dark Mode
          </h4>
          <div
            className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
              theme === "dark"
                ? "border-[#5E91FF]  "
                : "bg-transparent border-[#505050]"
            } border `}
          >
            <div
              className={`w-full h-full rounded-full  ${
                theme === "dark" ? " bg-[#5E91FF] " : "bg-transparent "
              } `}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setTheme("light");
          }}
          className="w-full border-b border-[#505050] pb-6 flex justify-between mt-8 items-center"
        >
          <h4 className="text-gray-800 dark:text-gray-50 text-[14px]">
            Light Mode
          </h4>
          <div
            className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
              theme === "light"
                ? "border-[#5E91FF]  "
                : "bg-transparent border-[#505050]"
            } border `}
          >
            <div
              className={`w-full h-full rounded-full  ${
                theme === "light" ? " bg-[#5E91FF] " : "bg-transparent "
              } `}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setTheme("system");
          }}
          className="w-full border-b border-[#505050] pb-6 flex justify-between mt-8 items-center"
        >
          <h4 className="text-gray-800 dark:text-gray-50 text-[14px]">
            System Mode
          </h4>
          <div
            className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
              theme === "system"
                ? "border-[#5E91FF]  "
                : "bg-transparent border-[#505050]"
            } border `}
          >
            <div
              className={`w-full h-full rounded-full  ${
                theme === "system" ? " bg-[#5E91FF] " : "bg-transparent "
              } `}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Mode;
