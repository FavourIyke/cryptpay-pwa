import React, { useEffect, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const SelectBank = ({
  setSelectBankModal,
  setSelectNetworkModal,
  setGenerateAddyModal,
  setAddBankModal,
  setSelectedBankDetails,
}: any) => {
  const axiosInstance = useAuthAxios();
  const queryClient = useQueryClient();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [bankId, setBankId] = useState<number>();
  const getUserBanks = async () => {
    const response = await axiosInstance.get(API.userBanks);
    return response.data.data;
  };
  const { data: userBanks, error: error2 } = useQuery({
    queryKey: ["user-banks"],
    queryFn: getUserBanks,
    retry: 1,
  });

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);

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
  const makeDefault = async () => {
    const response = await axiosInstance.put(API.setDefaultBank(bankId), {});
    return response.data;
  };

  const completeMakeDefault = useMutation({
    mutationFn: makeDefault,
    onSuccess: (r) => {
      toast.success(r.message);
      queryClient.invalidateQueries({
        queryKey: ["user-banks"],
      });
      setLoadingIndex(null);
      // setTimeout(() => {
      //   setSelectBankModal(false);
      //   setGenerateAddyModal(true);
      // }, 1500);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
      setLoadingIndex(null);
    },
  });

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-24 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-10/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setSelectBankModal(false);
              setSelectNetworkModal(true);
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
              setSelectBankModal(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
          Select Bank
        </h4>
        <h4 className="dark:text-gray-300 text-gray-800 mt-2  text-[14px]">
          Select bank to receive payout
        </h4>
        <div
          className={
            userBanks?.length > 2
              ? "mt-8 w-full h-[250px] overflow-auto pb-4"
              : "mt-8 w-full pb-4"
          }
        >
          {userBanks
            ?.sort((a: any, b: any) => b.is_default - a.is_default)
            .map((bank: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  if (bank.is_default) {
                    setSelectBankModal(false);
                    setGenerateAddyModal(true);
                    setSelectedBankDetails(bank);
                  } else {
                    setBankId(bank.id);
                    setLoadingIndex(index);
                    setTimeout(() => {
                      completeMakeDefault.mutate();
                    }, 1000);
                  }
                }}
                className="w-full mt-6 cursor-pointer flex justify-between items-start pb-4 border-b  border-[#FAFAFA]  dark:border-[#484848] "
              >
                <div className="flex gap-4 items-center">
                  {/* <div className="w-[24px] h-[24px] ">
                  <img
                    src={opayLogo}
                    className="w-full h-full bg-cover"
                    alt=""
                  />
                </div> */}
                  {loadingIndex === index ? (
                    <ClipLoader color="#5E91FF" size={20} />
                  ) : (
                    <div
                      className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-full  ${
                        bank.is_default
                          ? "border-[#5E91FF]  "
                          : "bg-transparent border-[#505050]"
                      } border `}
                    >
                      <div
                        className={`w-full h-full rounded-full  ${
                          bank.is_default ? " bg-[#5E91FF] " : "bg-transparent "
                        } `}
                      />
                    </div>
                  )}
                  {allBanks?.data
                    .filter((banki: any) => banki.code === bank.bank_code)
                    .map((bankk: any, index: any) => (
                      <h4
                        key={index}
                        className="dark:text-gray-50 text-gray-800  font-medium text-[12px]"
                      >
                        {bankk.name}
                      </h4>
                    ))}
                </div>
                <div className="">
                  <h4 className="dark:text-gray-400 text-gray-800 uppercase text-right font-medium text-[12px]">
                    {bank.account_name}
                  </h4>

                  <h4 className="dark:text-gray-400 text-gray-800 mt-2 text-right  font-medium text-[12px]">
                    {bank.account_number}
                  </h4>
                </div>
              </div>
            ))}
        </div>

        <div className="w-full mt-12">
          <button
            onClick={() => {
              setSelectBankModal(false);
              setAddBankModal(true);
            }}
            className="w-4/5 xs:w-3/5 mds:w-1/2 mx-auto flex gap-3 items-center justify-center h-[40px] text-[12px] font-medium rounded-xl text-[#3A66FF] border-text_blue border "
          >
            <IoAddOutline className="text-[24px] " />
            <h4>Add Bank Account</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBank;
