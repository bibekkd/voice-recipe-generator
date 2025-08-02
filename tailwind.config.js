/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        primary: '#FF6347',        // Tomato Red
        secondary: '#FFA500',
        secondaryTwo: '#f78f07',      // Orange
        cream: '#FFF7F0',          // Soft Cream
        dark: '#2E2E2E',           // Primary text
        grayText: '#6B6B6B',       // Secondary text
        borderColor: '#E0E0E0',         // Borders, dividers
        success: '#3CB371',        // Green
        error: '#FF4D4F',          // Soft Red
        info: '#FFF2CC',           // Info background
      },
      
    },
    fontFamily: {
      inter: ['Inter_400Regular'],
      'inter-bold': ['Inter_700Bold'],
      quicksand: ['Quicksand_400Regular'],
      'quicksand-bold': ['Quicksand_700Bold'],
    },
  },
  plugins: [],
};

