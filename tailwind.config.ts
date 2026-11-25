import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080B18",
          900: "#0E1326",
          800: "#151C38",
          700: "#1F2850",
        },
        line: "#2B3562",
        gold: "#F5B942",
        ice: "#4DD8F0",
        blaze: "#FF4D5E",
        fog: "#E8ECFF",
        mute: "#8E98C4",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
