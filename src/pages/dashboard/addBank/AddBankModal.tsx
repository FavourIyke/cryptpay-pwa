import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl";
import { kudaLogo, opayLogo } from "../../../assets/images";

const AddBankModal = ({
  setBankAddedModal,
  setAddBankModal,
  setSelectBankModal,
}: any) => {
  const [bankNumber, setBankNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [bankQuery, setBankQuery] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!bankName || bankNumber.length !== 10) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [bankName, bankNumber.length]);
  return (
    <div className="fixed inset-0 top-20 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setAddBankModal(false);
              setSelectBankModal(true);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
          <button
            onClick={() => {
              setAddBankModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Add New Bank
        </h4>
        <h4 className="dark:text-gray-300 text-gray-800 mt-2 pr-12 text-[14px]">
          Ensure your bank account name matches your BVN name
        </h4>
        <div className="w-full mt-8">
          <div className="w-full">
            <label className="text-gray-800 text-[14px] font-medium dark:text-white">
              Bank Name
            </label>
            <div
              onClick={() => setDropDown((prev) => !prev)}
              className="w-full cursor-pointer dark:text-gray-400 text-gray-800 bg-[#FAFAFA] dark:bg-transparent dark:border-gray-400 h-[52px] mt-2 flex justify-between items-center  outline-none text-[14px] border border-gray-300 bg-transparent px-4  rounded-xl "
            >
              <h4 className="text-[14px] dark:text-gray-50 text-gray-8000">
                {bankName ? bankName : "Select bank"}
              </h4>
              <SlArrowDown className="dark:text-white text-gray-800 txt-[24px]" />
            </div>
          </div>
          {dropDown ? (
            <div className="mt-8 px-4">
              <h4 className="text-[20px] dark:text-white text-gray-800">
                Choose Bank
              </h4>
              <div className="w-full dark:text-gray-50 text-gray-8000  bg-[#FAFAFA] dark:bg-transparent dark:border-[#484848] h-[42px] gap-2 mt-4   outline-none text-[14px] border border-gray-300 bg-transparent px-4 flex items-center spin-button-none rounded-lg ">
                <CiSearch className="text-[20px]" />
                <input
                  type="text"
                  value={bankQuery}
                  onChange={(e) => setBankQuery(e.target.value.toLowerCase())}
                  placeholder="Search for banks"
                  className="w-10/12 outline-none placeholder:text-[12px] bg-transparent"
                />
              </div>
              <div className="w-full mt-4 h-[200px] overflow-auto">
                <div
                  onClick={() => {
                    setBankName("Kuda");
                    setDropDown((prev) => !prev);
                  }}
                  className="flex w-full mt-4 cursor-pointer gap-2 items-center"
                >
                  <div className="w-[24px] h-[24px] ">
                    <img
                      src={kudaLogo}
                      className="w-full h-full bg-cover"
                      alt=""
                    />
                  </div>
                  <h4 className="dark:text-gray-50 text-gray-800  font-medium text-[14px]">
                    Kuda MFB
                  </h4>
                </div>
                <div
                  onClick={() => {
                    setBankName("Opay");
                    setDropDown((prev) => !prev);
                  }}
                  className="flex gap-2 mt-4 items-center"
                >
                  <div className="w-[24px] h-[24px] ">
                    <img
                      src={opayLogo}
                      className="w-full h-full bg-cover"
                      alt=""
                    />
                  </div>
                  <h4 className="dark:text-gray-50 text-gray-800  font-medium text-[14px]">
                    Opay
                  </h4>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full mt-6">
              <label className="text-gray-800 text-[14px] font-medium dark:text-white">
                Account number
              </label>
              <input
                type="number"
                value={bankNumber}
                onChange={(e) => setBankNumber(e.target.value)}
                placeholder="Enter 10 digit account number"
                className="w-full dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
              />
              <h4 className="text-[14px] mt-2 dark:text-gray-400 text-gray-800">
                Daniel Mason Ovie
              </h4>
              <button
                disabled={disabled}
                onClick={() => {
                  setAddBankModal(false);
                  setBankAddedModal(true);
                }}
                className={`w-full h-[52px] rounded-[18px] mt-8 ${
                  disabled
                    ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : "bg-text_blue text-white"
                }  flex justify-center items-center  font-semibold`}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBankModal;
