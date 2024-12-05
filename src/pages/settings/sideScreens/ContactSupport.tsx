import React, { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useUser } from "../../../context/user-context";

const ContactSupport = ({ setSupportMode }: any) => {
  const { userDetails } = useUser();
  const [fullName, setFullName] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSupportMode(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Contact Support
      </h4>
      <h4 className="text-gray-500 dark:text-white mt-2  font-medium text-[14px]">
        Contact us through the platforms below, and our team will reach out to
        you shortly.
      </h4>
      <div className="w-full mt-8 overflow-auto lgss:h-[600px]">
        <div className="p-4 rounded-xl w-full dark:bg-[#282828] bg-[#dfdede]">
          <button className="w-full flex  justify-between items-center  bg-transparent">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <BiSupport className="text-[16px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-600 text-left dark:text-white text-[12px]">
                  Phone Number
                </h4>
                <h4 className="text-gray-800  dark:text-gray-50 text-left text-[14px]">
                  +2349160805210
                </h4>
              </div>
            </div>
          </button>
          <button className="w-full flex mt-4 justify-between items-center  bg-transparent">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center  w-[32px] h-[32px] rounded-full dark:bg-gray-200 dark:text-gray-800 bg-text_blue text-white">
                <BiSupport className="text-[16px] text-white dark:text-gray-800" />
              </div>
              <div>
                <h4 className="text-gray-600 text-left dark:text-white text-[12px]">
                  Email Address
                </h4>
                <a
                  href="mailto:help.cryptpay.co"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-800  underline dark:text-gray-50 text-left text-[14px]"
                >
                  support@cryptpay.co
                </a>
              </div>
            </div>
          </button>
        </div>
        {/* <h4 className="text-gray-800 dark:text-gray-100 mt-4 lgss:mt-8 font-semibold text-[17px]">
          Quick Contact
        </h4>
        <div className="w-full mt-6">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Username
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            className="w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 rounded-xl "
          />
        </div>
        <div className="w-full mt-6 ">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Email
          </label>
          <div className="w-full  mt-2  h-[52px] flex justify-start items-center dark:text-gray-500 text-gray-600 outline-none text-[14px] bg-[#D2D2D2] dark:bg-[#2B2B2B] bg-transparent px-4  rounded-xl ">
            {userDetails?.data?.profile.email}
          </div>
        </div>
        <div className="w-full mt-6">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Complaint Header
          </label>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Enter Header for your complaint"
            className="w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
          />
        </div>
        <div className="w-full mt-6">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
            className="w-full dark:text-white text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[100px] pt-2 mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
          />
        </div>
        <button className="w-full bg-text_blue mt-10 h-[44px] rounded-xl text-[14px] font-semibold text-white">
          Send message
        </button> */}
      </div>
    </div>
  );
};

export default ContactSupport;
