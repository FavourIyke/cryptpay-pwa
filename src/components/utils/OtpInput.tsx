import React from "react";
import { useUser } from "../../context/user-context";
import OtpInput from "react18-input-otp";

interface OtpInputFieldProps {
  otp: string;
  setOtp: any;
  handleChange: (otp: string) => void;
  shouldAutoFocus?: boolean;
}

const OtpInputField: React.FC<OtpInputFieldProps> = ({
  otp,
  setOtp,
  handleChange,
  shouldAutoFocus = true,
}) => {
  const { theme } = useUser();

  const handlePaste = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      if (/^\d{6}$/.test(text)) {
        setOtp(text);
      } else {
        console.log("Clipboard does not contain a valid 6-digit code.");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const darkThemeStyles = {
    inputStyle: {
      width: "90%",
      height: "56px",
      borderWidth: "1px",
      borderColor: "#475367",
      borderStyle: "solid",
      backgroundColor: "transparent",
      borderRadius: "0.75rem",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "1.25rem",
      appearance: "none" as any, // casting to any
      transition: "all 0.15s ease-in-out",
      outline: "none",
      color: "#FFFFFF",
    },
    focusStyle: {
      borderColor: "#3A66FF",
    },
  };

  const lightThemeStyles = {
    inputStyle: {
      width: "90%",
      height: "56px",
      borderWidth: "1px",
      borderColor: "#D0D5DD",
      backgroundColor: "#FAFAFA",
      borderStyle: "solid",
      borderRadius: "0.75rem",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "1.25rem",
      appearance: "none" as any, // casting to any
      transition: "all 0.15s ease-in-out",
      outline: "none",
      color: "#1D2739",
    },
    focusStyle: {
      borderColor: "#3A66FF",
    },
  };

  const styles = theme === "dark" ? darkThemeStyles : lightThemeStyles;

  return (
    <div className="flex w-full flex-col justify-center lgss:justify-start lgss:px-0 items-center">
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        isInputNum
        inputStyle={styles.inputStyle}
        focusStyle={styles.focusStyle}
        shouldAutoFocus={shouldAutoFocus}
      />
      {/* <div className="w-full flex justify-center items-center">
        <button
          onClick={handlePaste}
          className="px-4 py-2 rounded-xl bg-[#D4EBFD] text-[13px] font-semibold font-sora mt-5 text-secondary_button"
        >
          Paste
        </button>
      </div> */}
    </div>
  );
};

export default OtpInputField;
