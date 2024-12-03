import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/auth-context";
import { useInView } from "react-intersection-observer";
import { useUser } from "../context/user-context";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cryptpay, darkCrypt } from "../assets/images";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import toast from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";
import { SlArrowRight, SlOptions } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const NotificationModal = ({ setIsNotified, unreadNo }: any) => {
  const { token } = useAuth();
  const { theme, setTransactionID, setShowDetails } = useUser();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [notificationId, setNotificationId] = useState<string>("");
  const queryClient = useQueryClient();
  const [openDD, setOpenDD] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleButtonClick = () => {
    // Navigate to the settings route and set state to true
    if (pathname === "/dashboard") {
      setIsNotified(false);
      setShowDetails(true);
    } else {
      setIsNotified(false);
      navigate("/dashboard", { state: { showPay: 1 } });
    }
  };

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

  const [page, setPage] = useState<number>(1);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [ref, inView] = useInView();
  const axiosinstance = useAuthAxios();

  const handleFetchN = async () => {
    const response = await axiosinstance.get(API.getNotifications(page));
    return response.data;
  };
  const {
    data,
    error: error1,
    isLoading,
  } = useQuery({
    queryKey: ["get-notifications", page], // Unique key for this query
    queryFn: handleFetchN,
    enabled: !!token, // Ensure the query only runs if a token is available
  });
  useEffect(() => {
    const newError = error1 as any;
    if (error1) {
      toast.error(errorMessage(newError?.message || newError?.data?.message));
    }
  }, [error1]);
  const notifications = data?.data?.notifications || [];
  const totalPages = data?.data.last_page || 0;
  // console.log(notifications);

  useEffect(() => {
    if (inView) {
      if (page < totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  }, [inView, totalPages]);

  //Mark one as read
  const handleMarkRead = async () => {
    const response = await axiosinstance.post(
      API.markOneAsRead(notificationId),
      {}
    );
    return response.data;
  };

  const completeMarkOneRead = useMutation({
    mutationFn: handleMarkRead,
    onSuccess: (r: any) => {
      toast.success(r.message);
      setLoadingIndex(null);

      queryClient.invalidateQueries({
        queryKey: ["get-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-unreadNotifications"],
      });
    },
    onError: (error: any) => {
      setLoadingIndex(null);

      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  //Mark all as read
  const handleMarkAllRead = async () => {
    const response = await axiosinstance.post(API.markAllAsRead, {});
    return response.data;
  };

  const completeMarkAllRead = useMutation({
    mutationFn: handleMarkAllRead,
    onSuccess: (r: any) => {
      toast.success(r.message);
      setTimeout(() => {
        setIsNotified(false);
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["get-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-unreadNotifications"],
      });
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });

  // Group notifications by date
  const categorizeNotifications = (notifications: any[]) => {
    const today: any[] = [];
    const yesterday: any[] = [];
    const older: any = {};

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification.created_at);

      if (isToday(notificationDate)) {
        today.push(notification);
      } else if (isYesterday(notificationDate)) {
        yesterday.push(notification);
      } else {
        const dateKey = format(notificationDate, "PPP");
        if (!older[dateKey]) {
          older[dateKey] = [];
        }
        older[dateKey].push(notification);
      }
    });

    return { today, yesterday, older };
  };

  const NotificationList = ({ notifications }: { notifications: any[] }) => {
    const { today, yesterday, older } = categorizeNotifications(notifications);

    const renderNotifications = (notificationList: any[], title: string) => (
      <>
        {title && (
          <h3 className="text-[13px]  mt-4 dark:text-[#858585] tracking-wider uppercase">
            {title}
          </h3>
        )}
        {notificationList.map((notification: any, index: any) => {
          const notificationDate = new Date(notification.created_at);

          // Check if the notification is from today
          const isFromToday = isToday(notificationDate);

          // For today's notifications, display "x minutes/hours ago"
          const formattedDate = isFromToday
            ? formatDistanceToNow(notificationDate, { addSuffix: true }) // e.g., "10 minutes ago", "2 hours ago"
            : format(notificationDate, "hh:mm a"); // e.g., "09:45 AM" for older notifications

          return (
            <div
              className={
                notification.read_at
                  ? "mt-2 bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-xl p-4"
                  : "mt-2 bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-xl border border-[#E6E6E6] dark:border-[#1F1F1F] p-4"
              }
              onClick={() => {
                if (!notification.read_at) {
                  setNotificationId(notification.id);
                  setTimeout(() => {
                    setLoadingIndex(notification.id);

                    completeMarkOneRead.mutate();
                  }, 600);
                }
              }}
              key={index}
            >
              <div className="text-[13px] flex justify-between capitalize items-center gap-2 font-bold text-[#3A4852] dark:text-white">
                {notification.data.title
                  ? notification.data.title
                  : `${
                      notification.data.status
                        ? `KYC ${notification.data.status}`
                        : ""
                    }`}
                {loadingIndex === notification?.id ? (
                  <ClipLoader color="#3A66FF" size={15} />
                ) : (
                  <div>
                    {!notification.read_at && (
                      <div className="w-[10px] h-[10px] rounded-full bg-text_blue"></div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full flex justify-between mt-3 items-center">
                <h5 className="text-[13px] font-medium  text-[#617889] dark:text-white">
                  {notification.data.message
                    ? notification.data.message
                    : notification.data.review_notes}
                </h5>
                {notification.data.title?.toLowerCase().includes("payout") && (
                  <SlArrowRight
                    onClick={() => {
                      setTransactionID(notification.data.action_id);
                      setTimeout(() => {
                        handleButtonClick();
                      }, 1000);
                    }}
                    className="text-black dark:text-white text-[15px]"
                  />
                )}
              </div>
              <h5 className="text-[11px] font-medium mt-4 text-[#617889] dark:text-[#5C5C5C]">
                {formattedDate}
              </h5>
              {/* <div className="bg-gray-300 h-[1px] dark:bg-[#2F3A44] w-full rounded-full mt-4" /> */}
            </div>
          );
        })}
      </>
    );

    return (
      <>
        {today.length > 0 && renderNotifications(today, "Today")}
        {yesterday.length > 0 && renderNotifications(yesterday, "Yesterday")}
        {Object.keys(older).length > 0 &&
          Object.keys(older).map((date) => (
            <div key={date}>
              <h3 className="text-lg font-bold mt-2 dark:text-white">{date}</h3>
              {renderNotifications(older[date], "")}
            </div>
          ))}
      </>
    );
  };

  return (
    <div
      onClick={() => setIsNotified(false)}
      className="fixed w-full inset-0 flex font-sora justify-end px-6 xs:px-10 items-start pt-[75px] bg-[#000000] dark:bg-opacity-60 bg-opacity-10 "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative w-full mds:left-[30%] md:left-[35%] lgss:left-[61%]"
      >
        <div className="absolute -top-3 left-[88%] mds:left-[60%] md:left-[50%] xxxl:left-[17%] -z-50 lgss:left-[28%] transform -translate-x-1/2">
          <div className="w-6 h-6 bg-white dark:bg-[#141414] transform rotate-45 "></div>
        </div>
        <div className="bg-white  dark:bg-[#141414] w-full mds:w-2/3 md:w-3/5 lgss:w-2/5 xl:w-1/3 xxxl:w-1/5  rounded-xl">
          <div className="w-full  transition-all ease-in duration-1000   overflow-auto scrollbar-thumb-[#60B7F6] dark:scrollbar-thumb-[#AEBCC6] scrollbar-thin h-[500px] xs:h-[610px] lgss:h-[570px]">
            <div className="flex px-10 pt-4 border-b relative border-gray-300 dark:border-b-gray-900 pb-4 justify-between items-center">
              <div className="flex justify-center items-center gap-2 ">
                <h4 className="font-semibold text-[15px] text-gray-900 dark:text-white">
                  Notifications
                </h4>
                {unreadNo >= 1 && (
                  <div
                    className="w-[18px] h-[18px] xs:w-[24px] xs:h-[24px] rounded-full flex justify-center items-center text-secondary_button bg-[#D4EBFD] font-semibold
               text-[12px]"
                  >
                    {unreadNo}
                  </div>
                )}
              </div>
              {/* <FaTimes
                onClick={() => {
                  setIsNotified((prev: any) => !prev);
                }}
                className="text-gray-900 dark:text-gray-400 text-[20px] cursor-pointer"
              /> */}
              <div className="border-gray-100 dark:border-[#2B2B2B] border flex justify-center items-center h-[32px] w-[32px] rounded-full">
                <SlOptions
                  onClick={() => {
                    setOpenDD((prev) => !prev);
                  }}
                  className="dark:text-gray-100 text-gray-600 cursor-pointer text-[16px]"
                />
              </div>
              {openDD && (
                <div className="absolute top-full right-8 bg-[#F1F1F1] dark:bg-[#1F1F1F]  z-50 text-[14px] px-4 border-[#EDEDED]  border  dark:border-[#1E1E1E] rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      completeMarkAllRead.mutate();
                    }}
                    className="w-full  py-4 text-left text-gray-800 dark:text-gray-100 flex justify-center items-center gap-2"
                  >
                    {completeMarkAllRead.isPending ? (
                      <ClipLoader color="#3A66FF" size={15} />
                    ) : (
                      <IoCheckmark className="text-[16px]" />
                    )}
                    Mark all as read
                  </button>
                  <button
                    onClick={() => {
                      setIsNotified(false);
                    }}
                    className="w-full  py-4 text-left text-gray-800 dark:text-gray-100 flex justify-center items-center gap-2"
                  >
                    Close modal
                  </button>
                </div>
              )}
            </div>
            <div ref={divRef} className="w-full px-6 pt-4 pb-10 ">
              {notifications.length >= 1 ? (
                <NotificationList notifications={notifications} />
              ) : (
                !isLoading && (
                  <div className="w-full flex flex-col h-full px-12 justify-start mt-12 items-center">
                    <img src={getThemeBasedImage()} alt="" />
                    <h4 className="text-[14px] mt-5 text-center text-gray-800 dark:text-gray-500">
                      You have no notifications.
                    </h4>
                  </div>
                )
              )}
              {isLoading && (
                <div className="mt-6 flex justify-center items-center">
                  <ClipLoader color="#3A66FF" size={60} />
                </div>
              )}
              <div ref={ref} className=""></div>
            </div>
          </div>
          {/* <button className="w-full h-[42px] rounded-b-xl bg-text_blue text-white">
            Mark all as read
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
