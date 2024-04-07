/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bigburger2: "url('./src/assets/bigburger2.jpg')",
      },
      height: {
        120: "30rem",
      },
      animation: {
        "border-color": "border-color 2s linear infinite",
        gradient: "gradientAnimation 10s ease infinite",
      },
    },
  },

  plugins: [],
};
