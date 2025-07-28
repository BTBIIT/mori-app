/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ← 이 줄을 추가합니다
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
