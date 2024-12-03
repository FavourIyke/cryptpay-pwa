import React from "react";
import { avatar, logo, notify } from "../assets/images";
import { paddingX } from "../constants";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/user-context";
import NotificationModal from "./NotificationModal";
import { useQuery } from "@tanstack/react-query";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
  const { userDetails, isNotified, setIsNotified } = useUser();
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
        <button className="w-[32px] relative h-[32px] bg-[#313131] rounded-full flex justify-center items-center">
          <img
            src={notify}
            onClick={() => setIsNotified((prev: any) => !prev)}
            className="cursor-pointer"
            alt=""
          />
          {notificationsData?.data?.total >= 1 && (
            <div className="bell-light absolute top-0 animate-pulse -right-[1px] w-2 h-2 bg-text_blue rounded-full" />
          )}
        </button>
      </div>
      {isNotified && (
        <NotificationModal
          setIsNotified={setIsNotified}
          unreadNo={notificationsData?.data?.total}
        />
      )}
    </div>
  );
};

export default Navbar;
