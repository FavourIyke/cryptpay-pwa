/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dashboardBg: "url('/src/assets/images/dashboardBg.png')",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      strokeLinejoin: {
        round: "round",
      },
      colors: {
        primary_dark: "#141414",
        success_green: "#4FFF6C",
        pending: "#F7C164",
        text_blue: "#3A66FF",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      screens: {
        xxs: "400px",
        xs: "480px",
        mds: "600px",
        md: "800px",
        lgss: "976px",
        lg: "1200px",
        xxl: "1300px",
        xxxl: "1650px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
