import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { paddingX } from "../../constants";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import { format, isToday, isYesterday, parseISO } from "date-fns";
import TransactionCard from "./transactionList/TransactionCard";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { TiWarning } from "react-icons/ti";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../constants/api";
import { errorMessage } from "../../utils/errorMessage";
import useAuthAxios from "../../utils/baseAxios";
import KycModal from "./KycModal";
import { avatar, cryptpay, darkCrypt, notify } from "../../assets/images";
import { formatAmount } from "../../utils/formatDate";
import DetailsModal from "./transactionList/DetailsModal";
import MoreModal from "./MoreModal";
import { MdAdd, MdColorLens, MdOutlineRemove, MdPending } from "react-icons/md";
import AddWalletAddy from "./buyFlow/AddWalletAddy";
import Wallet from "./top-up/Wallet";
import Kyc2Modal from "./Kyc2Modal";
import SetPin from "./buyFlow/SetPin";
import DepositModal from "./top-up/DepositModal";
import NoticeModal from "./top-up/NoticeModal";
import PaymentCancelled from "./top-up/PaymentCancelled";
import PaymentScreen from "./top-up/PaymentScreen";
import PaymentSuccess from "./top-up/PaymentSuccess";
import SellOnboard from "./sellFlow/SellOnboard";
import SellFromCeller from "./sellFlow/sellFromCeler/SellFromCeller";
import SellPreview from "./sellFlow/sellFromCeler/SellPreview";
import SellPending from "./sellFlow/sellFromCeler/SellPending";
import BuyOnboard from "./buyFlow/BuyOnboard";
import BuyFromCeller from "./buyFlow/buyFromCeller/BuyFromCeller";
import DepositOnboard from "./top-up/DepositOnboard";
import SelectDCoin from "./top-up/depositCrypto/SelectDCoin";
import DepositScreen from "./top-up/depositCrypto/DepositScreen";
import { useAuth } from "../../context/auth-context";
import Sidebar from "../../components/Sidebar";
import DepositNetwork from "./top-up/depositCrypto/DepositNetwork";
import WithdrawOnboard from "./withdraw/WithdrawOnboard";
import Withdraw from "./withdraw/Withdraw";
import RecipientAddy from "./withdraw/RecipientAddy";
import Assets from "./withdraw/Assets";
import WithdrwaPeending from "./withdraw/WithdrwaPeending";
import WithdrawRequest from "./withdraw/WithdrawRequest";
import WithdrawalNetwork from "./withdraw/WithdrawalNetwork";
const Dashboard = () => {
  const {
    theme,
    setShowDetails,
    showDetails,
    displayColor,
    setIsPalette,
    setIsNotified,
  } = useUser();
  const { token } = useAuth();

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

  const [clickedPayout, setClickedPayout] = useState<any[]>([]);
  const [coinDeets, setCoinDeets] = useState<any[]>([]);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  //sell
  const [amountEx, setAmountEx] = useState<string>("");

  const [sellRateFlow, setSellRateFlow] = useState<boolean>(false);
  const [sellRate, setSellRate] = useState<boolean>(false);
  const [sellFromExModal, setSellFromExModal] = useState<boolean>(false);
  const [sellPendingModal, setSellPendingModal] = useState<boolean>(false);
  const [sellModal, setSellModal] = useState<boolean>(false);
  const [sellPreviewModal, setSellPreviewModal] = useState<boolean>(false);
  const [sellType, setSellType] = useState<string>("");
  const [selectCoinModal, setSelectCoinModal] = useState<boolean>(false);
  const [selectNetworkModal, setSelectNetworkModal] = useState<boolean>(false);
  const [selectBankModal, setSelectBankModal] = useState<boolean>(false);
  const [sellAssetModal, setSellAssetModal] = useState<boolean>(false);
  const [buyCoinModal, setBuyCoinModal] = useState<boolean>(false);
  const [buyCoinAddy, setBuyCoinAddy] = useState<boolean>(false);
  const [buyCoinPin, setBuyCoinPin] = useState<boolean>(false);
  const [buyReceiptModal, setBuyReceiptModal] = useState<boolean>(false);
  const [finalModal, setFinalModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState("");
  const [addBankModal, setAddBankModal] = useState<boolean>(false);
  const [bankAddedModal, setBankAddedModal] = useState<boolean>(false);
  const [walletAddy, setWalletAddy] = useState<string>("");
  const { userDetails } = useUser();
  const axiosInstance = useAuthAxios();
  const [networks, setNetworks] = useState<any[]>([]);
  const [kycModal, setKycModal] = useState<boolean>(false);
  const [kyc2Modal, setKyc2Modal] = useState<boolean>(false);
  const [selectedBankDetails, setSelectedBankDetails] = useState<any[]>([]);
  const [openMore, setOpenMore] = useState<boolean>(false);
  //Buy
  const [nairaAmount, setNairaAmount] = useState("");
  const [walletAddyBuy, setWalletAddyBuy] = useState<string>("");
  const [buySummary, setBuySummary] = useState<any[]>([]);
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [buyExModal, setBuyExModal] = useState<boolean>(false);
  const [buyType, setBuyType] = useState<string>("");

  //topup
  const [openWallet, setOpenWallet] = useState<boolean>(false);
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const [openDepositNetwork, setOpenDepositNetwork] = useState<boolean>(false);
  const [depositType, setDepositType] = useState<string>("");
  const [depositNetwork, setDepositNetwork] = useState<string>("");
  const [coinDepDeets, setCoinDepDeets] = useState<any[]>([]);
  const [depositScren, setdepositScren] = useState<boolean>(false);
  const [selectDep, setSelectDep] = useState<boolean>(false);

  const [depositOnboard, setdepositOnboard] = useState<boolean>(false);
  const [openNotice, setOpenNotice] = useState<boolean>(false);

  const [openPS, setOpenPS] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");
  const [openPSuccess, setOpenPSuccess] = useState<boolean>(false);

  const [openPCancel, setOpenPCancel] = useState<boolean>(false);
  const [openDisplay, setOpenDisplay] = useState<boolean>(true);

  const [bankDetails, setBankDetails] = useState<any>({});
  const [bgColor, setBgColor] = useState<string>("");
  const queryClient = useQueryClient();

  //withdrawal
  const [withdrawalOnboard, setWithdrawalOnboard] = useState<boolean>(false);
  const [withdrawalType, setWithdrawalType] = useState<string>("");
  const [recipientAddy, setRecipientAddy] = useState<string>("");
  const [recipientAddyModal, setRecipientAddyModal] = useState<boolean>(false);
  const [withdraw, setWithdraw] = useState<boolean>(false);
  const [assets, setAssets] = useState<boolean>(false);
  const [withdrawPending, setWithdrawPending] = useState<boolean>(false);
  const [withdrawRequest, setWithdrawRequest] = useState<boolean>(false);
  const [withrawAmount, setWithrawAmount] = useState<string>("");
  const [withrawcoindeets, setWithrawcoindeets] = useState<any[]>([]);
  const [networkW, setNetworkW] = useState<string>("");
  const [withdrawalNetwork, setWithdrawalNetwork] = useState<boolean>(false);
  const [totalUSDValue, setTotalUSDValue] = useState(0);
  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

  const navigate = useNavigate();
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
    const response = await axiosInstance.get(API.getAllTransactions);
    return response.data.data;
  };
  const { data: payouts, error: error3 } = useQuery({
    queryKey: ["get-all-payouts"],
    queryFn: getPayouts,
    retry: 1,
  });
  const getKycStatus = async () => {
    const response = await axiosInstance.get(API.checkKycStatus);
    return response.data;
  };
  const {
    data: kycStatus,
    error: error2,
    refetch,
  } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
    retry: 1,
  });
  // console.log(kycStatus);

  //Wallet
  const getWallets = async () => {
    const response = await axiosInstance.get(API.getWallets);
    return response.data;
  };
  const { data: wallets, error: error5 } = useQuery({
    queryKey: ["get-user-wallets"],
    queryFn: getWallets,
    retry: 1,
  });

  useEffect(() => {
    if (error5) {
      const newError = error5 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error5]);
  const getCoinPrices = async () => {
    const response = await axiosInstance.get(API.getCoinPrices);
    return response.data.data;
  };
  const { data: prices, error: error6 } = useQuery({
    queryKey: ["get-coin-prices"],
    queryFn: getCoinPrices,
    retry: 1,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (error6) {
      const newError = error6 as any;
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error6]);

  useEffect(() => {
    let sumUSD = 0;

    wallets?.wallets?.forEach(
      (
        wallet: {
          is_enabled: any;
          crypto_symbol: string | number;
          balance: any;
        },
        index: string | number
      ) => {
        if (wallet.is_enabled) {
          const coinRate = prices?.cryptocurrencies[wallet?.crypto_symbol] || 0;
          const balance = Number(wallet?.balance) || 0;

          const usdValue = coinRate * balance;

          sumUSD += usdValue;
        }
      }
    );

    setTotalUSDValue(sumUSD);
  }, [wallets, prices]);

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

  const sortedPayouts = payouts?.sort((a: any, b: any) => {
    return (
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
    );
  });

  const groupTransactionsByDate = (transactions: any[]) => {
    const groupedTransactions: { [key: string]: any[] } = {};

    transactions.forEach((transaction) => {
      const transactionDate = parseISO(transaction.transaction_date);
      let dateLabel = format(transactionDate, "MMMM d, yyyy");

      if (isToday(transactionDate)) {
        dateLabel = "Today";
      } else if (isYesterday(transactionDate)) {
        dateLabel = "Yesterday";
      }

      if (!groupedTransactions[dateLabel]) {
        groupedTransactions[dateLabel] = [];
      }
      groupedTransactions[dateLabel].push(transaction);
    });

    return groupedTransactions;
  };

  const groupedPayouts = groupTransactionsByDate(
    sortedPayouts?.slice(0, 8) || []
  );
  const location = useLocation();
  const showPay = location.state?.showPay;
  useEffect(() => {
    if (showPay) {
      setShowDetails(true);

      // Clear location.state to prevent re-triggering on refresh
      navigate("/dashboard", { replace: true, state: {} });
    }
  }, [showPay, navigate]);
  // console.log(sortedPayouts);
  const fetchUnreadNotifications = async () => {
    const response = await axiosInstance.get(API.getUnreadNotifications);
    return response.data;
  };

  const { data: notificationsData, refetch: refetch2 } = useQuery({
    queryKey: ["get-unreadNotifications", token],
    queryFn: fetchUnreadNotifications,
    enabled: !!token,
  });
  const fiatBalance = userDetails?.data?.profile?.fiat_balance;

  return (
    <div className="lgss:flex font-manrope  lgss:flex-row h-screen lgss:h-screen bg-[#F7F8F9]   dark:bg-primary_dark">
      <Sidebar />
      <div
        className={`w-full  lgss:w-[80%] font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
      >
        <Navbar />
        <div className={`${paddingX}  w-full mt-12 lgss:flex lgss:gap-12 `}>
          <div className="w-full  lgss:w-[55%]">
            <div
              className={
                openDisplay
                  ? "w-full h-[401px] mb-24 flex justify-center flex-col items-center relative"
                  : "w-full h-[401px] flex justify-center flex-col items-center relative"
              }
            >
              {/* Blue background behind the image */}
              {openDisplay && (
                <div
                  style={{ backgroundColor: bgColor }}
                  className={`py-3 ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  } w-full -bottom-[130px] pt-20 rounded-b-[40px] absolute ${
                    openDisplay ? "" : "sidebar-hidden"
                  }   pl-4 xxs:pl-10 lgss:px-16 xxxl:px-20 sidebar`}
                >
                  <div className="w-full mx-auto grid grid-cols-2 gap-3 md:gap-4 justify-start items-center">
                    <div>
                      <h4
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                        className="uppercase text-start break-words text-white tracking-wide text-[10px]  "
                      >
                        🤑 FIAT BAL
                      </h4>
                      <h4 className="uppercase text-start mt-1  text-white tracking-wider text-[14px] font-bold ">
                        NGN {formatAmount(fiatBalance)}
                      </h4>
                    </div>
                    <div>
                      <h4 className="uppercase text-start  text-white tracking-wider text-[10px]  ">
                        ♦️ CRYPTO BAL
                      </h4>
                      <h4
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                        className="uppercase text-start mt-1 break-words  text-white tracking-wider text-[15px] font-semibold "
                      >
                        $ {formatAmount(totalUSDValue)}
                      </h4>
                    </div>
                    <div>
                      <h4 className="uppercase text-start  text-white tracking-wider text-[10px]  ">
                        💸 TOTAL PAYOUT
                      </h4>
                      <h4
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                        className="uppercase text-start mt-1 break-words  text-white tracking-wider text-[15px] font-semibold "
                      >
                        $
                        {payoutSummary?.total_asset_in_usd
                          ? formatAmount(payoutSummary?.total_asset_in_usd)
                          : "0.00"}
                      </h4>
                    </div>
                    <div>
                      <h4 className="uppercase text-start  text-white tracking-wider text-[10px]  ">
                        ✅ TOTAL PURCHASE
                      </h4>
                      <h4
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                        className="uppercase text-start mt-1 break-words  text-white tracking-wider text-[15px] font-semibold "
                      >
                        ${" "}
                        {payoutSummary?.total_bought_in_usd
                          ? formatAmount(payoutSummary?.total_bought_in_usd)
                          : "0.00"}
                      </h4>
                    </div>

                    {/* <div
                  onClick={() => {
                    if (
                      kycStatus?.data.kyc_level === "000" ||
                      kycStatus?.data.kyc_status === null ||
                      (kycStatus?.data.kyc_level === "000" &&
                        kycStatus?.data.kyc_status === "pending")
                    ) {
                      setKycModal(true);
                    } else if (
                      kycStatus?.data.kyc_level === "100" ||
                      (kycStatus?.data.kyc_level === "100" &&
                        kycStatus?.data.kyc_status === "pending")
                    ) {
                      setKyc2Modal(true);
                    } else {
                      setOpenWallet(true);
                    }
                  }}
                  className="w-[50px] h-[50px] p-[10px] cursor-pointer bg-blue-300 bg-opacity-50 rounded-full"
                >
                  <div className="w-full h-full flex justify-center p-1 bg-blue-500 rounded-full  items-center">
                    <SlArrowRight className="text-white text-[14px]" />
                  </div>
                </div> */}
                  </div>
                </div>
              )}

              {/* Main content container with rounded corners */}
              <div className="w-full bg-dashboardBg bg-cover  bg-center py-6 rounded-[40px] h-full flex flex-col gap-[70px] mds:gap-24 justify-end items-center relative ">
                <div className="lgss:hidden  mds:relative top-12  w-full px-4 flex justify-between gap-3 items-center">
                  <div className="flex gap-3 items-center">
                    <NavLink to="/settings">
                      <div className="w-[36px] h-[36px] rounded-full">
                        <img
                          src={avatar}
                          alt=""
                          className="w-full h-full bg-cover"
                        />
                      </div>
                    </NavLink>
                    <h4 className=" capitalize text-white text-[14px]">
                      Hello, {userDetails?.data?.profile.username}
                    </h4>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button className="w-[32px]  h-[32px] bg-[#313131] rounded-full flex justify-center items-center">
                      <MdColorLens
                        onClick={() => setIsPalette((prev: any) => !prev)}
                        className="cursor-pointer text-gray-100 text-[20px]"
                      />
                    </button>
                    <button className="w-[32px] relative h-[32px] bg-[#313131] rounded-full flex justify-center items-center">
                      <img
                        src={notify}
                        onClick={() => setIsNotified((prev: any) => !prev)}
                        className="cursor-pointer"
                        alt=""
                      />
                      {notificationsData?.data?.total >= 1 && (
                        <div
                          style={{
                            backgroundColor: bgColor,
                          }}
                          className={`bell-light absolute top-0 animate-pulse -right-[1px] w-4 h-4  flex justify-center items-center font-bold text-[9px] text-white ${
                            bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                          } rounded-full`}
                        >
                          {notificationsData?.data?.total}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => setOpenDisplay((prev) => !prev)}
                    className="flex cursor-pointer justify-center items-center gap-1"
                  >
                    <h4 className="uppercase text-center text-white tracking-wider text-[11px] font-semibold ">
                      total payout
                    </h4>
                    {openDisplay ? (
                      <SlArrowDown className="text-[10px] text-white" />
                    ) : (
                      <SlArrowRight className="text-[10px] text-white" />
                    )}
                  </div>
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
                        className="text-white cursor-pointer text-[24px]"
                      />
                    ) : (
                      <VscEye
                        onClick={() => setShowBalance((prev) => !prev)}
                        className="text-white cursor-pointer text-[24px]"
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
                      *****
                    </h4>
                  )}
                </div>
                <div className="flex gap-8 xxs:gap-10 mds:gap-12 justify-center items-center">
                  <div className="cursor-pointer flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        if (
                          kycStatus?.data.kyc_level === "000" ||
                          kycStatus?.data.kyc_status === null ||
                          (kycStatus?.data.kyc_level === "000" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKycModal(true);
                        } else if (
                          kycStatus?.data.kyc_level === "100" ||
                          (kycStatus?.data.kyc_level === "100" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKyc2Modal(true);
                        } else {
                          setSellRate(false);
                          setSellRateFlow(false);
                          setBuyModal(true);
                        }
                      }}
                      style={{ backgroundColor: bgColor }}
                      className={`w-[45px] h-[45px] rounded-full ${
                        bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                      } flex justify-center items-center`}
                    >
                      <MdAdd className="text-[24px] text-white" />
                    </button>
                    <h4 className="text-white mt-1 text-[14px] text-center">
                      Buy
                    </h4>
                  </div>
                  <div className="cursor-pointer flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        if (
                          kycStatus?.data.kyc_level === "000" ||
                          kycStatus?.data.kyc_status === null ||
                          (kycStatus?.data.kyc_level === "000" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKycModal(true);
                        } else {
                          setSellRate(true);
                          setSellRateFlow(true);
                          setSellModal(true);
                        }
                      }}
                      className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
                    >
                      <MdOutlineRemove className="text-[24px] text-white" />
                    </button>
                    <h4 className="text-white mt-1 text-[14px] text-center">
                      Sell
                    </h4>
                  </div>
                  <div className="cursor-pointer flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        if (
                          kycStatus?.data.kyc_level === "000" ||
                          kycStatus?.data.kyc_status === null ||
                          (kycStatus?.data.kyc_level === "000" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKycModal(true);
                        } else if (
                          kycStatus?.data.kyc_level === "100" ||
                          (kycStatus?.data.kyc_level === "100" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKyc2Modal(true);
                        } else {
                          setdepositOnboard(true);
                        }
                      }}
                      className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
                    >
                      <BsArrowDown className="text-[24px] text-white" />
                    </button>
                    <h4 className="text-white mt-1 text-[14px] text-center">
                      Deposit
                    </h4>
                  </div>

                  <div className="cursor-pointer flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        if (
                          kycStatus?.data.kyc_level === "000" ||
                          kycStatus?.data.kyc_status === null ||
                          (kycStatus?.data.kyc_level === "000" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKycModal(true);
                        } else if (
                          kycStatus?.data.kyc_level === "100" ||
                          (kycStatus?.data.kyc_level === "100" &&
                            kycStatus?.data.kyc_status === "pending")
                        ) {
                          setKyc2Modal(true);
                        } else {
                          setWithdrawalOnboard(true);
                        }
                      }}
                      className="w-[45px] h-[45px] rounded-full bg-[#2F2F2F] flex justify-center items-center"
                    >
                      <BsArrowUp className="text-[24px] text-white" />
                    </button>
                    <h4 className="text-white mt-1 text-[14px] text-center">
                      Withdraw
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {kycStatus?.data.kyc_status === "pending" ? (
              <div
                className={`w-full  flex justify-between items-start md:gap-8 p-4 gap-2 xs:gap-4  ${
                  openDisplay ? "mt-[160px]" : "mt-4"
                } bg-[#E9F4FF] rounded-2xl text-gray-900 `}
              >
                <div className="flex  w-full items-start gap-6 px-4">
                  <div>
                    <div className="flex justify-start gap-2">
                      <MdPending className="text-[28px]" />
                      <h4 className=" font-bold text-[18px]">
                        Verification is in Progress
                      </h4>
                    </div>
                    <h4 className="  text-[14px] mt-1 text-left ">
                      Your KYC{" "}
                      {kycStatus?.data.kyc_level === "100" && "Level 2"}
                      {kycStatus?.data.kyc_level === "201" &&
                        "Level 2 Tier-2"}{" "}
                      verification is currently being processed. Please allow
                      some time for confirmation
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      queryClient.invalidateQueries({
                        queryKey: ["kyc-status"],
                      });
                      refetch();
                    }}
                    className="p-4 mt-4  rounded-lg bg-text_blue text-white font-medium text-[14px]"
                  >
                    Refresh
                  </button>
                </div>
                {/* <SlArrowRight className="text-white text-[16px]" /> */}
              </div>
            ) : kycStatus?.data.kyc_level === "000" ||
              kycStatus?.data.kyc_status === null ? (
              <Link
                to="/kyc"
                className={`w-full flex justify-between items-center gap-4 px-4 py-3 ${
                  openDisplay ? "mt-[160px]" : "mt-4"
                } bg-[#664101] rounded-2xl text-[#F5B546] `}
              >
                <div className="flex  w-9/12 items-start gap-3">
                  <div>
                    <TiWarning className="text-[28px]" />
                  </div>

                  <div>
                    <h4 className=" font-bold text-[16px]">KYC Incomplete</h4>
                    <h4 className="  text-[11px] mt-1 text-left">
                      It appears that you have not yet completed your Know Your
                      Customer (KYC) verification process.
                    </h4>
                  </div>
                </div>
                <SlArrowRight className="text-white text-[16px]" />
              </Link>
            ) : null}
            {/* <div
              className={
                kycStatus?.data.kyc_status === "pending"
                  ? "flex w-full  mx-auto lgss:mx-0 mt-8 px-2  h-[56px] rounded-2xl items-center"
                  : kycStatus?.data.kyc_level === "000" ||
                    kycStatus?.data.kyc_status === null
                  ? "flex w-full  mx-auto lgss:mx-0 mt-10 px-2  h-[56px] rounded-2xl items-center"
                  : openDisplay
                  ? "flex w-full  mx-auto lgss:mx-0 mt-[160px] px-2  h-[56px] rounded-2xl items-center"
                  : "flex w-full  mx-auto lgss:mx-0 mt-8 px-2  h-[56px] rounded-2xl items-center"
              }
            >
              <button
                onClick={() => setSellRateFlow(false)}
                style={{
                  borderBottom: !sellRateFlow
                    ? `2px solid ${bgColor}`
                    : "2px solid #645D5D",
                }}
                className={
                  sellRateFlow
                    ? "py-4 w-[50%]  border-b-2 dark:border-[#645D5D] dark:text-[#645D5D] border-[#B7AFAF]  font-semibold text-[14px] text-[#B7AFAF] flex justify-center items-center"
                    : `py-4 w-[50%]  text-gray-900 dark:text-white font-semibold text-[14px] border-b-2 ${
                        bgColor ? `border-[${bgColor}]` : "border-text_blue"
                      }  flex justify-center items-center`
                }
              >
                Buy Rate
              </button>
              <button
                style={{
                  borderBottom: sellRateFlow
                    ? `2px solid ${bgColor}`
                    : "2px solid #645D5D",
                }}
                onClick={() => setSellRateFlow(true)}
                className={
                  !sellRateFlow
                    ? "py-4 w-[50%]  border-b-2 dark:border-[#645D5D] dark:text-[#645D5D] border-[#B7AFAF]  font-semibold text-[14px] text-[#B7AFAF] flex justify-center items-center"
                    : `py-4 w-[50%]  text-gray-900 dark:text-white font-semibold text-[14px] border-b-2 ${
                        bgColor ? `border-[${bgColor}]` : "border-text_blue"
                      } flex justify-center items-center`
                }
              >
                Sell Rate
              </button>
            </div> */}
            {/* <h4 className="dark:text-gray-300 mt-10 text-black text-[16px] font-medium">
              These are the rates you will be{" "}
              {sellRateFlow ? "selling" : "buying"} a specific asset at{" "}
            </h4>
            <RateBoard
              setSelectNetworkModal={setSelectNetworkModal}
              sellRateFlow={sellRateFlow}
              setSellRate={setSellRate}
              setCoin={setCoin}
              setCoinDeets={setCoinDeets}
              networks={networks}
              setNetworks={setNetworks}
              setNetwork={setNetwork}
              setSelectBankModal={setSelectBankModal}
              setBuyCoinModal={setBuyCoinModal}
              buyType={buyType}
              setBuyExModal={setBuyExModal}
            /> */}
          </div>
          <div className="w-full lgss:w-[45%] mt-44 lgss:mt-6">
            <div className="w-full flex justify-between items-center">
              <h4 className="text-black dark:text-white  text-[15px] ">
                Recent Transactions
              </h4>
              <Link
                to="/history"
                style={{ color: bgColor }}
                className={`text-[15px] ${
                  bgColor ? `text-[${bgColor}]` : "text-text_blue"
                } `}
              >
                View all
              </Link>
            </div>
            <div className="h-[600px] lgss:h-[800px] overflow-auto mt-4 flex-col flex gap-6 py-4">
              {sortedPayouts?.length >= 1 ? (
                Object.entries(groupedPayouts).map(
                  ([dateLabel, transactions]) => (
                    <div key={dateLabel} className="w-full">
                      <h4 className="text-gray-500 text-left mb-4 text-[12px]">
                        {dateLabel}
                      </h4>
                      {transactions.map((payout: any, index: number) => (
                        <div key={index} className="w-full">
                          <div className="cursor-pointer w-full">
                            <TransactionCard
                              payouts={payout}
                              onClick1={() => {
                                setClickedPayout(payout);
                                setShowDetails(true);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )
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
          {openMore && (
            <MoreModal
              setOpenMore={setOpenMore}
              setOpenWallet={setOpenWallet}
              setSelectCoinModal={setSelectCoinModal}
            />
          )}
          {sellModal && (
            <SellOnboard
              setSellModal={setSellModal}
              setSelectCoinModal={setSelectCoinModal}
              setSellType={setSellType}
              sellType={sellType}
            />
          )}
          {sellPreviewModal && (
            <SellPreview
              setSellModal={setSellModal}
              setSellPreviewModal={setSellPreviewModal}
            />
          )}
          {selectCoinModal && (
            <SelectCoin
              setSellModal={setSellModal}
              setSelectCoinModal={setSelectCoinModal}
              setCoin={setCoin}
              setSelectNetworkModal={setSelectNetworkModal}
              setNetworks={setNetworks}
              setNetwork={setNetwork}
              setSelectBankModal={setSelectBankModal}
              sellRateFlow={sellRateFlow}
              setSellRateFlow={setSellRateFlow}
              openMore={openMore}
              setCoinDeets={setCoinDeets}
              setBuyCoinModal={setBuyCoinModal}
              setBuyExModal={setBuyExModal}
              setSellType={setSellType}
              sellType={sellType}
              setBuyType={setBuyType}
              buyType={buyType}
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
            sellRate={sellRateFlow}
            buyType={buyType}
            setBuyExModal={setBuyExModal}
            sellRateFlow={sellRateFlow}
            setBuyCoinModal={setBuyCoinModal}
          />
        )}
        {selectBankModal && (
          <SelectBank
            setSelectBankModal={setSelectBankModal}
            setSelectNetworkModal={setSelectNetworkModal}
            setSellAssetModal={setSellAssetModal}
            setAddBankModal={setAddBankModal}
            networks={networks}
            setSelectCoinModal={setSelectCoinModal}
            setSelectedBankDetails={setSelectedBankDetails}
            selectedBankDetails={selectedBankDetails}
            setSellFromExModal={setSellFromExModal}
            sellType={sellType}
          />
        )}
        {sellFromExModal && (
          <SellFromCeller
            setSellFromExModal={setSellFromExModal}
            setSelectBankModal={setSelectBankModal}
            coin={coin}
            setAmountEx={setAmountEx}
            amountEx={amountEx}
            coinDeets={coinDeets}
            setSellPreviewModal={setSellPreviewModal}
          />
        )}
        {sellPreviewModal && (
          <SellPreview
            setSellFromExModal={setSellFromExModal}
            setSellPreviewModal={setSellPreviewModal}
            amountEx={amountEx}
            coinDeets={coinDeets}
            setSellPendingModal={setSellPendingModal}
          />
        )}
        {sellPendingModal && (
          <SellPending setSellPendingModal={setSellPendingModal} />
        )}

        {/* {generateAddyModal && (
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
      )} */}
        {sellAssetModal && (
          <SellAsset
            setSellAssetModal={setSellAssetModal}
            setSelectBankModal={setSelectBankModal}
            setFinalModal={setFinalModal}
            coin={coin}
            setNetworks={setNetworks}
            network={network}
            setCoinDeets={setCoinDeets}
            setNetwork={setNetwork}
            networks={networks}
            walletAddy={walletAddy}
            setWalletAddy={setWalletAddy}
            coinDeets={coinDeets}
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
        {buyModal && (
          <BuyOnboard
            setBuyType={setBuyType}
            buyType={buyType}
            setBuyModal={setBuyModal}
            setSelectCoinModal={setSelectCoinModal}
          />
        )}
        {buyExModal && (
          <BuyFromCeller
            setSelectCoinModal={setSelectCoinModal}
            coin={coin}
            network={network}
            coinAmount={coinAmount}
            setCoinAmount={setCoinAmount}
            nairaAmount={nairaAmount}
            setNairaAmount={setNairaAmount}
            setBuyExModal={setBuyExModal}
            setOpenDeposit={setOpenDeposit}
            setBuyReceiptModal={setBuyReceiptModal}
            setBuySummary={setBuySummary}
            setBuyCoinPin={setBuyCoinPin}
            buyType={buyType}
          />
        )}
        {buyCoinModal && (
          <BuyCoin
            setSelectCoinModal={setSelectCoinModal}
            setBuyCoinModal={setBuyCoinModal}
            setBuyCoinAddy={setBuyCoinAddy}
            coin={coin}
            network={network}
            coinAmount={coinAmount}
            setCoinAmount={setCoinAmount}
            nairaAmount={nairaAmount}
            setNairaAmount={setNairaAmount}
            setOpenDeposit={setOpenDeposit}
          />
        )}
        {buyCoinAddy && (
          <AddWalletAddy
            setBuyCoinModal={setBuyCoinModal}
            setBuyReceiptModal={setBuyReceiptModal}
            coin={coin}
            network={network}
            setBuyCoinAddy={setBuyCoinAddy}
            walletAddy={walletAddyBuy}
            setWalletAddy={setWalletAddyBuy}
            setBuySummary={setBuySummary}
            nairaAmount={nairaAmount}
            setBuyCoinPin={setBuyCoinPin}

            // setSelectNetworkModal={setSelectNetworkModal}
            // coinAmount={coinAmount}
            // setCoinAmount={setCoinAmount}
          />
        )}
        {buyReceiptModal && (
          <BuyReceipt
            setBuyCoinModal={setBuyCoinModal}
            setBuyReceiptModal={setBuyReceiptModal}
            coin={coin}
            network={network}
            walletAddy={walletAddyBuy}
            setFinalModal={setFinalModal}
            setWalletAddy={setWalletAddyBuy}
            setNairaAmount={setNairaAmount}
            setBuySummary={setBuySummary}
            buySummary={buySummary}
            buyType={buyType}
            setCoinAmount={setCoinAmount}
            setBuyExModal={setBuyExModal}
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
            setClickedPayout={setClickedPayout}
          />
        )}

        {openWallet && (
          <Wallet
            setOpenWallet={setOpenWallet}
            setBuyCoinModal={setSelectCoinModal}
            openDeposit={openDeposit}
            setOpenDeposit={setOpenDeposit}
            openNotice={openNotice}
            setOpenNotice={setOpenNotice}
            openPS={openPS}
            setOpenPS={setOpenPS}
            amount={amount}
            setAmount={setAmount}
            openPSuccess={openPSuccess}
            setOpenPSuccess={setOpenPSuccess}
            openPCancel={openPCancel}
            setOpenPCancel={setOpenPCancel}
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
          />
        )}
        {depositOnboard && (
          <DepositOnboard
            setdepositOnboard={setdepositOnboard}
            setDepositType={setDepositType}
            setOpenDeposit={setOpenDeposit}
            setSelectDep={setSelectDep}
          />
        )}
        {selectDep && (
          <SelectDCoin
            setSelectDep={setSelectDep}
            setCoinDepDeets={setCoinDepDeets}
            setdepositScren={setdepositScren}
            setdepositOnboard={setdepositOnboard}
            setOpenDepositNetwork={setOpenDepositNetwork}
          />
        )}
        {openDepositNetwork && (
          <DepositNetwork
            setOpenDepositNetwork={setOpenDepositNetwork}
            setSelectDep={setSelectDep}
            setdepositScren={setdepositScren}
            coinDepDeets={coinDepDeets}
            setDepositNetwork={setDepositNetwork}
          />
        )}
        {depositScren && (
          <DepositScreen
            setSelectDep={setSelectDep}
            setdepositScren={setdepositScren}
            coinDepDeets={coinDepDeets}
            depositNetwork={depositNetwork}
            setOpenDepositNetwork={setOpenDepositNetwork}
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
        {openNotice && (
          <NoticeModal
            setOpenNotice={setOpenNotice}
            setOpenWallet={setOpenWallet}
            setOpenDeposit={setOpenDeposit}
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
            setBuyModal={setBuyModal}
          />
        )}
        {openPSuccess && (
          <PaymentSuccess
            amount={amount}
            bankDetails={bankDetails}
            setOpenPSuccess={setOpenPSuccess}
            setSelectCoinModal={setSelectCoinModal}
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
        {buyCoinPin && (
          <SetPin
            setBuyCoinAddy={setBuyCoinAddy}
            setBuyCoinPin={setBuyCoinPin}
            setBuyReceiptModal={setBuyReceiptModal}
          />
        )}
        {kyc2Modal && <Kyc2Modal setKyc2Modal={setKyc2Modal} />}
        {withdrawalOnboard && (
          <WithdrawOnboard
            setWithdrawalOnboard={setWithdrawalOnboard}
            setWithdrawalType={setWithdrawalType}
            setAssets={setAssets}
          />
        )}
        {recipientAddyModal && (
          <RecipientAddy
            setRecipientAddyModal={setRecipientAddyModal}
            setRecipientAddy={setRecipientAddy}
            setAssets={setAssets}
            setWithdraw={setWithdraw}
            withdrawcoindeets={withrawcoindeets}
            recipientAddy={recipientAddy}
            networkW={networkW}
          />
        )}
        {withdraw && (
          <Withdraw
            setWithdraw={setWithdraw}
            setRecipientAddyModal={setRecipientAddyModal}
            setWithdrawRequest={setWithdrawRequest}
            withdrawcoindeets={withrawcoindeets}
            withdrawAmount={withrawAmount}
            setWithrawAmount={setWithrawAmount}
          />
        )}
        {withdrawRequest && (
          <WithdrawRequest
            setWithdrawRequest={setWithdrawRequest}
            setWithdraw={setWithdraw}
            setWithdrawPending={setWithdrawPending}
            recipientAddy={recipientAddy}
            withdrawcoindeets={withrawcoindeets}
            withdrawAmount={withrawAmount}
            networkW={networkW}
          />
        )}
        {assets && (
          <Assets
            setAssets={setAssets}
            setWithdrawalOnboard={setWithdrawalOnboard}
            setRecipientAddyModal={setRecipientAddyModal}
            setWithrawcoindeets={setWithrawcoindeets}
            setWithdrawalNetwork={setWithdrawalNetwork}
          />
        )}
        {withdrawalNetwork && (
          <WithdrawalNetwork
            setWithdrawalNetwork={setWithdrawalNetwork}
            setAssets={setAssets}
            setRecipientAddyModal={setRecipientAddyModal}
            withdrawcoindeets={withrawcoindeets}
            setNetworkW={setNetworkW}
          />
        )}
        {withdrawPending && (
          <WithdrwaPeending setWithdrawPending={setWithdrawPending} />
        )}
      </div>
    </div>
    // Top-up
  );
};

export default Dashboard;
