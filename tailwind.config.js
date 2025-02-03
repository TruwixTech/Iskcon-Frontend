/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Define a custom font family
        prata: ['"Prata"', "serif"],
        nunito: ['"Nunito Sans"', "sans-serif"], // Add Nunito Sans
      },
      keyframes: {
        shine: {
          "0%": { "-webkit-mask-position": "150%" },
          "100%": { "-webkit-mask-position": "-50%" },
        },
        slideArrow: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        shine: "shine 2s infinite",
        'slide-arrow': 'slideArrow 1s infinite',
      },
    },
  },
  plugins: [],
};
