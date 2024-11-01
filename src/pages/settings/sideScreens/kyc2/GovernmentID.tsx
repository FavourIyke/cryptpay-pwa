import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import { API } from "../../../../constants/api";
import { errorMessage } from "../../../../utils/errorMessage";
import useAuthAxios from "../../../../utils/baseAxios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const GovernmentID = ({
  setOpenGovId,
  setOpenSuccess,
  idNumber,
  setIdNumber,
  base64Image,
  setBase64Image,
  tier,
  setOpenPOAId,
}: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const axiosInstance = useAuthAxios();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setImage(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(selectedFile); // Convert image to Base64
    }
  };

  const handlePostKyc2 = async (data: any) => {
    const response = await axiosInstance.post(API.verifyKyc2, data);
    return response.data;
  };
  const completeKyc = useMutation({
    mutationFn: handlePostKyc2,
    onSuccess: (r) => {
      console.log(r);
      toast.success(r.message);
      setTimeout(() => {
        setOpenGovId(false);
        setOpenSuccess(true);
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });

  return (
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-12 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <button
          onClick={() => {
            setOpenGovId(false);
          }}
          className=" flex items-center gap-2 "
        >
          <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
          <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">
            Back
          </h4>
        </button>
        <div className="w-full mt-8">
          <h4 className="text-gray-800 dark:text-gray-100  font-semibold text-[18px]">
            Government ID Upload
          </h4>
          <h4 className="text-gray-800 dark:text-gray-100 mt-2  font-medium text-[14px]">
            Upload an official Government ID for identity verification.
          </h4>
        </div>
        <div className="w-full mt-10">
          <div className="w-full">
            <label className="text-gray-800 text-[14px]  dark:text-white">
              ID Number
            </label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter ID Number"
              className="w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            />
          </div>
          <h4 className="text-gray-800 text-[14px]  dark:text-white mt-6">
            Upload Document
          </h4>
          <div className="flex w-full h-[230px] rounded-xl relative border-dashed mt-4 border border-text_blue justify-center items-center flex-col">
            {image && openImage ? (
              <div className="w-full h-full">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-contain rounded-xl"
                  alt=""
                />
                <div className="absolute p-1 top-1 right-2 flex justify-center items-center rounded-[10px]">
                  <IoClose
                    onClick={() => setOpenImage(false)}
                    className="text-[18px] text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-gray-800 text-[12px]  dark:text-white ">
                  Drag and drop pictures here
                </h4>
                <div className="relative inline-block mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <button className="px-4 py-3  text-white rounded-xl bg-text_blue text-[14px] font-medium">
                      Upload File
                    </button>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    onChange={handleImageUpload}
                    // style={{ display: "none" }}
                    accept="image/*"
                    className="absolute w-24 left-1  opacity-0 "
                  />
                </div>
              </>
            )}
          </div>
          {image && (
            <div className="p-4 rounded-xl gap-4 bg-[#ececec] dark:bg-[#262626] mt-8 flex justify-between items-center">
              <div className="w-1/3 h-[80px] rounded-xl">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full rounded-xl object-cover"
                  alt=""
                />
              </div>
              <div className="w-2/3 flex flex-col gap-2 items-start">
                <div className="w-full flex justify-between items-center">
                  <h4 className="font-semibold w-4/5 text-gray-900 dark:text-white overflow-hidden whitespace-nowrap text-[13px]">
                    {image.name}
                  </h4>
                  <GoTrash
                    onClick={() => setImage(null)}
                    className="text-[18px] text-gray-900 dark:text-white"
                  />
                </div>
                <h4 className=" w-4/5 text-gray-500 dark:text-gray-400 overflow-hidden text-[13px]">
                  {(image.size / 1024).toFixed(2)} KB
                </h4>
                <button
                  onClick={() => setOpenImage(true)}
                  className="underline text-[12px] text-[#3A66FF] font-semibold"
                >
                  Click to view
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            const data = {
              government_id: base64Image,
              id_number: idNumber,
            };
            if (tier === 1) {
              completeKyc.mutate(data);
            } else if (tier === 2) {
              setOpenGovId(false);
              setOpenPOAId(true);
            }
          }}
          disabled={!idNumber || !image}
          className={
            !idNumber || !image
              ? "w-full h-[48px] bg-gray-400 rounded-xl font-medium text-gray-200 text-[15px] mt-16"
              : "w-full h-[48px] bg-text_blue rounded-xl font-medium text-white text-[15px] mt-16"
          }
        >
          {completeKyc.isPending ? (
            <ClipLoader color="#FFFFFF" size={30} />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default GovernmentID;
