import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "var(--navy)",
          deep: "var(--navy-deep)",
          900: "var(--navy)",
          800: "var(--navy-deep)",
          700: "#14376B",
        },
        blue: {
          DEFAULT: "var(--blue)",
          action: "var(--blue)",
          hover: "var(--blue-hover)",
          soft: "var(--blue-soft)",
          light: "var(--blue-light)",
        },
        canvas: {
          DEFAULT: "var(--bg)",
          wash: "var(--canvas-wash)",
        },
        border: "var(--border)",
        ink: {
          DEFAULT: "var(--text)",
          900: "var(--text)",
          700: "#25406B",
          500: "var(--muted)",
          400: "#889EB8",
        },
        muted: "var(--muted)",
        success: {
          DEFAULT: "var(--success)",
          soft: "var(--success-soft)",
          ink: "var(--success-ink)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          soft: "var(--warning-soft)",
          ink: "var(--warning-ink)",
        },
        orange: {
          soft: "var(--orange-soft)",
          ink: "var(--orange-ink)",
        },
        danger: {
          DEFAULT: "var(--danger-ink)",
          soft: "var(--danger-soft)",
          ink: "var(--danger-ink)",
        },
        purple: {
          soft: "var(--purple-soft)",
          ink: "var(--purple-ink)",
        },
        teal: {
          soft: "var(--teal-soft)",
          ink: "var(--teal-ink)",
        },
        gray: {
          soft: "var(--gray-soft)",
          ink: "var(--gray-ink)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      borderRadius: {
        card: "16px",
        field: "10px",
        btn: "10px",
        pill: "9999px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.22,1,.36,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [],
};

export default config;
