import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { SlArrowLeft } from "react-icons/sl";
import { avatar } from "../../../assets/images";
import { FaCamera } from "react-icons/fa6";
import { validateSaveDetails } from "../../../utils/validations";
import { useUser } from "../../../context/user-context";
import { convertDateFormat } from "../../../utils/formatDate";

const EditProfile = ({ setSidePage, setScreen }: any) => {
  const { userDetails } = useUser();

  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleImageChoice = () => {
    const userChoice = window.confirm("Would you like to take a selfie?");
    if (userChoice) {
      setShowWebcam(true);
    } else {
      document.getElementById("fileInput")?.click();
    }
  };
  console.log(userDetails);
  const handleCapture = () => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImageSrc(image);
      setShowWebcam(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
        // console.log(fileReader.result); // Log the result here
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleSave = () => {
    if (!validateSaveDetails(username, fullName)) {
      return;
    }
  };
  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSidePage(false);
          setScreen(0);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        Edit Profile
      </h4>
      {showWebcam ? (
        <div className="w-full mt-4 flex flex-col justify-center items-center gap-4">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button
            onClick={handleCapture}
            className="mt-2 text-white p-2 bg-text_blue rounded-xl text-[14px] font-medium"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="flex justify-start mt-6 items-end">
          <div
            className={
              imageSrc
                ? "w-[90px] h-[80px] rounded-full"
                : "w-[88px] h-[88px] rounded-full"
            }
          >
            <img
              src={imageSrc ? imageSrc : avatar}
              alt=""
              className="w-full h-full rounded-full obj-cover"
            />
          </div>

          {/* <div
            onClick={handleImageChoice}
            className="w-[32px] h-[32px] relative right-5 flex justify-center items-center cursor-pointer rounded-full dark:bg-[#424242]  bg-text_blue text-white text-[16px]"
          >
            <FaCamera />
          </div> */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      )}
      <div className="w-full mt-8">
        <div className="w-full ">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={userDetails?.data?.profile.username}
            className={
              username
                ? "w-full dark:text-white border-text_blue text-gray-800   bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border  bg-transparent px-4 spin-button-none rounded-xl "
                : "w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            }
          />
        </div>
        <div className="w-full mt-6">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Full Name
          </label>
          <div className="w-full  mt-2  h-[52px] flex justify-start items-center dark:text-gray-500 text-gray-600 outline-none text-[14px] bg-[#D2D2D2] dark:bg-[#2B2B2B] bg-transparent px-4  rounded-xl ">
            {userDetails?.data?.profile.first_name}{" "}
            {userDetails?.data?.profile.last_name}
          </div>
        </div>
        <div className="w-full mt-6 ">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Email
          </label>
          <div className="w-full  mt-2  h-[52px] flex justify-start items-center dark:text-gray-500 text-gray-600 outline-none text-[14px] bg-[#D2D2D2] dark:bg-[#2B2B2B] bg-transparent px-4  rounded-xl ">
            {userDetails?.data?.profile.email}
          </div>
        </div>
        <div className="w-full mt-6">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Phone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={
              userDetails?.data?.profile.phone_number
                ? userDetails?.data?.profile.phone_number
                : "Enter your phone number"
            }
            className={
              phone
                ? "w-full dark:text-white border-text_blue text-gray-800   bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border  bg-transparent px-4 spin-button-none rounded-xl "
                : "w-full dark:text-white focus:border-text_blue dark:focus:border-text_blue text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[52px] mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
            }
          />
        </div>
        <div className="w-full mt-6 ">
          <label className="text-gray-800 text-[14px]  dark:text-white">
            Date of Birth
          </label>
          <div className="w-full  mt-2  h-[52px] flex justify-start items-center dark:text-gray-500 text-gray-600 outline-none text-[14px] bg-[#D2D2D2] dark:bg-[#2B2B2B] bg-transparent px-4  rounded-xl ">
            {convertDateFormat(userDetails?.data?.profile.birthday)}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!fullName || !username}
          className={`w-full h-[52px] rounded-[18px] mt-20 lgss:mt-10 ${
            !fullName || !username
              ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
              : "bg-text_blue text-white"
          }  flex justify-center items-center  font-semibold`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
