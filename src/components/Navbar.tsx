import React from "react";
import { avatar, logo, notify } from "../assets/images";
import { paddingX } from "../constants";

const Navbar = () => {
  return (
    <div
      className={`${paddingX} w-full font-sora py-6  flex justify-between items-center`}
    >
      <img src={logo} alt="" />
      <div className="flex gap-3 items-center">
        <div className="w-[36px] h-[36px] rounded-full">
          <img src={avatar} alt="" className="w-full h-full bg-cover" />
        </div>
        <h4 className="mds:flex hidden text-white text-[14px]">
          Hello, Daniel
        </h4>
        <button className="w-[32px] h-[32px] bg-[#313131] rounded-full flex justify-center items-center">
          <img src={notify} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
