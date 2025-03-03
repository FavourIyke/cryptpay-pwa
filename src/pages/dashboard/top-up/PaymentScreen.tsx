import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { pause, logo, darkLogo } from "../../../assets/images";
import { formatAmount } from "../../../utils/formatDate";
import { PiWarningCircleLight } from "react-icons/pi";
import ClipLoader from "react-spinners/ClipLoader";
import { useUser } from "../../../context/user-context";
import useAuthAxios from "../../../utils/baseAxios";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaLock, FaTimes } from "react-icons/fa";
import { API } from "../../../constants/api";
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../../../utils/errorMessage";

const PaymentScreen = ({
  setOpenPS,
  setOpenDeposit,
  amount,
  bankDetails,
  setBankDetails,
  setOpenPSuccess,
  setOpenPCancel,
  setBuyModal,
}: any) => {
  const { theme, displayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const axiosInstance = useAuthAxios();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const accountExpiryDate = new Date(time).getTime();
  const getBankDetails = async (data: any) => {
    const response = await axiosInstance.post(API.createPaymentAccount, data);
    return response.data;
  };

  const comfirmDetails = useMutation({
    mutationFn: getBankDetails,
    onSuccess: (r) => {
      // console.log(r);
      setTime(r?.data?.account_expiry_date);
      setBankDetails(r?.data?.account);
      //   toast.success(r.message);
      setTimeout(() => {}, 1500);
      // setTimeout(() => {
      //   setSelectBankModal(false);
      //   setGenerateAddyModal(true);
      // }, 1500);
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });
  const checkStatus = async (data: any) => {
    const response = await axiosInstance.post(API.checkPayment, data);
    return response.data;
  };

  const comfirmStatus = useMutation({
    mutationFn: checkStatus,
    onSuccess: (r) => {
      // console.log(r);

      toast.success(r.message);
      if (r?.data?.is_received) {
        setTimeout(() => {
          setOpenPS(false);
          setOpenPSuccess(true);
        }, 1500);
      }
    },
    onError: (e) => {
      // console.log(e);
      const err = e as any;
      toast.error(errorMessage(err?.message || err?.data?.message));
    },
  });
  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return darkLogo;
    } else if (theme === "light") {
      return logo;
    } else if (theme === "system") {
      return darkQuery.matches ? logo : darkLogo;
    }
    return darkLogo; // fallback in case of an unexpected value
  };
  const [screen, setScreen] = useState<boolean>(true);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = accountExpiryDate - now;

      if (remainingTime <= 0) {
        clearInterval(interval);
        comfirmDetails.mutate({ amount }); // Refresh the endpoint on expiry
      } else {
        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [accountExpiryDate, comfirmDetails, amount]);
  const FirstLoading = () => {
    return (
      <div className="mt-4 w-full flex flex-col  justify-center items-center">
        <div className="w-[50px] h-[50px]">
          <img src={pause} className="w-full h-full bg-cover" alt="" />
        </div>
        <h4 className="dark:text-white text-gray-900 mt-2 text-[22px] font-semibold text-center">
          Hold on Please...
        </h4>
        <h4 className="dark:text-white text-gray-900 mt-2 text-[14px] text-center">
          You will soon be redirected to our payment service to complete your
          payment.
        </h4>
        <div className="w-full bg-[#E6E6E6] h-[1px] rounded-full dark:bg-[#3A3737] mt-12" />
        <h4 className="text-gray-500 mt-6 text-[12px]  text-center">
          Fund wallet with
        </h4>
        <h4
          style={{
            color: bgColor,
          }}
          className={`${
            bgColor ? `text-[${bgColor}]` : "text-text_blue"
          }  mt-1 text-[22px] font-semibold text-center`}
        >
          {formatAmount(amount)} NGN
        </h4>
        <div className="p-4 rounded-xl mt-4 flex justify-start gap-2 items-start bg-[#F4F4F4] dark:bg-[#222222] w-full">
          <div>
            <PiWarningCircleLight className="text-[18px] text-gray-500 dark:text-gray-400" />
          </div>
          <h4 className="text-gray-500 dark:text-gray-400 text-[12px]  text-left">
            Ensure to cross-check the bank account you want to transfer to
            matches the name on the account. Any discrepancies may lead to
            delays or rejection of your deposit.
          </h4>
        </div>
        <button
          style={{
            backgroundColor: bgColor,
          }}
          onClick={() => {
            const data = {
              amount: amount,
            };
            comfirmDetails.mutate(data);
            setScreen(false);
          }}
          className={`w-full h-[52px] rounded-[18px] ${
            bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
          }  mt-8 text-white flex justify-center items-center  font-semibold`}
        >
          Proceed
        </button>
      </div>
    );
  };
  const SecondLoading = () => {
    return (
      <div className="mt-4 w-full gap-4 mb-4 flex flex-col justify-center items-center">
        <ClipLoader color="#007AFF" size={40} />
        <h4 className="text-gray-900 dark:text-gray-200 text-[13px]  text-center">
          Do not close or leave this modal,
        </h4>

        <h4 className="text-gray-900 dark:text-gray-200 text-[13px]  text-center">
          Trying to connect, please wait...
        </h4>
      </div>
    );
  };
  const AccountScreen = () => {
    return (
      <div className=" w-full gap-2 px-4 mb-4 flex flex-col justify-center items-center">
        <div className="">
          <img src={getThemeBasedImage()} alt="" />
        </div>
        <h4
          style={{
            color: bgColor,
          }}
          className={`${
            bgColor ? `text-[${bgColor}]` : "text-text_blue"
          }  mt-1 text-[22px] font-semibold text-center`}
        >
          {formatAmount(amount)} NGN
        </h4>
        <h4 className="text-gray-500 mt-2 text-[12px]  text-center">
          Fund wallet with
        </h4>

        <div className="w-full p-4 mt-6 dark:bg-[#DD900D1A] bg-[#DD900D] bg-opacity-10 text-[#664101] rounded-xl dark:text-[#F7D394] text-[12px]">
          Please ensure to transfer the{" "}
          <strong className="text-[#DD900D] font-semibold">Exact Amount</strong>{" "}
          to the Account below to avoid any delays or complications with
          processing your transaction or you may lose your funds.
        </div>
        <div className="rounded-xl w-full  py-5 px-4 mt-8 bg-[#F1F1F1] dark:bg-[#2a2929]">
          <div className="w-full  flex justify-between gap-4 items-center">
            <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
              Account Number
            </h4>
            <div className="flex items-center justify-end gap-2">
              <h4 className="dark:text-white text-gray-900 text-[12px] ">
                {bankDetails?.account_number}
              </h4>
              <CopyToClipboard
                text={bankDetails?.account_number}
                onCopy={() => {
                  toast.success(`Account number copied`);
                }}
              >
                <FiCopy className="text-[16px] dark:text-white text-gray-900" />
              </CopyToClipboard>
            </div>
          </div>
          <div className="w-full mt-6 flex justify-between gap-4 items-center">
            <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
              Bank Name
            </h4>
            <div className="flex items-center gap-2">
              <h4 className="dark:text-white text-right text-gray-900 text-[12px] ">
                {bankDetails?.bank_name}
              </h4>
            </div>
          </div>
          <div className="w-full mt-6 flex justify-between gap-4 items-center">
            <h4 className="text-gray-800 dark:text-gray-400 text-[12px] ">
              Beneficiary
            </h4>
            <div className="flex items-center gap-2">
              <h4 className="dark:text-white text-right text-gray-900 text-[10px] md:text-[12px] ">
                {bankDetails?.account_name}
              </h4>
            </div>
          </div>
          <h4 className="dark:text-gray-400 text-gray-500 mt-8 text-[13px] text-center">
            This account is one time use only and expires in
          </h4>
          <h4
            style={{
              color: bgColor,
            }}
            className={`${
              bgColor ? `text-[${bgColor}]` : "text-text_blue"
            }  mt-3 text-[14px] font-medium text-center`}
          >
            {timeLeft}
          </h4>
        </div>
        <button
          onClick={() => {
            const data = {
              account_id: bankDetails?.id,
            };
            comfirmStatus.mutate(data);
          }}
          style={{
            backgroundColor: bgColor,
          }}
          className={`w-full h-[52px] rounded-[18px] ${
            bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
          }  mt-8 text-white flex justify-center items-center  font-semibold`}
        >
          {comfirmStatus?.isPending ? (
            <ClipLoader color="#FFFFFF" size={30} />
          ) : (
            "I’ve sent the money"
          )}
        </button>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              setOpenPS(false);
              setOpenPCancel(true);
            }}
            className="w-full xs:w-1/2 h-[42px] mt-4 px-2 border rounded-lg border-[#3E3838] text-[#DD524D] text-[12px] flex gap-2 items-center justify-center"
          >
            <FaTimes />
            Cancel Transaction
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="w-full xs:w-1/2 h-[38px] px-2 rounded-lg mt-2 bg-[#E9E9E9] dark:bg-[#626262] text-gray-900 dark:text-white text-[12px] flex gap-2 items-center justify-center">
            <FaLock />
            Secured by Tampay
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-start pt-12 overflow-auto pb-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              setOpenPS(false);
              setBuyModal(true);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="w-full">
          {screen ? (
            <FirstLoading />
          ) : (
            <div className="w-full">
              {comfirmDetails.isPending ? <SecondLoading /> : <AccountScreen />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
