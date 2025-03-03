import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import SidePage from "./SidePage";
import MainPage from "./MainPage";
import { paddingX } from "../../constants";
import AddAssets from "./AddAssets";
import KycModal from "../dashboard/KycModal";
import Kyc2Modal from "../dashboard/Kyc2Modal";

const Wallet = () => {
  const [sidePage, setSidePage] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(0);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [coinDetails, setCoinDetails] = useState<any[]>([]);
  const [kycModal, setKycModal] = useState<boolean>(false);
  const [kyc2Modal, setKyc2Modal] = useState<boolean>(false);

  return (
    <div className="lgss:flex font-manrope  lgss:flex-row h-screen lgss:h-screen bg-[#F7F8F9]   dark:bg-primary_dark">
      <Sidebar />
      <div
        className={`w-full  lgss:w-[80%] font-sora h-screen overflow-auto pb-16  bg-white dark:bg-primary_dark `}
      >
        <Navbar />

        <div className={`${paddingX} w-full mt-12 lgss:flex lgss:gap-12  `}>
          {sidePage ? (
            <div className="w-full lgss:hidden mds:px-4">
              <SidePage
                setSidePage={setSidePage}
                screen={screen}
                setScreen={setScreen}
                coinDetails={coinDetails}
              />
            </div>
          ) : (
            <div className="w-full lgss:hidden ">
              <MainPage
                setOpenAddModal={setOpenAddModal}
                setScreen={setScreen}
                setSidePage={setSidePage}
                setCoinDetails={setCoinDetails}
                setKycModal={setKycModal}
                setKyc2Modal={setKyc2Modal}
              />
            </div>
          )}
          <div className="hidden lgss:flex lgss:w-1/2 lg:w-[55%]">
            <MainPage
              setOpenAddModal={setOpenAddModal}
              setScreen={setScreen}
              setSidePage={setSidePage}
              setCoinDetails={setCoinDetails}
              setKycModal={setKycModal}
              setKyc2Modal={setKyc2Modal}
            />
          </div>
          <div className="hidden lgss:flex lgss:w-1/2 lg:w-[45%] bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-xl p-6">
            <SidePage
              screen={screen}
              setSidePage={setSidePage}
              setScreen={setScreen}
              coinDetails={coinDetails}
            />
          </div>
        </div>
      </div>{" "}
      {kycModal && <KycModal setKycModal={setKycModal} />}
      {openAddModal && <AddAssets setOpenAddModal={setOpenAddModal} />}
      {kyc2Modal && <Kyc2Modal setKyc2Modal={setKyc2Modal} />}
    </div>
  );
};

export default Wallet;
