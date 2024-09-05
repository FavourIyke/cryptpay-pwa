import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl";
import useAuthAxios from "../../../utils/baseAxios";
import { API } from "../../../constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const AddBankModal = ({
  setBankAddedModal,
  setAddBankModal,
  setSelectBankModal,
}: any) => {
  const [bankNumber, setBankNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [bankQuery, setBankQuery] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [userBankName, setUserBankName] = useState<string>("");
  const axiosInstance = useAuthAxios();
  const [isChecked, setIsChecked] = useState(false);

  const getAllBanks = async () => {
    const response = await axiosInstance.get(API.getAllBanks);
    return response.data;
  };

  const { data: allBanks, error: error1 } = useQuery({
    queryKey: ["all-banks"],
    queryFn: getAllBanks,
    retry: 1,
  });
  useEffect(() => {
    if (error1) {
      const newError = error1 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1]);
  const getbankName = async ({ account_number, bank_code }: any) => {
    const response = await axiosInstance.post(API.getBankName, {
      account_number,
      bank_code,
    });
    return response.data;
  };
  const addBank = async ({
    bank_code,
    account_number,
    account_name,
    is_default,
  }: any) => {
    const response = await axiosInstance.post(API.userBanks, {
      bank_code,
      account_number,
      account_name,
      is_default,
    });
    return response.data;
  };

  const completeGetBankName = useMutation({
    mutationFn: getbankName,
    onSuccess: (r) => {
      toast.success(r.message);
      setUserBankName(r.data.account_name);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });
  const completeAddBank = useMutation({
    mutationFn: addBank,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        setAddBankModal(false);
        setBankAddedModal(true);
      }, 1500);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });
  useEffect(() => {
    if (bankNumber.length === 10 && bankCode) {
      completeGetBankName.mutate({
        account_number: bankNumber,
        bank_code: bankCode,
      });
    }
  }, [bankCode, bankNumber]);
  useEffect(() => {
    if (!bankName || bankNumber.length !== 10 || !userBankName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [bankName, bankNumber.length, userBankName]);
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
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
              <h4 className="text-[14px] dark:text-gray-200 text-gray-500">
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
              <div className="w-full mt-4 h-[200px]  overflow-auto">
                {allBanks?.data
                  .filter((searchValue: any) => {
                    return bankQuery.toLowerCase() === ""
                      ? searchValue
                      : searchValue.name.toLowerCase().includes(bankQuery);
                  })
                  .map((bank: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => {
                        setBankName(bank.name);
                        setBankCode(bank.code);
                        setDropDown((prev) => !prev);
                      }}
                      className="flex w-full border-b border-[#FAFAFA] py-4 dark:border-[#484848]  cursor-pointer gap-2 items-center"
                    >
                      {/* <div className="w-[24px] h-[24px] ">
                      <img
                        src={kudaLogo}
                        className="w-full h-full bg-cover"
                        alt=""
                      />
                    </div> */}
                      <h4 className="dark:text-gray-50 text-gray-800  font-medium text-[13px]">
                        {bank.name}
                      </h4>
                    </div>
                  ))}
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
              <h4 className="text-[13px] font-semibold mt-4 dark:text-gray-400 text-gray-800">
                {userBankName && userBankName}
              </h4>
              {userBankName && (
                <div className="mt-4 flex justify-start gap-3 items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-[18px] w-[18px]"
                  />
                  <h4 className="text-[13px] text-gray-600 dark:text-gray-400 font-sora font-semibold">
                    Make default bank
                  </h4>
                </div>
              )}
              <button
                disabled={disabled}
                onClick={() => {
                  const requestData = {
                    bank_code: bankCode,
                    account_number: bankNumber,
                    account_name: userBankName,
                    is_default: false,
                  };
                  if (isChecked) {
                    requestData.is_default = true;
                  }
                  completeAddBank.mutate(requestData);
                }}
                className={`w-full h-[52px] rounded-[18px] mt-8 ${
                  disabled
                    ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : "bg-text_blue text-white"
                }  flex justify-center items-center  font-semibold`}
              >
                {completeAddBank.isPending ? (
                  <ClipLoader color="#FFFFFF" size={30} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBankModal;
