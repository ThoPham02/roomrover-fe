/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
        260: "260px",
        80: "80px",
        360: "360px",
      },
      height: {
        70: "70px",
        80: "80px",
      },
      boxShadow: {
        custom: "1px 0 20px rgba(0, 0, 0, 0.08)",
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary1: "rgb(251 191 36)",
        secondary2: "rgb(165 243 252)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        300: "300px",
        200: "200px",
      },
      cursor: {
        pointer: "pointer",
      },
      flex: {
        3: "3 3 0%",
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        " slide-right ": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
          "100%": {
            "-webkit-transform": "translateX(100px)",
            transform: "translateX(100px)",
          },
        },
      },
      rotate: {
        15: "15deg",
      },
    },
  },
  plugins: [],
};
