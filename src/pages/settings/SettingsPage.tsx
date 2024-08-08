import React, { useState } from "react";
import { paddingX } from "../../constants";
import Navbar from "../../components/Navbar";
import SidePage from "./SidePage";
import MainPage from "./MainPage";
import LogoutModal from "./LogoutModal";

const SettingsPage = () => {
  const [sidePage, setSidePage] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(0);
  const [logout, setLogout] = useState<boolean>(false);
  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <Navbar />
      <div className={`${paddingX} w-full mt-12 lgss:flex lgss:gap-12 `}>
        {sidePage ? (
          <div className="w-full lgss:hidden mds:px-4">
            <SidePage
              setSidePage={setSidePage}
              screen={screen}
              setScreen={setScreen}
            />
          </div>
        ) : (
          <div className="w-full lgss:hidden ">
            <MainPage
              setScreen={setScreen}
              setSidePage={setSidePage}
              setLogout={setLogout}
            />
          </div>
        )}
        <div className="hidden lgss:flex lgss:w-1/2 lg:w-3/5">
          <MainPage
            setScreen={setScreen}
            setSidePage={setSidePage}
            setLogout={setLogout}
          />
        </div>
        <div className="hidden lgss:flex lgss:w-1/2 lg:w-2/5 bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-xl p-6">
          <SidePage
            screen={screen}
            setSidePage={setSidePage}
            setScreen={setScreen}
          />
        </div>
      </div>
      {logout && <LogoutModal setLogout={setLogout} />}
    </div>
  );
};

export default SettingsPage;
