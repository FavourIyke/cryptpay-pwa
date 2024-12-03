import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { SlArrowLeft } from "react-icons/sl";
import ClipLoader from "react-spinners/ClipLoader";
import useAuthAxios from "../../../../utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../../../constants/api";
import { errorMessage } from "../../../../utils/errorMessage";

const HouseAddy = ({
  idNumber,
  base64Image,
  setOpenSuccess,
  setOpenPOAId,
  setOpenGovId,
  level,
  idType,
}: any) => {
  const [base64ImageHouse, setBase64ImageHouse] = useState<string | null>(null);

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
        setBase64ImageHouse(base64String);
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
      toast.success(r.message);
      setTimeout(() => {
        setOpenPOAId(false);
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
    <div className="fixed inset-0  flex font-sora justify-start items-start pt-12 overflow-auto pb-16 bg-white dark:bg-primary_dark   backdrop-blur-sm">
      <div
        className={` w-11/12 mds:w-8/12 md:7/12 border dark:border-[#303030] border-[#E6E6E6]  rounded-xl mx-auto p-6 dark:bg-[#1F1F1F]   lgss:w-2/5 xxl:w-1/3 `}
      >
        <button
          onClick={() => {
            setOpenPOAId(false);
            setOpenGovId(true);
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
            House Address Upload
          </h4>
          <h4 className="text-gray-800 dark:text-gray-100 mt-2  font-medium text-[14px]">
            Upload a document showing your registered residential address.
          </h4>
        </div>
        <div className="w-full mt-10">
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
              proof_of_address: base64ImageHouse,
              id_type: idType,
              id_number: idNumber,
            };
            const data2 = {
              proof_of_address: base64ImageHouse,
            };

            completeKyc.mutate(level === "201" ? data2 : data);
          }}
          disabled={!image}
          className={
            !image
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

export default HouseAddy;
