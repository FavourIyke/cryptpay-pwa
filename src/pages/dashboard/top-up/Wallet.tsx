import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsArrowDown } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import NoticeModal from "./NoticeModal";
import DepositModal from "./DepositModal";
import PaymentScreen from "./PaymentScreen";
import PaymentSuccess from "./PaymentSuccess";
import { useUser } from "../../../context/user-context";
import { formatAmount } from "../../../utils/formatDate";
import PaymentCancelled from "./PaymentCancelled";
import WalletTransactins from "./WalletTransactins";

const Wallet = ({ setOpenWallet, setBuyCoinModal }: any) => {
  const { userDetails, refetch1 } = useUser();
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const [openPS, setOpenPS] = useState<boolean>(false);
  const [openPSuccess, setOpenPSuccess] = useState<boolean>(false);
  const [openPCancel, setOpenPCancel] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<any>({});

  const fiatBalance = userDetails?.data?.profile?.fiat_balance;
  const handleRefetch = () => {
    // Trigger the refetch function for user details
    refetch1();
  };

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-center lgss:items-start lgss:pt-10 bg-white dark:bg-primary_dark overflow-auto pb-12 lgss:pb-4  backdrop-blur-sm">
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => {
              setOpenWallet(false);
            }}
            className="flex items-center gap-2 "
          >
            <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
            <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
              Back
            </h4>
          </button>
        </div>
        <div className="w-full mt-6 bg-[#F4F4F4] dark:bg-[#1C1C1C] rounded-xl p-4 flex justify-between items-center">
          <div className="">
            <div className="justify-start items-center flex gap-2">
              <h4 className="text-[10px] uppercase text-gray-900 dark:text-gray-50 tracking-wider">
                Available balance
              </h4>
              {!viewBalance ? (
                <AiOutlineEyeInvisible
                  onClick={() => setViewBalance((prev) => !prev)}
                  className="text-[15px]  text-gray-900 dark:text-gray-50"
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setViewBalance((prev) => !prev)}
                  className="text-[15px]  text-gray-900 dark:text-gray-50"
                />
              )}
            </div>
            <div className="flex justify-start mt-2 gap-2 items-center">
              <h4 className="font-semibold text-[20px] text-gray-900 dark:text-gray-100">
                {formatAmount(fiatBalance)}
              </h4>
              <h4 className=" text-[10px] text-gray-900 dark:text-gray-100">
                NGN
              </h4>
            </div>
          </div>

          <div
            onClick={handleRefetch}
            className="flex justify-center items-center cursor-pointer rounded-full h-[32px] w-[32px] bg-[#83BF4F] font-bold text-white text-[16px]"
          >
            ₦
          </div>
        </div>
        <div className="w-full mt-6  gap-4 flex justify-center items-center">
          <div className="w-1/2 flex p-4 border border-gray-200 dark:border-[#2F2F2F] rounded-xl flex-col items-center justify-center gap-2">
            <button
              onClick={() => {
                setOpenWallet(false);
                setBuyCoinModal(true);
              }}
              className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
            >
              <MdAdd className="text-[24px] text-white" />
            </button>
            <h4 className="text-white mt-1 text-[14px] text-center">
              Buy Crypto
            </h4>
          </div>
          <div className="w-1/2 flex p-4 border border-gray-200 dark:border-[#2F2F2F] rounded-xl flex-col justify-center gap-2 items-center">
            <button
              onClick={() => setOpenNotice(true)}
              className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
            >
              <BsArrowDown className="text-[24px] text-white" />
            </button>
            <h4 className="text-white mt-1 text-[14px] text-center">Deposit</h4>
          </div>
        </div>
        <WalletTransactins />
      </div>
      {openNotice && (
        <NoticeModal
          setOpenNotice={setOpenNotice}
          setOpenWallet={setOpenWallet}
          setOpenDeposit={setOpenDeposit}
        />
      )}
      {openDeposit && (
        <DepositModal
          setOpenNotice={setOpenNotice}
          setOpenDeposit={setOpenDeposit}
          setOpenPS={setOpenPS}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      {openPS && (
        <PaymentScreen
          setOpenPS={setOpenPS}
          setOpenDeposit={setOpenDeposit}
          amount={amount}
          bankDetails={bankDetails}
          setBankDetails={setBankDetails}
          setOpenPSuccess={setOpenPSuccess}
          setOpenPCancel={setOpenPCancel}
        />
      )}
      {openPSuccess && (
        <PaymentSuccess
          amount={amount}
          bankDetails={bankDetails}
          setOpenPSuccess={setOpenPSuccess}
          setBuyCoinModal={setBuyCoinModal}
          setOpenWallet={setOpenWallet}
        />
      )}
      {openPCancel && (
        <PaymentCancelled
          setOpenWallet={setOpenWallet}
          setOpenDeposit={setOpenDeposit}
          setOpenPCancel={setOpenPCancel}
        />
      )}
    </div>
  );
};

export default Wallet;
