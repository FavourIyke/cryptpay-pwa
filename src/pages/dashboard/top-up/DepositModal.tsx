import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { nigeriaFlag } from "../../../assets/images";
import { useUser } from "../../../context/user-context";
import { formatAmount } from "../../../utils/formatDate";

const DepositModal = ({
  setOpenNotice,
  setOpenPS,
  setOpenDeposit,
  amount,
  setAmount,
}: any) => {
  const { userDetails } = useUser();
  const [displayAmount, setDisplayAmount] = useState<string>("");
  const isNumber = (str: string) => /^\d*\.?\d*$/.test(str); // Allows numbers and decimals

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas for parsing
    if (isNumber(value)) {
      setAmount(value); // Store raw amount
      setDisplayAmount(value); // Temporarily show raw input while typing
    }
  };

  // Debounce formatting to run when the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (amount) {
        const formattedValue = Number(amount).toLocaleString("en-US");
        setDisplayAmount(formattedValue); // Set formatted value after debounce
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(handler); // Cleanup on re-render
  }, [amount]);

  const fiatBalance = userDetails?.data?.profile?.fiat_balance;

  return (
    <div className="fixed inset-0 z-50 flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setOpenDeposit(false);
              setOpenNotice(true);
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
              setOpenDeposit(false);
            }}
            className="w-[40px] h-[40px] rounded-full bg-[#007AFF] bg-opacity-10 dark:bg-opacity-100 dark:bg-[#3D3D3D] flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[14px]" />
          </button>
        </div>
        <div className="w-full mt-6">
          <h4 className="text-gray-800 dark:text-gray-100 mt-4 font-semibold text-[20px]">
            Amount to Deposit
          </h4>
          <h4 className="text-gray-800 dark:text-gray-100 mt-2  text-[14px]">
            Enter how much you want to deposit into your Naira Wallet.
          </h4>
          <div className="w-full p-4  border border-gray-200 mt-10 dark:border-[#2F2F2F] rounded-xl">
            <div className="w-full flex justify-between gap-4 items-center">
              <div className="flex justify-start gap-1 text-gray-800 dark:text-gray-200 text-[14px]">
                <h4>₦</h4>
                <input
                  type="text"
                  placeholder="Amount"
                  value={displayAmount}
                  autoFocus
                  onChange={handleChange}
                  className="text-gray-800 dark:text-gray-200 text-[13px] text-left bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[18px] h-[18px] rounded-full">
                  <img
                    src={nigeriaFlag}
                    className="h-full w-full rounded-full object-contain"
                    alt=""
                  />
                </div>
                <h4 className="text-gray-900 dark:text-gray-200 text-[14px] tracking-wider ">
                  NGN
                </h4>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 mt-4">
              <h4 className="text-gray-600  text-[14px] ">Balance:</h4>
              <h4 className="text-gray-900 dark:text-gray-400 text-[14px] tracking-wider ">
                {formatAmount(fiatBalance)} NGN
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setOpenDeposit(false);
              setOpenPS(true);
            }}
            className={`w-full h-[52px] rounded-[18px] bg-text_blue mt-12 text-white flex justify-center items-center  font-semibold`}
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
