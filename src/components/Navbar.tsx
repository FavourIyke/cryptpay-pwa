import React, { useEffect, useState } from "react";
import { avatar, logo, notify } from "../assets/images";
import { paddingX } from "../constants";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/user-context";
import NotificationModal from "./NotificationModal";
import { useQuery } from "@tanstack/react-query";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { useAuth } from "../context/auth-context";
import { MdColorLens } from "react-icons/md";
import Colorpalette from "./Colorpalette";

const Navbar = () => {
  const {
    userDetails,
    isNotified,
    setIsNotified,
    displayColor,
    setIsPalette,
    isPalette,
  } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);
  const { token } = useAuth();
  const axiosinstance = useAuthAxios();

  const fetchUnreadNotifications = async () => {
    const response = await axiosinstance.get(API.getUnreadNotifications);
    return response.data;
  };

  const { data: notificationsData } = useQuery({
    queryKey: ["get-unreadNotifications", token],
    queryFn: fetchUnreadNotifications,
    enabled: !!token,
  });
  // console.log(notificationsData);
  return (
    <div
      className={`${paddingX} w-full font-sora py-6  flex justify-between items-center`}
    >
      <NavLink to="/dashboard">
        <img src={logo} alt="" />
      </NavLink>
      <div className="flex gap-3 items-center">
        <NavLink to="/settings">
          <div className="w-[36px] h-[36px] rounded-full">
            <img src={avatar} alt="" className="w-full h-full bg-cover" />
          </div>
        </NavLink>
        <h4 className="mds:flex hidden capitalize text-black dark:text-white text-[14px]">
          Hello, {userDetails?.data?.profile.username}
        </h4>
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
              className={`bell-light absolute top-0 animate-pulse -right-[1px] w-4 h-4 z-10 flex justify-center items-center font-bold text-[9px] text-white ${
                bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
              } rounded-full`}
            >
              {notificationsData?.data?.total}
            </div>
          )}
        </button>
      </div>
      {isNotified && (
        <NotificationModal
          setIsNotified={setIsNotified}
          unreadNo={notificationsData?.data?.total}
        />
      )}
      {isPalette && <Colorpalette setIsPalette={setIsPalette} />}
    </div>
  );
};

export default Navbar;
