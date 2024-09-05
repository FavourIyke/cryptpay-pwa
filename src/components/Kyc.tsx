import React, { useState } from "react";
import AuthNav from "./AuthNav";
import "@smile_identity/smart-camera-web";
import SmartCameraComponent from "./SmartCamera";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { validateBvn } from "../utils/validations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "../constants/api";
import useAuthAxios from "../utils/baseAxios";
import { errorMessage } from "../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const Kyc = () => {
  const [partnerParams, setPartnerParams] = useState<string>("");
  const navigate = useNavigate();
  const [images, setImages] = useState<
    { image_type_id: number; image: string }[]
  >([]);

  const [bvn, setBvn] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
  const [submit, setSubmit] = useState(0);
  const axiosInstance = useAuthAxios();
  const handlePostKyc = async ({
    id_number,
    last_name,
    liveliness_image,
  }: any) => {
    const response = await axiosInstance.post(API.verifyKyc, {
      id_number,
      last_name,
      liveliness_image,
    });
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
    if (!validateBvn(bvn, surname)) {
      return;
    }
    setIsImageCaptured(true);
  };
  return (
    <div
      className={` w-full font-sora h-screen pb-16 lgss:pb-0 bg-white dark:bg-primary_dark `}
    >
      <AuthNav />
      <div
        className={` w-11/12 mds:w-9/12 md:6/12 lgss:w-1/2 xxl:w-[35%] xxxl:w-[25%] border  dark:border-[#303030] border-[#E6E6E6] rounded-xl mx-auto p-6 dark:bg-[#1F1F1F] mt-12  `}
      >
        <Link to="/dashboard" className="flex items-center gap-2 ">
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Skip
          </h4>
        </Link>
        <h4 className="text-gray-800 dark:text-gray-100 mt-6 font-semibold text-[20px]">
          Verify
        </h4>
        <div className="w-full mt-8">
          <div className="w-full">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              BVN Number
            </label>
            <input
              type="number"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              placeholder="Enter your BVN"
              className="w-full dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            />
            <h4 className="text-gray-800 dark:text-gray-300  text-[11px] mt-2">
              Dial *565*0# to check for your BVN
            </h4>
          </div>
          <div className="w-full mt-6">
            <label className="text-gray-800 text-[14px] dark:text-white">
              Surname
            </label>
            <div className="w-full flex justify-between px-4  items-center dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2 text-[14px] border border-gray-300 bg-transparent  spin-button-none rounded-xl">
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="eg: Chidi"
                className="w-10/12   outline-none bg-transparent "
              />
            </div>
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
              } else if (submit === 1) {
                completeKyc.mutate({
                  id_number: bvn,
                  last_name: surname,
                  liveliness_image: images,
                });
              }
            }}
            disabled={!bvn || !surname}
            className={`w-full h-[52px] rounded-[18px] mt-8 ${
              !bvn || !surname
                ? "dark:text-gray-400 dark:bg-gray-600 bg-gray-400 text-gray-100"
                : "bg-text_blue text-white"
            }  flex justify-center items-center  font-semibold`}
          >
            {submit === 0 ? (
              " Next"
            ) : submit === 1 && completeKyc.isPending ? (
              <ClipLoader color="#FFFFFF" size={30} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
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
