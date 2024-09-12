import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { SlArrowLeft, SlOptions } from "react-icons/sl";
import { toast } from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const BankDetails = ({ setSidePage, setScreen, setBankMode }: any) => {
  const axiosInstance = useAuthAxios();
  const queryClient = useQueryClient();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleOptionsClick = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

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
      handleOptionsClick(loadingIndex ? loadingIndex : 100);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
      setLoadingIndex(null);
    },
  });
  const deleteBank = async () => {
    const response = await axiosInstance.post(API.deleteBank(bankId), {});
    return response.data;
  };
  const completeDeleteBank = useMutation({
    mutationFn: deleteBank,
    onSuccess: (r) => {
      toast.success(r.message);
      queryClient.invalidateQueries({
        queryKey: ["user-banks"],
      });
      setDeleteIndex(null);
      handleOptionsClick(deleteIndex ? deleteIndex : 100);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
      setLoadingIndex(null);
    },
  });
  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const { data: kycStatus, error: error3 } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });

  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);
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
        Your Banks
      </h4>
      <h4 className="text-gray-800 dark:text-gray-100 mt-2  font-medium text-[14px]">
        Your bank to receive payout
      </h4>
      <div className="w-full flex flex-col mt-8 justify-between gap-24 items-center">
        <div className="w-full h-[500px] lgss:h-[400px] overflow-auto pb-10">
          {userBanks
            ?.sort((a: any, b: any) => b.is_default - a.is_default)
            .map((bank: any, index: any) => (
              <div
                key={index}
                className={
                  bank.is_default
                    ? "w-full relative  pt-3"
                    : "w-full relative  mt-4 "
                }
              >
                <div
                  className={
                    bank.is_default
                      ? "w-full  px-4 py-6  border rounded-xl border-text_blue "
                      : "w-full  px-4 py-6  border rounded-xl border-gray-300 dark:border-[#282828] "
                  }
                >
                  {bank.is_default && (
                    <div className="w-[20%] py-1 absolute top-0  left-[73%]  flex justify-center items-center text-white bg-text_blue rounded-lg font-medium text-[12px] ">
                      Default
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="">
                      <h4 className="dark:text-gray-100 text-gray-900 capitalize  font-medium text-[14px]">
                        {bank.account_name}
                      </h4>
                      <div className="flex justify-start mt-1 items-center gap-3">
                        {allBanks?.data
                          .filter((banki: any) => banki.code === bank.bank_code)
                          .map((bankk: any, index: any) => (
                            <h4
                              key={index}
                              className="dark:text-gray-400 text-gray-500 capitalize   text-[12px]"
                            >
                              {bankk.name}
                            </h4>
                          ))}

                        <div className="w-[4px] h-[4px] rounded-full bg-[#D9D9D9] " />
                        <h4 className="dark:text-gray-400 text-gray-500 capitalize   text-[12px]">
                          {bank.account_number}
                        </h4>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-[#2B2B2B] flex justify-center items-center h-[32px] w-[32px] rounded-full">
                      <SlOptions
                        onClick={() => handleOptionsClick(index)}
                        className="dark:text-gray-100 text-gray-600 cursor-pointer text-[16px]"
                      />
                    </div>
                  </div>
                  {openDropdownIndex === index && (
                    <div className="absolute top-full right-0 bg-[#F4F4F4]  z-50 text-[14px] px-4 border-[#EDEDED] dark:bg-[#111111] border  dark:border-[#1E1E1E] rounded-lg shadow-lg">
                      {!bank.is_default && (
                        <button
                          onClick={() => {
                            setBankId(bank.id);

                            setLoadingIndex(index);
                            setTimeout(() => {
                              completeMakeDefault.mutate();
                            }, 1000);
                          }}
                          className="w-full py-4 text-left text-gray-700 border-b border-gray-200 dark:border-gray-600 dark:text-gray-300"
                        >
                          {loadingIndex === index ? (
                            <ClipLoader color="#5E91FF" size={20} />
                          ) : (
                            " Make Default"
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setBankId(bank.id);

                          setDeleteIndex(index);
                          setTimeout(() => {
                            completeDeleteBank.mutate();
                          }, 1000);
                        }}
                        className="w-full  py-4 text-left text-gray-800 dark:text-gray-100 "
                      >
                        {deleteIndex === index ? (
                          <ClipLoader color="#5E91FF" size={20} />
                        ) : (
                          " Delete"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="w-full ">
          <button
            onClick={() => {
              if (kycStatus?.data.kyc_level === "0") {
                navigate("/kyc");
              } else {
                setBankMode(2);
              }
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

export default BankDetails;
