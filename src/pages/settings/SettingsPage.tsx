import React, { useEffect, useState } from "react";
import { paddingX } from "../../constants";
import Navbar from "../../components/Navbar";
import SidePage from "./SidePage";
import MainPage from "./MainPage";
import LogoutModal from "./LogoutModal";
import { useLocation, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [sidePage, setSidePage] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(0);
  const [logout, setLogout] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openKyc2, setOpenKyc2] = useState<boolean>(false);

  const setScreenn = location.state?.setScreen;
  const setSureScreenn = location.state?.sureScreen;

  useEffect(() => {
    if (setScreenn) {
      setSidePage(true);
      setScreen(setScreenn);
    }
  }, [setScreenn]);
  useEffect(() => {
    if (setSureScreenn) {
      setSidePage(true);
      setScreen(setSureScreenn);
      // Clear location.state to prevent re-triggering on refresh
      navigate("/settings", { replace: true, state: {} });
    }
  }, [navigate, setSureScreenn]);
  return (
    <div
      className={` w-full font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
    >
      <Navbar />
      <div className={`${paddingX} w-full mt-12 lgss:flex lgss:gap-12 `}>
        {sidePage ? (
          <div className="w-full lgss:hidden mds:px-4">
            <SidePage
              setSidePage={setSidePage}
              screen={screen}
              setScreen={setScreen}
              openKyc2={openKyc2}
              setOpenKyc2={setOpenKyc2}
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
            openKyc2={openKyc2}
            setOpenKyc2={setOpenKyc2}
          />
        </div>
      </div>
      {logout && <LogoutModal setLogout={setLogout} />}
    </div>
  );
};

export default SettingsPage;
