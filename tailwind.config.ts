import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          50: "#F4F6F8",
          100: "#E4E8EC",
          400: "#5A6472",
          600: "#333B47",
          900: "#151A23",
        },
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        amber: {
          DEFAULT: "#E8A93A",
          600: "#C88A1F",
        },
        teal: {
          DEFAULT: "#2F8F7A",
          600: "#256F5F",
        },
        backlog: "#8B93A3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
