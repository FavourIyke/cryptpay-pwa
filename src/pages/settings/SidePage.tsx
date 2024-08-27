import React, { useState } from "react";
import { cryptpay, darkCrypt } from "../../assets/images";
import { useUser } from "../../context/user-context";
import EditProfile from "./sideScreens/EditProfile";
import Preference from "./sideScreens/Preference";
import Mode from "./sideScreens/Mode";
import CurrencyChange from "./sideScreens/CurrencyChange";
import Referral from "./sideScreens/Referral";
import InvitedFriends from "./sideScreens/InvitedFriends";
import Leaderboard from "./sideScreens/Leaderboard";
import Security from "./sideScreens/Security";
import TransactionPin from "./sideScreens/TransactionPin";

const SidePage = ({ setSidePage, setScreen, screen }: any) => {
  const { theme } = useUser();
  const [mode, setMode] = useState<number>(1);
  const [secScreen, setSecScreen] = useState<number>(1);
  const [refMode, setRefMode] = useState<number>(1);
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

  return (
    <div className="w-full font-sora ">
      {screen === 0 ? (
        <div className="w-full flex flex-col h-full px-12   justify-center items-center">
          <img src={getThemeBasedImage()} alt="" />
          <h4 className="text-[14px] mt-10 text-center text-gray-800 dark:text-gray-500">
            Click on one of the contents on the side profile to see full view
          </h4>
        </div>
      ) : (
        <div className="w-full">
          {screen === 1 ? (
            <EditProfile setSidePage={setSidePage} setScreen={setScreen} />
          ) : screen === 5 ? (
            <div className="">
              {mode === 1 ? (
                <Preference
                  setSidePage={setSidePage}
                  setScreen={setScreen}
                  setMode={setMode}
                />
              ) : mode === 2 ? (
                <Mode setMode={setMode} />
              ) : mode === 3 ? (
                <CurrencyChange setMode={setMode} />
              ) : null}
            </div>
          ) : screen === 6 ? (
            <div className="">
              {secScreen === 1 ? (
                <Security
                  setSidePage={setSidePage}
                  setScreen={setScreen}
                  setSecScreen={setSecScreen}
                />
              ) : secScreen === 2 ? (
                <TransactionPin setSecScreen={setSecScreen} />
              ) : secScreen === 3 ? (
                <div></div>
              ) : null}
            </div>
          ) : screen === 4 ? (
            <div>
              {refMode === 1 ? (
                <Referral
                  setSidePage={setSidePage}
                  setScreen={setScreen}
                  setRefMode={setRefMode}
                />
              ) : refMode === 2 ? (
                <InvitedFriends setRefMode={setRefMode} />
              ) : refMode === 3 ? (
                <Leaderboard setRefMode={setRefMode} />
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SidePage;
