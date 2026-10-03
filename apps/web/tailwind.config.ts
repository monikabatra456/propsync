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
          900: "#0B1F44",
          800: "#0F2A5C",
          700: "#14305E",
        },
        brand: {
          600: "#2F5FA3",
          link: "#1560D4",
          teal: "#2FA0A8",
        },
        page: "#F3F6FB",
        subtle: "#F7F9FC",
        info: "#E9F1FC",
        "success-soft": "#E8F6F0",
        line: "#E3E8F0",
        "line-strong": "#D3DBE6",
        ink: {
          900: "#0F2547",
          700: "#34455F",
          500: "#6B7A90",
          400: "#98A4B5",
        },
        // Status colors matching design tokens
        status: {
          "green-text": "#1E9E6A",
          "green-bg": "#E3F6EE",
          "orange-text": "#E8870E",
          "orange-bg": "#FFF0D9",
          "gray-text": "#5B6B80",
          "gray-bg": "#ECEFF4",
          "red-text": "#E5484D",
          "red-bg": "#FDECEC",
          "purple-text": "#6B4FD8",
          "purple-bg": "#EDE7FB",
          "blue-text": "#2563C9",
          "blue-bg": "#E3EEFC",
          "teal-text": "#1B8F94",
          "teal-bg": "#DFF3F3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        field: "10px",
        login: "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,37,71,.04), 0 4px 16px rgba(15,37,71,.04)",
        login: "0 24px 60px rgba(15,37,71,.12)",
      },
    },
  },
  plugins: [],
};

export default config;
