import type { Config } from "tailwindcss";

/**
 * Tailwind theme reads from the canonical tokens.css at repo root.
 * Adding a new colour, font, or radius means editing tokens.css —
 * this file just wires utility classes to those CSS variables.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Canonical brand palette
        midnight: "var(--color-midnight)",
        "navy-deep": "var(--color-navy-deep)",
        blue: "var(--color-blue)",
        gold: "var(--color-gold)",
        cream: "var(--color-cream)",
        white: "var(--color-white)",

        // Functional aliases
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-light": "var(--bg-light)",
        "fg-base": "var(--fg-base)",
        "fg-muted": "var(--fg-muted)",
        "fg-soft": "var(--fg-soft)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        line: "var(--line)",

        // Legacy shorthand still in use across components
        ink: "var(--bg-surface)",
        surface: "var(--bg-surface)",
        surface2: "var(--bg-elevated)",
        warm: "var(--color-cream)",
        muted: "var(--fg-muted)",
        navy: "var(--color-navy-deep)",
      },
      fontFamily: {
        serif: "var(--font-display)",
        sans: "var(--font-body)",
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      fontSize: {
        "3xs": "var(--fs-3xs)",
        "2xs": "var(--fs-2xs)",
        xs: "var(--fs-xs)",
        sm: "var(--fs-sm)",
        base: "var(--fs-md)",
        lg: "var(--fs-lg)",
        xl: "var(--fs-xl)",
        "2xl": "var(--fs-2xl)",
        "display-sm": "var(--fs-display-sm)",
        "display-md": "var(--fs-display-md)",
        "display-lg": "var(--fs-display-lg)",
        "display-xl": "var(--fs-display-xl)",
      },
      fontWeight: {
        light: "var(--fw-light)",
        regular: "var(--fw-regular)",
        normal: "var(--fw-regular)",
        medium: "var(--fw-medium)",
        bold: "var(--fw-bold)",
        black: "var(--fw-black)",
      },
      letterSpacing: {
        display: "var(--ls-display)",
        body: "var(--ls-body)",
        tag: "var(--ls-tag)",
        button: "var(--ls-button)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow-gold)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        fast: "220ms",
        base: "450ms",
        slow: "850ms",
        reveal: "1100ms",
      },
      maxWidth: {
        container: "var(--container-max)",
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
