import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Homepage brand tokens — keep in lockstep with index.html :root vars
        midnight: "#07071A",
        ink: "#0D0C22",
        surface: "#141330",
        surface2: "#1A1840",
        gold: {
          DEFAULT: "#C8A96A",
          soft: "#D9BC80",
          dim: "rgba(200,169,106,0.12)",
        },
        cream: "#F2EDE4",
        warm: "#FAF8F4",
        muted: "rgba(242,237,228,0.48)",
        line: "rgba(242,237,228,0.10)",
        navy: "#1B2D4F",
      },
      fontFamily: {
        serif: ['"Canela Text"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
        display: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter2: "-0.02em",
        wide2: "0.18em",
        wide3: "0.22em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        scrollDrop: {
          "0%, 100%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        scrollDrop: "scrollDrop 2s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
