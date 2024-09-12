import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { btc, feedback } from "../../../assets/images";
import { RxUpload } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";

const UserFeedback = ({ setSupportMode }: any) => {
  const [feedbackNo, setFeedbackNo] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string | any>("");
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState<any>();

  //    const [disabled, setDisabled] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = event.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const csv: string | ArrayBuffer | null = reader.result;
      if (typeof csv === "string") {
        setImage(csv);
        setImages([...images, csv]);
      }
    };
    reader.readAsDataURL(uploadedImage);
  };
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="w-full font-sora">
      <button
        onClick={() => {
          setSupportMode(1);
        }}
        className=" flex items-center gap-2 "
      >
        <SlArrowLeft className="dark:text-[#D8D8D8] text-gray-800 text-[12px]" />
        <h4 className="dark:text-[#D8D8D8] text-gray-800 text-[14px]">Back</h4>
      </button>
      <h4 className="text-gray-800 dark:text-gray-100 mt-12 lgss:mt-8 font-semibold text-[18px]">
        User Feedback
      </h4>
      <h4 className="text-gray-500 dark:text-gray-400 mt-2  font-medium text-[14px]">
        Got an idea to elevate CryptPay? Share it with us and help shape the
        future!
      </h4>
      <div className="w-full overflow-auto lgss:h-[600px]">
        <div className="w-full flex justify-center items-center">
          <img src={feedback} alt="" />
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 font-medium text-[14px]">
          How likely are you to recommend Cryptpay to your Family and Friends
        </h4>
        <div className="grid grid-cols-5 mt-4 gap-4">
          {Array.from({ length: 10 }).map((_, num) => (
            <div
              key={num + 1}
              onClick={() => setFeedbackNo(num + 1)}
              className={
                feedbackNo === num + 1
                  ? "px-1 py-2 rounded-xl flex justify-center items-center bg-text_blue text-gray-200"
                  : "px-1 py-2 rounded-xl flex justify-center items-center border border-gray-300 text-gray-800 dark:border-gray-400 dark:text-gray-400"
              }
            >
              {num + 1}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 items-center">
          <h4 className="text-gray-500 dark:text-gray-400 mt-2  font-medium text-[12px]">
            1 - Not Likely at all
          </h4>
          <h4 className="text-gray-500 dark:text-gray-400 mt-2  font-medium text-[12px]">
            10 - Extremely Likely
          </h4>
        </div>
        <h4 className="text-gray-800 dark:text-gray-100 mt-3 font-medium text-[14px]">
          Please share the reason for your rating. Let us know what you love
          about CryptPay or where we can improve.
        </h4>
        <div className="w-full mt-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
            className="w-full dark:text-gray-400 text-gray-800  dark:border-gray-400 bg-[#FAFAFA] dark:bg-transparent h-[100px] pt-2 mt-2   outline-none text-[14px] border border-gray-300 bg-transparent px-4 spin-button-none rounded-xl "
          />
        </div>
        <div className="mt-4 flex justify-between gap-4 items-center">
          <div className="">
            <label
              htmlFor="image-upload"
              className="cursor-pointer px-3 py-3 flex justify-center items-center gap-2 rounded-xl border border-gray-300 text-gray-500  dark:border-gray-600 dark:text-gray-100 text-[12px] font-medium"
            >
              <RxUpload className="text-[16px] dark:text-gray-100 text-gray-500" />
              Upload
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              accept="image/*"
              className="absolute w-40 top-4 left-3 opacity-0 bg-red-700 h-20"
            />
          </div>
          <h4 className="text-gray-500 dark:text-gray-400  font-medium text-[12px]">
            Upload any attachments you have (Optional)
          </h4>
        </div>
        {images.length >= 1 && (
          <div className="w-full grid grid-cols-3 mds:grid-cols-5 lgss:grid-cols-3 mt-4 h-[170px] overflow-auto  gap-5">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setImage(img);
                  setIndex(index);
                }}
                className="h-[80px] rounded-lg flex  relative justify-center items-center"
              >
                <img
                  src={img}
                  className="w-full h-full bg-cover rounded-lg"
                  alt=""
                />
                <IoCloseCircleOutline
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 text-gray-400 cursor-pointer text-[20px]"
                />
              </div>
            ))}
          </div>
        )}
        <button className="w-full bg-text_blue mt-10 h-[44px] rounded-xl text-[14px] font-semibold text-white">
          Send message
        </button>
      </div>
    </div>
  );
};

export default UserFeedback;
