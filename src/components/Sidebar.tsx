import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { darkLogo, logo } from "../assets/images";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import {
  TbHistory,
  TbHome,
  TbWallet,
  TbSettings,
  TbLogout,
} from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { errorMessage } from "../utils/errorMessage";
import { ClipLoader } from "react-spinners";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
const Sidebar = () => {
  const { logout } = useAuth();
  const [activeStatus, setActiveStatus] = useState<number>(1);
  const { setShowMenu, showMenu, theme, displayColor } = useUser();
  const axiosInstance = useAuthAxios();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const handleLogout = async () => {
    const response = await axiosInstance.post(API.logout, {});
    return response.data;
  };
  const completeLogout = useMutation({
    mutationFn: handleLogout,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        logout();
      }, 1500);
    },
    onError: (error: any) => {
      // console.log(error);
      logout();
      toast.error(
        errorMessage((error?.data as any)?.error || String(error?.data))
      );
    },
  });

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveStatus(1);
    } else if (location.pathname === "/wallet") {
      setActiveStatus(3);
    } else if (location.pathname === "/settings") {
      setActiveStatus(4);
    } else if (location.pathname === "/history") {
      setActiveStatus(2);
    } else {
      setActiveStatus(1);
    }
  }, [location.pathname]);

  return (
    <div className="lgss:w-[20%] bg-[#FFFFFF] font-sora dark:bg-[#141414]">
      <div className="hidden lgss:flex lgss:flex-col px-6 font-sora h-screen justify-between border-r border-[#E6E6E6] dark:border-[#252525]  w-full  bg-[#FFFFFF]  dark:bg-[#141414] pt-[35px] ">
        <div className=" mt-12 lgss:mt-0 w-full">
          <div className="flex justify-start items-center w-full mb-12">
            {theme === "light" ? (
              <img src={logo} className="" alt="logo" />
            ) : (
              <img src={darkLogo} className="" alt="logo" />
            )}
          </div>
          <Link
            to="/dashboard"
            style={{
              backgroundColor: activeStatus === 1 ? bgColor : "transparent",
            }}
            className={
              activeStatus === 1
                ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  }  items-center`
                : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
            }
          >
            <div className="flex gap-2 justify-start   items-center ">
              <TbHome
                className={
                  activeStatus === 1
                    ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                    : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                }
              />
              <h4
                className={
                  activeStatus === 1
                    ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                    : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                }
              >
                Home
              </h4>
            </div>
          </Link>
          <Link
            to="/history"
            style={{
              backgroundColor: activeStatus === 2 ? bgColor : "transparent",
            }}
            className={
              activeStatus === 2
                ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  }  items-center`
                : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
            }
          >
            <div className="flex gap-2 justify-start   items-center ">
              <TbHistory
                className={
                  activeStatus === 2
                    ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                    : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                }
              />
              <h4
                className={
                  activeStatus === 2
                    ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                    : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                }
              >
                History
              </h4>
            </div>
          </Link>
          <Link
            to="/wallet"
            style={{
              backgroundColor: activeStatus === 3 ? bgColor : "transparent",
            }}
            className={
              activeStatus === 3
                ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  }  items-center`
                : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
            }
          >
            <div className="flex gap-2 justify-start   items-center ">
              <TbWallet
                className={
                  activeStatus === 3
                    ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                    : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                }
              />
              <h4
                className={
                  activeStatus === 3
                    ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                    : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                }
              >
                Wallet
              </h4>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4 py-20">
          <Link
            to="/settings"
            style={{
              backgroundColor: activeStatus === 4 ? bgColor : "transparent",
            }}
            className={
              activeStatus === 4
                ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                    bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                  }  items-center`
                : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
            }
          >
            <div className="flex gap-2 justify-start   items-center ">
              <TbSettings
                className={
                  activeStatus === 4
                    ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                    : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                }
              />
              <h4
                className={
                  activeStatus === 4
                    ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                    : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                }
              >
                Settings
              </h4>
            </div>
          </Link>
          <button
            onClick={() => {
              completeLogout.mutate();
            }}
            className=" flex justify-start text-gray-600 dark:text-gray-400 text-[16px] px-4 h-[48px] items-center gap-2"
          >
            <FiLogOut className="text-gray-600 dark:text-gray-400 text-[20px]" />
            {completeLogout.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              "Log out"
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <div
          className={`absolute z-50 top-0 left-0  h-screen  bg-[#FFFFFF] dark:bg-[#141414] w-full py-4 px-0 pt-10   transform transition-transform duration-300 ${
            showMenu ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div className="w-full flex flex-col justify-between h-full bg-[#FFFFFF] dark:bg-[#141414]">
            <div className=" bg-[#FFFFFF] mt-4 dark:bg-[#141414]">
              <div className="flex justify-between px-4 xxs:px-8 mb-16 items-center">
                <div className="flex justify-start  items-center w-full">
                  {theme === "light" ? (
                    <img src={logo} className="" alt="logo" />
                  ) : (
                    <img src={darkLogo} className="" alt="logo" />
                  )}
                </div>
                <IoClose
                  className="dark:text-white text-black text-3xl"
                  onClick={() => setShowMenu((prev: any) => !prev)}
                />
              </div>
              <div className="flex flex-col gap-4 px-4 xxs:px-8">
                <Link
                  to="/dashboard"
                  style={{
                    backgroundColor:
                      activeStatus === 1 ? bgColor : "transparent",
                  }}
                  onClick={() => setShowMenu((prev: any) => !prev)}
                  className={
                    activeStatus === 1
                      ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                          bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                        }  items-center`
                      : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
                  }
                >
                  <div className="flex gap-2 justify-start   items-center ">
                    <TbHome
                      className={
                        activeStatus === 1
                          ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                          : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                      }
                    />
                    <h4
                      className={
                        activeStatus === 1
                          ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                          : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                      }
                    >
                      Home
                    </h4>
                  </div>
                </Link>
                <Link
                  to="/history"
                  style={{
                    backgroundColor:
                      activeStatus === 2 ? bgColor : "transparent",
                  }}
                  onClick={() => setShowMenu((prev: any) => !prev)}
                  className={
                    activeStatus === 2
                      ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                          bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                        }  items-center`
                      : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
                  }
                >
                  <div className="flex gap-2 justify-start   items-center ">
                    <TbHistory
                      className={
                        activeStatus === 2
                          ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                          : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                      }
                    />
                    <h4
                      className={
                        activeStatus === 2
                          ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                          : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                      }
                    >
                      History
                    </h4>
                  </div>
                </Link>
                <Link
                  to="/wallet"
                  style={{
                    backgroundColor:
                      activeStatus === 3 ? bgColor : "transparent",
                  }}
                  onClick={() => setShowMenu((prev: any) => !prev)}
                  className={
                    activeStatus === 3
                      ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                          bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                        }  items-center`
                      : "flex cursor-pointer justify-between  h-[48px] px-4  items-center"
                  }
                >
                  <div className="flex gap-2 justify-start   items-center ">
                    <TbWallet
                      className={
                        activeStatus === 3
                          ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                          : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                      }
                    />
                    <h4
                      className={
                        activeStatus === 3
                          ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                          : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                      }
                    >
                      Wallet
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col px-4 xxs:px-8 gap-4 py-20">
              <Link
                to="/settings"
                style={{
                  backgroundColor: activeStatus === 4 ? bgColor : "transparent",
                }}
                onClick={() => setShowMenu((prev: any) => !prev)}
                className={
                  activeStatus === 4
                    ? `flex cursor-pointer justify-between transform transition-transform duration-300 rounded-[8px]  h-[48px] px-4 ${
                        bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
                      }  items-center`
                    : "flex cursor-pointer justify-between  h-[48px] px-4   items-center"
                }
              >
                <div className="flex gap-2 justify-start   items-center ">
                  <TbSettings
                    className={
                      activeStatus === 4
                        ? "text-white font-bold  transform text-[20px] transition-transform duration-300"
                        : "dark:text-gray-400 text-gray-600 font-normal text-[20px]"
                    }
                  />
                  <h4
                    className={
                      activeStatus === 4
                        ? " text-[16px] text-white transform font-bold transition-transform duration-300"
                        : "font-normal text-[16px] dark:text-gray-400 text-gray-600"
                    }
                  >
                    Settings
                  </h4>
                </div>
              </Link>
              <button
                onClick={() => {
                  completeLogout.mutate();
                }}
                className=" flex justify-start text-gray-600 dark:text-gray-400 text-[16px] px-4  h-[48px] items-center gap-2"
              >
                <FiLogOut className="text-gray-600 dark:text-gray-400 text-[20px]" />
                {completeLogout.isPending ? (
                  <ClipLoader color="#FFFFFF" size={30} />
                ) : (
                  "Log out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
