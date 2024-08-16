import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";

const ImageUploader = () => {
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
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <div
        className="w-[32px] h-[32px] relative right-5 flex justify-center items-center rounded-full dark:bg-[#424242]  bg-text_blue text-white text-[16px]"
        onClick={handleImageChoice}
      >
        <FaCamera />
      </div>

      {/* Webcam Display */}
      {showWebcam && (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={handleCapture}>Capture Photo</button>
        </div>
      )}

      {/* Image Preview */}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded or Captured" />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImageUploader;
