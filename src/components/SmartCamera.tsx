import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface SmartCameraComponentProps {
  setIsImageCaptured: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmit: React.Dispatch<React.SetStateAction<number>>;
  setPartnerParams: any;
  setImages: any;
}

const SmartCameraComponent: React.FC<SmartCameraComponentProps> = ({
  setIsImageCaptured,
  setSubmit,
  setPartnerParams,
  setImages,
}) => {
  useEffect(() => {
    const handleImagesComputed = async (e: Event) => {
      const customEvent = e as CustomEvent;

      const { partner_params, images } = customEvent.detail;
      setPartnerParams(partner_params.libraryVersion);

      setImages(images);
      // Update the state to indicate that the image has been captured
      setIsImageCaptured(false);
      setSubmit(1);
    };

    const app = document.querySelector("smart-camera-web");
    if (app) {
      app.addEventListener(
        "imagesComputed",
        handleImagesComputed as EventListener
      );
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (app) {
        app.removeEventListener(
          "imagesComputed",
          handleImagesComputed as EventListener
        );
      }
    };
  }, []);

  return (
    <div className="bg-white w-full fixed flex flex-col justify-start items-center pt-20 inset-0 top-20 dark:bg-primary_dark backdrop-blur-sm">
      <div className="flex w-10/12 mds:w-8/12 md:7/12   lgss:w-2/5 xxl:w-1/3  justify-end mb-6  items-center">
        {/* <IoIosArrowBack
          onClick={() => {
            setOpenLinksModal(false);
            setOpenDownloadModal(true);
          }}
          className="text-paragraph text-[18px] dark:text-white cursor-pointer"
        /> */}
        <IoClose
          onClick={() => setIsImageCaptured(false)}
          className="text-paragraph text-[24px] dark:text-white cursor-pointer"
        />
      </div>
      <div className="bg-white border w-10/12 mds:w-8/12 md:7/12 border-gray-400 rounded-xl py-12  lgss:w-2/5 xxl:w-1/3  flex justify-center items-center">
        <smart-camera-web></smart-camera-web>
      </div>
    </div>
  );
};

export default SmartCameraComponent;
