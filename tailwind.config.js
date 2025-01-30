/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        formular: ["Formular", "sans-serif"],
        formularMedium: ["Formular", "sans-serif"],
        greenwich: ["Greenwich", "sans-serif"],
      },
      colors: {
        customBlue: "#1E3A8A",
        customGreen: "#10B981",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #ff7e5f, #feb47b)',
      }
    }
  },
  plugins: [],
};
