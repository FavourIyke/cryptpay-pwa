import React, { useEffect, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const SelectBank = ({
  setSelectBankModal,
  setSelectNetworkModal,
  setSellAssetModal,
  setAddBankModal,
  setSelectedBankDetails,
  setSelectCoinModal,
  networks,
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
  const hasDefaultBank = userBanks?.some((bank: any) => bank.is_default);
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
  useEffect(() => {
    // Check for banks with `is_default` set to true
    const filteredBanks = userBanks?.filter((bank: any) => bank.is_default);
    // Set the banks with `is_default: true` to state
    if (filteredBanks && filteredBanks.length > 0) {
      setSelectedBankDetails(filteredBanks[0]);
    }
  }, [userBanks]);

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12     backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              if (networks.length <= 1) {
                setSelectBankModal(false);
                setSelectCoinModal(true);
              } else {
                setSelectBankModal(false);
                setSelectNetworkModal(true);
              }
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

        <div className="w-full flex justify-between items-center gap-3 mt-12">
          <button
            onClick={() => {
              setSelectBankModal(false);
              setAddBankModal(true);
            }}
            className="w-1/2 mx-auto flex gap-3 items-center justify-center h-[48px] text-[14px] xs:text-[14px] font-medium rounded-xl text-[#3A66FF] border-text_blue border "
          >
            <IoAddOutline className="text-[24px] " />
            <h4>Add Bank</h4>
          </button>
          <button
            disabled={userBanks?.length < 1 || !hasDefaultBank}
            onClick={() => {
              setSelectBankModal(false);
              setSellAssetModal(true);
            }}
            className={
              userBanks?.length < 1 || !hasDefaultBank
                ? "w-1/2 mx-auto flex  items-center justify-center h-[48px] text-[14px] font-medium rounded-xl bg-gray-400 text-gray-100 "
                : "w-1/2 mx-auto flex  items-center justify-center h-[48px] text-[14px] font-medium rounded-xl bg-[#3A66FF] text-gray-100 "
            }
          >
            <h4>Proceed</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBank;
