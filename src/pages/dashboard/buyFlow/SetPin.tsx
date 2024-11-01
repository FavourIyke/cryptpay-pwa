import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { SlArrowLeft } from "react-icons/sl";
import ClipLoader from "react-spinners/ClipLoader";
import OtpInputField from "../../../components/utils/OtpInput";
import { API } from "../../../constants/api";
import useAuthAxios from "../../../utils/baseAxios";
import { errorMessage } from "../../../utils/errorMessage";

const SetPin = ({ setBuyCoinAddy, setBuyCoinPin, setBuyReceiptModal }: any) => {
  const [pin, setPin] = useState<string>("");
  const axiosInstance = useAuthAxios();
  const [pinC, setPinC] = useState<string>("");
  const handleCPinChange = (pinc: React.SetStateAction<string>) => {
    setPinC(pinc);
  };
  const [screen, setScreen] = useState<number>(1);

  const handleChange = (otp: React.SetStateAction<string>) => {
    setPin(otp);
  };
  const handleSetTxnPin = async ({ transaction_pin }: any) => {
    const response = await axiosInstance.post(API.setTransactionPin, {
      transaction_pin,
    });
    return response.data;
  };
  const completeSetPin = useMutation({
    mutationFn: handleSetTxnPin,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        setScreen(1);
        setBuyCoinPin(false);
        setBuyReceiptModal(true);
        setPin("");
        setPinC("");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const verifyPin = (pin1: string, pin2: string) => {
    if (pin1 !== pin2) {
      toast.error("Pin does not match");
      return false;
    }
    return true;
  };
  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12 lgss:pb-4  backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setBuyCoinPin(false);
              setBuyCoinAddy(true);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
        </div>
        <div className="w-full mt-10 font-sora">
          <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
            {screen === 1
              ? "Set your transaction pin"
              : screen === 2
              ? "Confirm your transaction pin"
              : ""}
          </h4>
          {screen === 1 ? (
            <div className="mt-10 w-full">
              <div className="px-8">
                <OtpInputField
                  otp={pin}
                  input={4}
                  setOtp={setPin}
                  handleChange={handleChange}
                />
              </div>
              <button
                onClick={() => {
                  setScreen(2);
                }}
                disabled={pin.length !== 4}
                className={`w-full h-[52px] rounded-[18px] mt-[400px] ${
                  pin.length !== 4
                    ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : "bg-text_blue text-white"
                }  flex justify-center items-center  font-semibold`}
              >
                Proceed
              </button>
            </div>
          ) : (
            <div className="mt-10 w-full">
              <div className="px-8">
                <OtpInputField
                  otp={pinC}
                  input={4}
                  setOtp={setPinC}
                  handleChange={handleCPinChange}
                />
              </div>
              <button
                onClick={() => {
                  if (!verifyPin(pin, pinC)) {
                    return;
                  }
                  completeSetPin.mutate({
                    transaction_pin: pin,
                  });
                }}
                disabled={pinC.length !== 4 || completeSetPin.isPending}
                className={`w-full h-[52px] rounded-[18px] mt-[400px] ${
                  pinC.length !== 4
                    ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                    : "bg-text_blue text-white"
                }  flex justify-center items-center  font-semibold`}
              >
                {completeSetPin.isPending ? (
                  <ClipLoader color="#FFFFFF" size={30} />
                ) : (
                  "Create PIN"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPin;
