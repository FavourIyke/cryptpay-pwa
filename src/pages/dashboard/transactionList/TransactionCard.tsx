import React from "react";
import {
  depositIcon,
  depositIconLight,
  naijaLogo,
  withdrawIcon,
  withdrawIconLight,
} from "../../../assets/images";
import { useUser } from "../../../context/user-context";

const TransactionCard = ({
  type,
  status,
  nairaAmount,
  coinAmount,
  coin,
  onClick,
}: any) => {
  const { theme } = useUser();
  return (
    <div
      onClick={onClick}
      className="font-sora cursor-pointer w-full flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-[32px] h-[32px] bg-white rounded-full ">
          {theme === "dark" ? (
            <img src={naijaLogo} alt="" className="w-full h-full bg-cover" />
          ) : (
            <img src={naijaLogo} alt="" className="w-full h-full bg-cover" />
          )}
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white  text-[14px]">Payout</h4>
          <div
            className={`  rounded-md flex mt-1 justify-start items-center bg-opacity-30 dark:bg-opacity-10 ${
              // status === "Successful"
              //   ? "bg-success_green "
              //   : status === "Pending"
              //   ? "bg-pending"
              //   : status === "Failed"
              //   ? "bg-red-500"
              //   : ""

              ""
            }`}
          >
            {/* <div
              className={`w-[6px] h-[6px] rounded-full  ${
                // status === "Successful"
                //   ? "dark:bg-success_green bg-[#0E871D]"
                //   : status === "Pending"
                //   ? "dark:bg-pending bg-[#DD900D]"
                //   : status === "Failed"
                //   ? "bg-red-500"
                //   : ""
                ""
              }
              `}
            /> */}
            <h4
              className={`${
                status === "Successful"
                  ? "dark:text-success_green text-[#0E871D]"
                  : status === "Pending"
                  ? "dark:text-pending text-[#DD900D]"
                  : status === "Failed"
                  ? "text-red-500"
                  : ""
              } text-[12px]`}
            >
              {status}
            </h4>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-black dark:text-white text-right font-medium text-[15px]">
          ₦{nairaAmount.toLocaleString("en-US")}
        </h4>
        <h4 className="text-gray-400 dark:text-gray-500 text-right mt-1 text-[14px]">
          3:15pm
        </h4>
      </div>
    </div>
  );
};

export default TransactionCard;
