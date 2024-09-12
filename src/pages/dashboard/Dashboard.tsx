import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { paddingX } from "../../constants";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import RateBoard from "./RateBoard";
import TransactionCard from "./transactionList/TransactionCard";
import { Link } from "react-router-dom";
import SelectCoin from "./sellFlow/SelectCoin";
import SelectNetwork from "./sellFlow/SelectNetwork";
import SelectBank from "./sellFlow/SelectBank";
import SellAsset from "./sellFlow/SellAsset";
import FinalModal from "./sellFlow/FinalModal";
import BuyCoin from "./buyFlow/BuyCoin";
import BuyReceipt from "./buyFlow/BuyReceipt";
import AddBankModal from "./addBank/AddBankModal";
import BankAddedModal from "./addBank/BankAddedModal";
import { useUser } from "../../context/user-context";
import { SlArrowRight } from "react-icons/sl";
import { TiWarning } from "react-icons/ti";
import GenerateWallet from "./sellFlow/GenerateWallet";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import useAuthAxios from "../../utils/baseAxios";
import KycModal from "./KycModal";
import { cryptpay, darkCrypt } from "../../assets/images";
import { formatAmount, getFormattedDate } from "../../utils/formatDate";
import DetailsModal from "./transactionList/DetailsModal";

const Dashboard = () => {
  const { theme } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

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
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [clickedPayout, setClickedPayout] = useState<any[]>([]);

  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [sellRateFlow, setSellRateFlow] = useState<boolean>(false);
  const [sellRate, setSellRate] = useState<boolean>(false);
  const [selectCoinModal, setSelectCoinModal] = useState<boolean>(false);
  const [selectNetworkModal, setSelectNetworkModal] = useState<boolean>(false);
  const [selectBankModal, setSelectBankModal] = useState<boolean>(false);
  const [sellAssetModal, setSellAssetModal] = useState<boolean>(false);
  const [buyCoinModal, setBuyCoinModal] = useState<boolean>(false);
  const [buyReceiptModal, setBuyReceiptModal] = useState<boolean>(false);
  const [finalModal, setFinalModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState("");
  const [addBankModal, setAddBankModal] = useState<boolean>(false);
  const [bankAddedModal, setBankAddedModal] = useState<boolean>(false);
  const [generateAddyModal, setGenerateAddyModal] = useState<boolean>(false);
  const [walletAddy, setWalletAddy] = useState<string>("");
  const { userDetails } = useUser();
  const axiosInstance = useAuthAxios();
  const [networks, setNetworks] = useState<any[]>([]);
  const [kycModal, setKycModal] = useState<boolean>(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState<any[]>([]);

  const getPayoutsSummary = async () => {
    const response = await axiosInstance.get(API.getSummary);
    return response.data.data;
  };
  const { data: payoutSummary, error: error4 } = useQuery({
    queryKey: ["get-payout-summary"],
    queryFn: getPayoutsSummary,
    retry: 1,
  });
  const getPayouts = async () => {
    const response = await axiosInstance.get(API.getTransactions);
    return response.data.data;
  };
  const { data: payouts, error: error3 } = useQuery({
    queryKey: ["get-payouts"],
    queryFn: getPayouts,
    retry: 1,
  });
  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const { data: kycStatus, error: error2 } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });
  // console.log(payouts);

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);
  useEffect(() => {
    if (error3) {
      const newError = error3 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
    if (error4) {
      const newError = error4 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error3, error4]);
  // console.log(payouts);

  const sortedPayouts = payouts?.sort((a: any, b: any) => {
    return (
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
    );
  });

  return (
    <div
      className={` w-full font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
    >
      <Navbar />
      <div className={`${paddingX}  w-full mt-12 lgss:flex lgss:gap-12 `}>
        <div className="w-full lgss:w-3/5">
          <div className="w-full  h-[401px] flex justify-center items-center">
            <div className="w-full bg-dashboardBg bg-cover bg-center py-6 rounded-[40px] h-full flex flex-col gap-[70px] mds:gap-24 justify-end items-center">
              <h4 className="mds:hidden text-[14px]  capitalize text-gray-100  font-medium ">
                Hello, {userDetails?.data?.profile.username}
              </h4>
              <div>
                <h4 className="uppercase text-center text-white tracking-wider text-[10px] font-semibold ">
                  total payout
                </h4>
                <div className="flex  justify-center mt-3 items-center gap-4">
                  <h4 className="text-[40px] text-white">
                    {showBalance
                      ? `$${
                          payoutSummary?.total_asset_in_usd
                            ? formatAmount(payoutSummary?.total_asset_in_usd)
                            : "0.00"
                        }`
                      : "*****"}

                    {/* <span className="text-[#646464]">
                      {showBalance ? `08` : "**"}
                    </span> */}
                  </h4>
                  {showBalance ? (
                    <VscEyeClosed
                      onClick={() => setShowBalance((prev) => !prev)}
                      className="text-white cursor-pointer text-[16px]"
                    />
                  ) : (
                    <VscEye
                      onClick={() => setShowBalance((prev) => !prev)}
                      className="text-white cursor-pointer text-[16px]"
                    />
                  )}
                </div>
                {showBalance ? (
                  <h4 className="mt-1 text-center text-white  text-[12px]  ">
                    ~ NGN{" "}
                    {payoutSummary?.total_payouts_ngn
                      ? formatAmount(payoutSummary?.total_payouts_ngn)
                      : "0.00"}
                  </h4>
                ) : (
                  <h4 className="mt-1 text-center text-white  text-[12px]  ">
                    ~ *****
                  </h4>
                )}
              </div>
              <div className="flex gap-6 xxs:gap-10 mds:gap-16 justify-center items-center">
                <div>
                  <button
                    onClick={() => {
                      setSellRate(true);
                      setSelectCoinModal(true);
                    }}
                    className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
                  >
                    <BsArrowUp className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    Sell
                  </h4>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSellRate(false);
                      setSelectCoinModal(true);
                    }}
                    className="w-[45px] h-[45px] rounded-full bg-text_blue flex justify-center items-center"
                  >
                    <BsArrowDown className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    Buy
                  </h4>
                </div>
                <div>
                  <button className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center">
                    <IoIosMore className="text-[24px] text-white" />
                  </button>
                  <h4 className="text-white mt-1 text-[14px] text-center">
                    More
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {kycStatus?.data.kyc_level === "0" ||
          kycStatus?.data.kyc_status === null ? (
            <Link
              to="/kyc"
              className="w-full flex justify-between items-center gap-4 px-4 py-3 mt-6 bg-[#664101] rounded-2xl text-[#F5B546] "
            >
              <div className="flex  w-9/12 items-start gap-3">
                <div>
                  <TiWarning className="text-[28px]" />
                </div>

                <div>
                  <h4 className=" font-bold text-[16px]">
                    {kycStatus?.message ? kycStatus?.message : "KYC Incomplete"}
                  </h4>
                  <h4 className="  text-[11px] mt-1 text-left">
                    It appears that you have not yet completed your Know Your
                    Customer (KYC) verification process.
                  </h4>
                </div>
              </div>
              <SlArrowRight className="text-white text-[16px]" />
            </Link>
          ) : null}
          <div className="flex w-[70%] xs:w-3/5 mds:w-1/2 mt-8 px-2 bg-[#F1F1F1] dark:bg-[#1C1C1C] h-[56px] rounded-2xl items-center">
            <button
              onClick={() => setSellRateFlow(false)}
              className={
                sellRateFlow
                  ? "h-[40px] w-[48%] rounded-full  font-semibold text-[14px] text-[#797979] dark:text-[#A0A0A0] flex justify-center items-center"
                  : "h-[40px] w-[48%] rounded-full text-white font-semibold text-[14px] bg-text_blue flex justify-center items-center"
              }
            >
              Buy Rate
            </button>
            <button
              onClick={() => setSellRateFlow(true)}
              className={
                !sellRateFlow
                  ? "h-[40px] w-[48%] rounded-full  font-semibold text-[14px] text-[#A0A0A0] flex justify-center items-center"
                  : "h-[40px] w-[48%] rounded-full text-white font-semibold text-[14px] bg-text_blue flex justify-center items-center"
              }
            >
              Sell Rate
            </button>
          </div>
          <h4 className="dark:text-gray-300 mt-10 text-black text-[16px] font-medium">
            These are the rates you will be buying a specific asset at{" "}
          </h4>
          <RateBoard
            setSelectNetworkModal={setSelectNetworkModal}
            sellRateFlow={sellRateFlow}
            setSellRate={setSellRate}
            setCoin={setCoin}
            networks={networks}
            setNetworks={setNetworks}
          />
        </div>
        <div className="w-full lgss:w-2/5 mt-12 lgss:mt-6">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-black dark:text-white  text-[15px] ">
              Recent Transactions
            </h4>
            <Link to="/transactions" className="text-[15px] text-text_blue">
              View all
            </Link>
          </div>
          <div className="h-[600px] lgss:h-[800px] overflow-auto mt-4 flex-col flex gap-6 py-4">
            {sortedPayouts?.length >= 1 ? (
              sortedPayouts.slice(0, 4).map((payout: any, index: number) => (
                <div key={index} className="w-full">
                  <h4 className="text-gray-500 text-left mb-4 text-[12px]">
                    {getFormattedDate(payout.transaction_date)}
                  </h4>
                  <div
                    onClick={() => {
                      setClickedPayout(payout);
                      setShowDetails(true);
                    }}
                    className="cursor-pointer w-full"
                  >
                    <TransactionCard payouts={payout} />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col h-full px-12   justify-start mt-12 items-center">
                <img src={getThemeBasedImage()} alt="" />
                <h4 className="text-[14px] mt-10 text-center text-gray-800 dark:text-gray-500">
                  There are no transaction available yet
                </h4>
              </div>
            )}
          </div>
        </div>
        {selectCoinModal && (
          <SelectCoin
            setSelectCoinModal={setSelectCoinModal}
            setCoin={setCoin}
            setSelectNetworkModal={setSelectNetworkModal}
            setNetworks={setNetworks}
          />
        )}
      </div>
      {selectNetworkModal && (
        <SelectNetwork
          setSelectNetworkModal={setSelectNetworkModal}
          setSelectCoinModal={setSelectCoinModal}
          setSelectBankModal={setSelectBankModal}
          coin={coin}
          network={network}
          setNetwork={setNetwork}
          networks={networks}
          sellRate={sellRate}
          setBuyCoinModal={setBuyCoinModal}
        />
      )}
      {selectBankModal && (
        <SelectBank
          setSelectBankModal={setSelectBankModal}
          setSelectNetworkModal={setSelectNetworkModal}
          setGenerateAddyModal={setGenerateAddyModal}
          setAddBankModal={setAddBankModal}
          setSelectedBankDetails={setSelectedBankDetails}
          selectedBankDetails={selectedBankDetails}
        />
      )}
      {generateAddyModal && (
        <GenerateWallet
          setGenerateAddyModal={setGenerateAddyModal}
          setSellAssetModal={setSellAssetModal}
          setSelectBankModal={setSelectBankModal}
          coin={coin}
          network={network}
          setNetwork={setNetwork}
          walletAddy={walletAddy}
          setWalletAddy={setWalletAddy}
          selectedBankDetails={selectedBankDetails}
        />
      )}
      {sellAssetModal && (
        <SellAsset
          setSellAssetModal={setSellAssetModal}
          setGenerateAddyModal={setGenerateAddyModal}
          setFinalModal={setFinalModal}
          coin={coin}
          network={network}
          setNetwork={setNetwork}
          walletAddy={walletAddy}
          setWalletAddy={setWalletAddy}
          selectedBankDetails={selectedBankDetails}
        />
      )}
      {finalModal && (
        <FinalModal
          setFinalModal={setFinalModal}
          setSellAssetModal={setSellAssetModal}
          sellRate={sellRate}
          setBuyReceiptModal={setBuyReceiptModal}
          setWalletAddy={setWalletAddy}
        />
      )}
      {buyCoinModal && (
        <BuyCoin
          setBuyCoinModal={setBuyCoinModal}
          setBuyReceiptModal={setBuyReceiptModal}
          coin={coin}
          network={network}
          setSelectNetworkModal={setSelectNetworkModal}
          coinAmount={coinAmount}
          setCoinAmount={setCoinAmount}
        />
      )}
      {buyReceiptModal && (
        <BuyReceipt
          setBuyCoinModal={setBuyCoinModal}
          setBuyReceiptModal={setBuyReceiptModal}
          coin={coin}
          network={network}
          coinAmount={coinAmount}
          setFinalModal={setFinalModal}
        />
      )}
      {addBankModal && (
        <AddBankModal
          setBankAddedModal={setBankAddedModal}
          setAddBankModal={setAddBankModal}
          setSelectBankModal={setSelectBankModal}
        />
      )}
      {bankAddedModal && (
        <BankAddedModal
          setSelectBankModal={setSelectBankModal}
          setBankAddedModal={setBankAddedModal}
          setAddBankModal={setAddBankModal}
        />
      )}
      {kycModal && <KycModal setKycModal={setKycModal} />}
      {showDetails && (
        <DetailsModal
          setShowDetails={setShowDetails}
          clickedPayout={clickedPayout}
        />
      )}
    </div>
  );
};

export default Dashboard;
