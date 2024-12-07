import React, { useEffect, useState } from "react";
import { useUser } from "../context/user-context";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const colors = ["#3A66FF", "#C66600", "#00AA9C", "#6100AA", "#B20091"]; // Define your colors

const Colorpalette = ({ setIsPalette }: any) => {
  const { setDisplayColor } = useUser();
  const [bgColor, setBgColor] = useState<string>("");

  // Retrieve saved color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("dashboardColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, []);

  // Handle color selection
  const handleColorClick = (color: string) => {
    // Update state
    localStorage.setItem("dashboardColor", color); // Save to localStorage
    setDisplayColor(color); // Update context if needed
    toast.success("Dashboard theme changed");
    setTimeout(() => {
      setIsPalette(false);
    }, 800);
  };

  return (
    <div className="fixed w-full inset-0 flex font-sora z-50 justify-center px-6 xs:px-10 items-center lgss:items-start lgss:pt-24 pt-12 overflow-auto pb-16 bg-[#000000] dark:bg-opacity-80 bg-opacity-10 ">
      <div className="bg-white dark:bg-[#242424] w-full mds:w-2/3 md:w-3/5 lgss:w-2/5 xl:w-1/3 xxxl:w-1/5 px-4 rounded-xl py-6">
        <div className="w-full flex justify-between items-center">
          <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-[20px]">
            Style Dashboard
          </h4>
          <button
            onClick={() => {
              setIsPalette(false);
            }}
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            <IoClose className="text-black dark:text-white text-[20px]" />
          </button>
        </div>
        <h4 className="dark:text-gray-300 text-gray-800 mt-3 text-[12px]">
          Style your dashboard with the perfect color for a sleek, cohesive, and
          visually engaging experience.
        </h4>
        <div className="flex justify-between items-center gap-2 mt-8 w-full">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setBgColor(color)}
              className={`h-[52px] w-[52px] rounded-full flex justify-center items-center p-1 ${
                bgColor === color
                  ? `border border-[${bgColor}]` // Show outer ring if selected
                  : "border border-transparent"
              }`}
              style={{
                border:
                  bgColor === color
                    ? `1px solid ${color}`
                    : "1px solid transparent",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
        <button
          style={{
            backgroundColor: bgColor,
          }}
          className={`w-full mt-6 ${
            bgColor ? `bg-[${bgColor}]` : "bg-text_blue"
          } rounded-xl font-medium text-[15px] text-white h-[52px]`}
          onClick={() => handleColorClick(bgColor)}
        >
          Change Color
        </button>
      </div>
    </div>
  );
};

export default Colorpalette;
