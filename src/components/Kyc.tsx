import React, { useState } from "react";
import AuthNav from "./AuthNav";
import "@smile_identity/smart-camera-web";
import SmartCameraComponent from "./SmartCamera";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { validateBvn } from "../utils/validations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { errorMessage } from "../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheckCircle } from "react-icons/fa";

const Kyc = () => {
  const [partnerParams, setPartnerParams] = useState<string>("");
  const navigate = useNavigate();
  const [images, setImages] = useState<
    { image_type_id: number; image: string }[]
  >([]);

  const [bvn, setBvn] = useState<string>("");
  const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
  const [submit, setSubmit] = useState(0);
  const axiosInstance = useAuthAxios();
  const handlePostKyc = async (data: any) => {
    const response = await axiosInstance.post(API.verifyKyc, data);
    return response.data;
  };
  const completeKyc = useMutation({
    mutationFn: handlePostKyc,
    onSuccess: (r) => {
      toast.success(r.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });

  const handleVerify = () => {
    if (!validateBvn(bvn)) {
      return;
    }
    setIsImageCaptured(true);
  };
  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 overflow-auto bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-[96%] mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-4 mds:p-6  dark:bg-[#1F1F1F] mt-6 lgss:mt-12   `}
      >
        <Link to="/dashboard" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Skip
          </h4>
        </Link>

        {submit === 1 ? (
          <div>
            <div className="mt-8 flex flex-col px-8 justify-center items-center ">
              <FaCheckCircle className="text-text_blue text-[44px]" />
              <h4 className="text-gray-800 dark:text-gray-100 text-center mt-4 font-semibold text-[20px]">
                Selfie capture complete
              </h4>
              <h4 className="text-gray-700 dark:text-gray-400 text-center  font-medium text-[14px]">
                Your selfie was successfully taken, you can now proceed.
              </h4>
            </div>
            <button
              onClick={() => {
                const data = {
                  id_number: bvn,
                  liveliness_image: images,
                };
                // console.log(data);
                completeKyc.mutate(data);
              }}
              disabled={!bvn}
              className={`w-full h-[52px] rounded-[18px] mt-12 ${
                !bvn
                  ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                  : "bg-text_blue text-white"
              }  flex justify-center items-center  font-semibold`}
            >
              {completeKyc.isPending ? (
                <ClipLoader color="#FFFFFF" size={30} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        ) : (
          <div className="w-full mt-6 ">
            <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
              Verify
            </h4>
            <div className="w-full mt-8">
              <label className="text-gray-800 text-[14px]  dark:text-white">
                BVN Number
              </label>
              <input
                type="number"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                placeholder="Enter your BVN"
                className="w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
              />
              <h4 className="text-gray-800 dark:text-gray-300  text-[11px] mt-2">
                Dial *565*0# to check for your BVN
              </h4>
            </div>

            {isImageCaptured && (
              <SmartCameraComponent
                setIsImageCaptured={setIsImageCaptured}
                setSubmit={setSubmit}
                setPartnerParams={setPartnerParams}
                setImages={setImages}
              />
            )}

            <button
              onClick={() => {
                if (submit === 0) {
                  handleVerify();
                }
              }}
              disabled={!bvn}
              className={`w-full h-[52px] rounded-[18px] mt-8 ${
                !bvn
                  ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
                  : "bg-text_blue text-white"
              }  flex justify-center items-center  font-semibold`}
            >
              {submit === 0 ? " Next" : "Submit"}
            </button>
          </div>
        )}
        <h4 className="text-[14px] mt-8 text-gray-800 text-center dark:text-gray-300 font-medium">
          I will do this later{" "}
          <Link to="/dashboard" className="text-text_blue">
            Skip
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Kyc;
