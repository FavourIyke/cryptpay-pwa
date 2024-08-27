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
import { toast } from "react-toastify";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import useAuthAxios from "../../utils/baseAxios";

const Dashboard = () => {
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

  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const { data: kycStatus, error: error2 } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });

  useEffect(() => {
    if (error2) {
      const newError = error2 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error2]);

  return (
    <div
      className={` w-full font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
    >
      <Navbar />
      <div className={`${paddingX}  w-full mt-12 lgss:flex lgss:gap-12 `}>
        <div className="w-full lgss:w-3/5">
          <div className="w-full  h-[401px] flex justify-center items-center">
            <div className="w-full bg-dashboardBg bg-cover bg-center py-6 rounded-[40px] h-full flex flex-col gap-[70px] mds:gap-24 justify-end items-center">
              <h4 className="mds:hidden text-[14px]  capitalize dark:text-gray-200 font-medium ">
                Hello, {userDetails?.data?.profile.username}
              </h4>
              <div>
                <h4 className="uppercase text-center text-white tracking-wider text-[10px] font-semibold ">
                  total payout
                </h4>
                <div className="flex  justify-center mt-3 items-center gap-4">
                  <h4 className="text-[40px] text-white">
                    {showBalance ? `$7,524` : "*****"}.
                    <span className="text-[#646464]">
                      {showBalance ? `08` : "**"}
                    </span>
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
                <h4 className="mt-1 text-center text-white  text-[12px]  ">
                  ~ NGN 10,235,674.98
                </h4>
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
          {kycStatus?.data.kyc_level === "0" && (
            <Link
              to="/kyc"
              className="w-full flex justify-between items-center gap-4 px-4 py-3 mt-6 bg-[#664101] rounded-2xl text-[#F5B546] "
            >
              <div className="flex  w-9/12 items-start gap-3">
                <div>
                  <TiWarning className="text-[28px]" />
                </div>

                <div>
                  <h4 className=" font-bold text-[16px]">KYC Incomplete</h4>
                  <h4 className="  text-[12px] mt-1 text-left">
                    {kycStatus?.message}
                  </h4>
                  <h4 className="  text-[11px] mt-1 text-left">
                    It appears that you have not yet completed your Know Your
                    Customer (KYC) verification process.
                  </h4>
                </div>
              </div>
              <SlArrowRight className="text-white text-[16px]" />
            </Link>
          )}
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
          <div className="h-[600px] lgss:h-[800px] mt-8 flex-col flex gap-6 py-4">
            <TransactionCard
              type="Deposit"
              status="Pending"
              nairaAmount={300}
              coin="Solana"
              coinAmount={200}
            />
            <TransactionCard
              type="Payout"
              status="Successful"
              nairaAmount={156092}
              coin="Bitcoin"
              coinAmount={0.05}
            />
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
    </div>
  );
};

export default Dashboard;
