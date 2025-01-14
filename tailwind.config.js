/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Define a custom font family
        prata: ['"Prata"', "serif"], 
        nunito: ['"Nunito Sans"', 'sans-serif'], // Add Nunito Sans
      },
    },
  },
  plugins: [],
}
