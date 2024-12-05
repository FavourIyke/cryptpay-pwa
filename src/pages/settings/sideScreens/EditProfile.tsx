import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { SlArrowLeft } from "react-icons/sl";
import { avatar } from "../../../assets/images";
import { useUser } from "../../../context/user-context";
import { convertDateFormat } from "../../../utils/formatDate";
import useAuthAxios from "../../../utils/baseAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "../../../constants/api";
import { errorMessage } from "../../../utils/errorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const EditProfile = ({ setSidePage, setScreen }: any) => {
  const { userDetails, refetch1, displayColor } = useUser();
  const axiosInstance = useAuthAxios();

  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const queryClient = useQueryClient();
  const handleImageChoice = () => {
    const userChoice = window.confirm("Would you like to take a selfie?");
    if (userChoice) {
      setShowWebcam(true);
    } else {
      document.getElementById("fileInput")?.click();
    }
  };
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, [displayColor]);

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
  const handleUUsername = async (data: any) => {
    const response = await axiosInstance.post(API.updateUsername, data);
    return response.data;
  };
  const completeUUsername = useMutation({
    mutationFn: handleUUsername,
    onSuccess: (r) => {
      toast.success(r.message);
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
      refetch1();
      setTimeout(() => {
        setUsername("");
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const handleUPhone = async (data: any) => {
    const response = await axiosInstance.put(API.updatePhoneNumber, data);
    return response.data;
  };
  const completeUPhone = useMutation({
    mutationFn: handleUPhone,
    onSuccess: (r) => {
      toast.success(r.message);
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
      refetch1();
      setTimeout(() => {
        setPhone("");
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(
        errorMessage((error?.data as any)?.message || String(error?.data))
      );
    },
  });
  const handleSave = () => {
    const updatedFields: { username?: string; phone?: string } = {};

    // Check if the username has been changed and validate its length
    if (username && username !== userDetails?.data?.profile?.username) {
      if (username.length < 3) {
        toast.error("Username must be at least 3 characters long.");
        return;
      }
      updatedFields.username = username;
    }

    // Check if the phone number has been changed and validate its length
    if (phone && phone !== userDetails?.data?.profile?.phone_number) {
      if (phone.length < 11) {
        toast.error("Phone number must be at least 11 digits.");
        return;
      }
      updatedFields.phone = phone.slice(-10);
    }

    // If no fields are updated, return early
    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes detected.");
      return;
    }

    // Make API calls based on updated fields
    if (updatedFields.username) {
      const data = {
        username: updatedFields.username,
      };
      console.log(data);
      completeUUsername.mutate(data);
    }

    if (updatedFields.phone) {
      const data = {
        phone_number: updatedFields.phone,
      };
      // console.log(data);
      completeUPhone.mutate(data);
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
            {userDetails?.data?.profile.first_name ?? "---"}{" "}
            {userDetails?.data?.profile.last_name ?? "---"}
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
            {userDetails?.data?.profile.birthday
              ? convertDateFormat(userDetails?.data?.profile.birthday)
              : "---"}
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            backgroundColor:
              (!username ||
                username === userDetails?.data?.profile?.username) &&
              (!phone || phone === userDetails?.data?.profile?.phone_number)
                ? ""
                : bgColor,
          }}
          disabled={
            (!username || username === userDetails?.data?.profile?.username) &&
            (!phone || phone === userDetails?.data?.profile?.phone_number)
          }
          className={`w-full h-[52px] rounded-[18px] mt-20 lgss:mt-10 ${
            (!username || username === userDetails?.data?.profile?.username) &&
            (!phone || phone === userDetails?.data?.profile?.phone_number)
              ? "dark:text-white dark:bg-gray-600 bg-gray-400 text-gray-100"
              : `${bgColor ? `bg-[${bgColor}]` : "bg-text_blue"} text-white`
          }  flex justify-center items-center  font-semibold`}
        >
          {completeUPhone.isPending || completeUUsername?.isPending ? (
            <ClipLoader color="#FFFFFF" size={30} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
