import React, { useState } from "react";
import { avatar } from "../../assets/images";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiArrowRightCircle, FiClipboard, FiCopy } from "react-icons/fi";
import ButtonConfig from "./ButtonConfig";
import { SlArrowRight } from "react-icons/sl";
import { useUser } from "../../context/user-context";

const MainPage = ({ setScreen, setSidePage, setLogout }: any) => {
  const [onCopyID, setOnCopyID] = useState<boolean>(false);
  const { userDetails } = useUser();

  return (
    <div className="font-sora w-full">
      <div className="w-full rounded-xl h-[160px] bg-[#F1F1F1] dark:bg-[#1F1F1F] flex flex-col  items-center justify-center p-4 ">
        <div className="w-[36px] h-[36px] rounded-full">
          <img src={avatar} alt="" className="w-full h-full bg-cover" />
        </div>
        <h4 className="text-[14px] font-medium text-gray-800 mt-2 dark:text-white ">
          {userDetails?.data?.profile.first_name}{" "}
          {userDetails?.data?.profile.last_name}
        </h4>
        <div className="flex items-center mt-1 gap-2">
          <h4 className="text-[10px]  text-gray-500 dark:text-gray-300 ">
            User ID: {userDetails?.data?.profile.username}
          </h4>
          <CopyToClipboard
            text={userDetails?.data?.profile.username}
            onCopy={() => {
              setOnCopyID(true);
              setTimeout(() => {
                setOnCopyID(false);
              }, 2500);
            }}
          >
            {onCopyID ? (
              <FiClipboard className="text-[12px] text-gray-500 dark:text-gray-300" />
            ) : (
              <FiCopy className="text-[12px] text-gray-500 dark:text-gray-300" />
            )}
          </CopyToClipboard>
        </div>

        <button
          onClick={() => {
            setSidePage(true);
            setScreen(1);
          }}
          className="mt-4  text-[#3A66FF] text-[11px]"
        >
          Edit Profile
        </button>
      </div>
      <div className="mt-12 w-full">
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Account Verification"
          number={2}
          subtext="Complete account verification"
        />
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Bank details"
          number={3}
          subtext="View your payout bank accounts"
        />
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Referrals"
          number={4}
          subtext="Earn commissions for inviting friends"
        />
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Preference"
          number={5}
          subtext="More Configuration options"
        />
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Security"
          number={6}
          subtext="Protect yourself from intruders"
        />
        <ButtonConfig
          setScreen={setScreen}
          setSidePage={setSidePage}
          name="Support Center"
          number={7}
          subtext="Reach out to support and FAQs"
        />
      </div>
      <button
        onClick={() => {
          setLogout(true);
        }}
        className="w-full flex justify-between items-center px-4 mt-12 bg-transparent"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full bg-[#DD524D] dark:text-gray-800  text-white">
            <FiArrowRightCircle className="text-[16px] text-white " />
          </div>
          <div>
            <h4 className="dark:text-gray-50 text-gray-800 text-[14px]">
              Logout
            </h4>
          </div>
        </div>
        <SlArrowRight className="text-gray-400 dark:text-gray-200 text-[15px]" />
      </button>
    </div>
  );
};

export default MainPage;
