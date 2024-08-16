import React, { useEffect } from "react";

interface SmartCameraComponentProps {
  setIsImageCaptured: React.Dispatch<React.SetStateAction<boolean>>;
}

const SmartCameraComponent: React.FC<SmartCameraComponentProps> = ({
  setIsImageCaptured,
}) => {
  useEffect(() => {
    const handleImagesComputed = async (e: Event) => {
      const customEvent = e as CustomEvent;

      const { partner_params, images } = customEvent.detail;

      // Log the partner params
      console.log("Partner Params:", partner_params);

      // Extract and log the base64 image data
      images.forEach((image: { image_type_id: number; image: string }) => {
        // console.log(`Image Type ID: ${image.image_type_id}`);
        // console.log(`Base64 Image: ${image.image}`);
      });

      // Update the state to indicate that the image has been captured
      setIsImageCaptured(false);
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
  }, [setIsImageCaptured]);

  return (
    <div className="bg-white w-full fixed flex justify-center items-start pt-20 inset-0 top-20 dark:bg-primary_dark backdrop-blur-sm">
      <div className="bg-white border w-10/12 mds:w-8/12 md:7/12 border-gray-400 rounded-xl h-[650px]  lgss:w-2/5 xxl:w-1/3  flex justify-center items-center">
        <smart-camera-web></smart-camera-web>
      </div>
    </div>
  );
};

export default SmartCameraComponent;
