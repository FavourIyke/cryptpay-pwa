import React, { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";
import { cryptpay, darkCrypt } from "../../assets/images";
import { formatAmount } from "../../utils/formatDate";
import useAuthAxios from "../../utils/baseAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import { SlArrowLeft } from "react-icons/sl";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import Transaction from "./Transaction";
import RecipientAddy from "../dashboard/withdraw/RecipientAddy";
import Withdraw from "../dashboard/withdraw/Withdraw";
import WithdrawalNetwork from "../dashboard/withdraw/WithdrawalNetwork";
import WithdrawRequest from "../dashboard/withdraw/WithdrawRequest";
import WithdrwaPeending from "../dashboard/withdraw/WithdrwaPeending";
import DepositScreen from "../dashboard/top-up/depositCrypto/DepositScreen";
import DepositNetwork from "../dashboard/top-up/depositCrypto/DepositNetwork";
import SelectBank from "../dashboard/sellFlow/SelectBank";
import SellFromCeller from "../dashboard/sellFlow/sellFromCeler/SellFromCeller";
import SellPending from "../dashboard/sellFlow/sellFromCeler/SellPending";
import SellPreview from "../dashboard/sellFlow/sellFromCeler/SellPreview";
import BuyFromCeller from "../dashboard/buyFlow/buyFromCeller/BuyFromCeller";
import BuyReceipt from "../dashboard/buyFlow/BuyReceipt";
import SetPin from "../dashboard/buyFlow/SetPin";
import FinalModal from "../dashboard/sellFlow/FinalModal";
import AddBankModal from "../dashboard/addBank/AddBankModal";
import BankAddedModal from "../dashboard/addBank/BankAddedModal";

const SidePage = ({ setSidePage, screen, setScreen, coinDetails }: any) => {
  const { theme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const axiosInstance = useAuthAxios();
  const [from, setFrom] = useState<string>("");
  //withdrawal
  const [recipientAddy, setRecipientAddy] = useState<string>("");
  const [recipientAddyModal, setRecipientAddyModal] = useState<boolean>(false);
  const [withdraw, setWithdraw] = useState<boolean>(false);
  const [withdrawPending, setWithdrawPending] = useState<boolean>(false);
  const [withdrawRequest, setWithdrawRequest] = useState<boolean>(false);
  const [withrawAmount, setWithrawAmount] = useState<string>("");
  const [networkW, setNetworkW] = useState<string>("");
  const [withdrawalNetwork, setWithdrawalNetwork] = useState<boolean>(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState<any[]>([]);

  //Deposit
  const [openDepositNetwork, setOpenDepositNetwork] = useState<boolean>(false);
  const [depositScren, setdepositScren] = useState<boolean>(false);
  const [depositNetwork, setDepositNetwork] = useState<string>("");

  //Sell
  const [amountEx, setAmountEx] = useState<string>("");
  const [selectBankModal, setSelectBankModal] = useState<boolean>(false);
  const [addBankModal, setAddBankModal] = useState<boolean>(false);
  const [sellFromExModal, setSellFromExModal] = useState<boolean>(false);
  const [sellPendingModal, setSellPendingModal] = useState<boolean>(false);
  const [sellPreviewModal, setSellPreviewModal] = useState<boolean>(false);
  const [sellType, setSellType] = useState<string>("");
  const [bankAddedModal, setBankAddedModal] = useState<boolean>(false);

  //Buy
  const [buyExModal, setBuyExModal] = useState<boolean>(false);
  const [buyReceiptModal, setBuyReceiptModal] = useState<boolean>(false);
  const [buyCoinPin, setBuyCoinPin] = useState<boolean>(false);
  const [nairaAmount, setNairaAmount] = useState("");
  const [walletAddyBuy, setWalletAddyBuy] = useState<string>("");
  const [buySummary, setBuySummary] = useState<any[]>([]);
  const [buyType, setBuyType] = useState<string>("");
  const [finalModal, setFinalModal] = useState<boolean>(false);

  const [coinAmount, setCoinAmount] = useState("");

  const getThemeBasedImage = () => {
    if (theme === "dark") {
      return cryptpay;
    } else if (theme === "light") {
      return darkCrypt;
    } else if (theme === "system") {
      return darkQuery.matches ? cryptpay : darkCrypt;
    }
    return darkCrypt; // fallback in case of an unexpected value
  };

  const getCoinPrices = async () => {
    const response = await axiosInstance.get(API.getCoinPrices);
    return response.data.data;
  };
  const { data: prices, error: error3 } = useQuery({
    queryKey: ["get-coin-prices"],
    queryFn: getCoinPrices,
    retry: 1,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3]);
  const coinRate = prices?.cryptocurrencies[coinDetails?.crypto_symbol];
  const calculatedGet = coinRate * Number(coinDetails?.balance);
  return (
    <div className="w-full font-sora ">
      {screen === 0 ? (
        <div className="w-full flex flex-col h-full px-6 py-44   justify-center items-center">
          <img src={getThemeBasedImage()} alt="" />
          <h4 className="text-[14px] mt-10 text-center text-gray-800 dark:text-gray-500">
            Click on one of assets to view more details on the asset.
          </h4>
        </div>
      ) : screen === 1 ? (
        <div className="flex flex-col justify-between gap-8 h-full items-start">
          <div className="w-full flex-col justify-center  items-center">
            <button
              onClick={() => {
                setSidePage(false);
                setScreen(0);
              }}
              className=" flex items-center gap-2 "
            >
              <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
              <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
                Back
              </h4>
            </button>
            <div className="w-[56px] h-[56px] mt-6 rounded-full mx-auto bg-white flex justify-center items-center">
              <img
                src={coinDetails?.crypto_logo}
                className="rounded-full w-full h-full object-cover"
                alt=""
              />
            </div>

            <h4 className="text-black text-center mt-3 dark:text-white font-semibold  text-[20px]">
              {formatAmount(coinDetails?.balance)} {coinDetails?.crypto_symbol}
            </h4>
            <div className="flex w-full gap-4 mt-6 justify-between items-center">
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setBuyExModal(true);
                    setFrom("SidePage");
                    setBuyType("Celler");
                  }}
                  className="w-[45px] h-[45px] rounded-full bg-[#F1F1F1] dark:bg-[#3D3D3D] mb-1 flex justify-center items-center"
                >
                  <MdAdd className="text-[24px] text-gray-900 dark:text-white" />
                </button>
                <h4 className="text-gray-900 dark:text-white mt-1 text-[14px] text-center">
                  Buy
                </h4>
              </div>
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setSelectBankModal(true);
                    setFrom("SidePage");
                    setSellType("Celler");
                  }}
                  className="w-[45px] h-[45px] rounded-full bg-[#F1F1F1] dark:bg-[#3D3D3D] mb-1 flex justify-center items-center"
                >
                  <MdOutlineRemove className="text-[24px] text-gray-900 dark:text-white" />
                </button>
                <h4 className="text-gray-900 dark:text-white mt-1 text-[14px] text-center">
                  Sell
                </h4>
              </div>
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setOpenDepositNetwork(true);
                    setFrom("SidePage");
                  }}
                  className="w-[45px] h-[45px] rounded-full bg-[#F1F1F1] dark:bg-[#3D3D3D] mb-1 flex justify-center items-center"
                >
                  <BsArrowDown className="text-[24px] text-gray-900 dark:text-white" />
                </button>
                <h4 className="text-gray-900 dark:text-white mt-1 text-[14px] text-center">
                  Deposit
                </h4>
              </div>

              <div className="cursor-pointer flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setWithdrawalNetwork(true);
                    setFrom("SidePage");
                  }}
                  className="w-[45px] h-[45px] rounded-full bg-[#F1F1F1] dark:bg-[#3D3D3D] mb-1 flex justify-center items-center"
                >
                  <BsArrowUp className="text-[24px] text-gray-900 dark:text-white" />
                </button>
                <h4 className="text-gray-900 dark:text-white mt-1 text-[14px] text-center">
                  Withdraw
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <Transaction />
          </div>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700 w-full">
            <h4 className="text-[#667185]  text-[12px]">
              Current {coinDetails?.crypto_symbol} Price
            </h4>
            <h4 className="text-black dark:text-white text-[20px] tracking-wider mt-1">
              $ {formatAmount(coinRate)}
            </h4>
          </div>
        </div>
      ) : null}
      {recipientAddyModal && (
        <RecipientAddy
          setRecipientAddyModal={setRecipientAddyModal}
          setRecipientAddy={setRecipientAddy}
          setWithdraw={setWithdraw}
          withdrawcoindeets={coinDetails}
          recipientAddy={recipientAddy}
          networkW={networkW}
          from={from}
          setFrom={setFrom}
        />
      )}
      {withdraw && (
        <Withdraw
          setWithdraw={setWithdraw}
          setRecipientAddyModal={setRecipientAddyModal}
          setWithdrawRequest={setWithdrawRequest}
          withdrawcoindeets={coinDetails}
          withdrawAmount={withrawAmount}
          setWithrawAmount={setWithrawAmount}
          from={from}
          setFrom={setFrom}
        />
      )}
      {withdrawRequest && (
        <WithdrawRequest
          setWithdrawRequest={setWithdrawRequest}
          setWithdraw={setWithdraw}
          setWithdrawPending={setWithdrawPending}
          recipientAddy={recipientAddy}
          withdrawcoindeets={coinDetails}
          withdrawAmount={withrawAmount}
          networkW={networkW}
          from={from}
          setFrom={setFrom}
        />
      )}
      {withdrawalNetwork && (
        <WithdrawalNetwork
          setWithdrawalNetwork={setWithdrawalNetwork}
          setRecipientAddyModal={setRecipientAddyModal}
          withdrawcoindeets={coinDetails}
          setNetworkW={setNetworkW}
          from={from}
          setFrom={setFrom}
        />
      )}
      {withdrawPending && (
        <WithdrwaPeending
          from={from}
          setFrom={setFrom}
          setWithdrawPending={setWithdrawPending}
        />
      )}

      {openDepositNetwork && (
        <DepositNetwork
          setOpenDepositNetwork={setOpenDepositNetwork}
          setdepositScren={setdepositScren}
          coinDepDeets={coinDetails}
          setDepositNetwork={setDepositNetwork}
          from={from}
          setFrom={setFrom}
        />
      )}
      {depositScren && (
        <DepositScreen
          setdepositScren={setdepositScren}
          coinDepDeets={coinDetails}
          depositNetwork={depositNetwork}
          setOpenDepositNetwork={setOpenDepositNetwork}
          from={from}
          setFrom={setFrom}
        />
      )}

      {selectBankModal && (
        <SelectBank
          setSelectBankModal={setSelectBankModal}
          setAddBankModal={setAddBankModal}
          setSellFromExModal={setSellFromExModal}
          sellType={sellType}
          setSellType={setSellType}
          from={from}
          setFrom={setFrom}
          setSelectedBankDetails={setSelectedBankDetails}
          selectedBankDetails={selectedBankDetails}
        />
      )}
      {sellFromExModal && (
        <SellFromCeller
          setSellFromExModal={setSellFromExModal}
          setSelectBankModal={setSelectBankModal}
          coin={coinDetails?.crypto_symbol}
          setAmountEx={setAmountEx}
          amountEx={amountEx}
          coinDeets={coinDetails}
          setSellPreviewModal={setSellPreviewModal}
          from={from}
          setFrom={setFrom}
        />
      )}
      {sellPreviewModal && (
        <SellPreview
          setSellFromExModal={setSellFromExModal}
          setSellPreviewModal={setSellPreviewModal}
          amountEx={amountEx}
          coinDeets={coinDetails}
          setSellPendingModal={setSellPendingModal}
          from={from}
          setFrom={setFrom}
        />
      )}
      {sellPendingModal && (
        <SellPending
          setSellPendingModal={setSellPendingModal}
          from={from}
          setFrom={setFrom}
        />
      )}

      {buyExModal && (
        <BuyFromCeller
          coin={coinDetails?.crypto_symbol}
          coinAmount={coinAmount}
          setCoinAmount={setCoinAmount}
          nairaAmount={nairaAmount}
          setNairaAmount={setNairaAmount}
          setBuyExModal={setBuyExModal}
          setBuyReceiptModal={setBuyReceiptModal}
          setBuySummary={setBuySummary}
          setBuyCoinPin={setBuyCoinPin}
          from={from}
          setFrom={setFrom}
          buyType={buyType}
        />
      )}
      {buyReceiptModal && (
        <BuyReceipt
          setBuyReceiptModal={setBuyReceiptModal}
          coin={coinDetails?.crypto_symbol}
          walletAddy={walletAddyBuy}
          setFinalModal={setFinalModal}
          setWalletAddy={setWalletAddyBuy}
          setNairaAmount={setNairaAmount}
          setBuySummary={setBuySummary}
          buySummary={buySummary}
          buyType={buyType}
          setCoinAmount={setCoinAmount}
          from={from}
          setFrom={setFrom}
          setBuyExModal={setBuyExModal}
          setScreen={setScreen}
          setSidePage={setSidePage}
        />
      )}
      {addBankModal && (
        <AddBankModal
          setBankAddedModal={setBankAddedModal}
          setAddBankModal={setAddBankModal}
          setSelectBankModal={setSelectBankModal}
          from={from}
          setFrom={setFrom}
        />
      )}
      {bankAddedModal && (
        <BankAddedModal
          setSelectBankModal={setSelectBankModal}
          setBankAddedModal={setBankAddedModal}
          setAddBankModal={setAddBankModal}
        />
      )}
      {buyCoinPin && (
        <SetPin
          setBuyCoinPin={setBuyCoinPin}
          setBuyReceiptModal={setBuyReceiptModal}
        />
      )}
      {finalModal && (
        <FinalModal setFinalModal={setFinalModal} buyType={buyType} />
      )}
    </div>
  );
};

export default SidePage;
