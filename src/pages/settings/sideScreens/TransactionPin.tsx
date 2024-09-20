import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { SlArrowLeft } from "react-icons/sl";
import { API } from "../../../constants/api";
import { errorMessage } from "../../../utils/errorMessage";
import useAuthAxios from "../../../utils/baseAxios";
import OtpInputField from "../../../components/utils/OtpInput";
import ClipLoader from "react-spinners/ClipLoader";

const TransactionPin = ({ setSecScreen }: any) => {
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
        setSecScreen(1);
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
    <div className="w-full font-sora">
      <button
        onClick={() => {
          if (screen === 1) {
            setSecScreen(1);
          } else {
            setScreen(1);
          }
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Enter your transaction pin
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
  );
};

export default TransactionPin;
