/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#aecbff",
          300: "#84acff",
          400: "#5c8fff",
          500: "#3a71f6",
          600: "#2857d3",
          700: "#1c40a8",
          800: "#142c7a",
          900: "#0c1b4d",
        },
        accent: {
          50: "#fff6ed",
          100: "#ffe7d3",
          200: "#fdcaa6",
          300: "#faae78",
          400: "#f7934a",
          500: "#dd7a30",
          600: "#af5f24",
          700: "#814419",
          800: "#552a0d",
          900: "#2a1304",
        },
      },
      boxShadow: {
        card: "0 15px 40px rgba(15, 23, 42, 0.1)",
      },
    },
  },
  plugins: [],
};


