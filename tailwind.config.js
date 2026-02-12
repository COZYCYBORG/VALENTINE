/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff7f3",
        blush: "#ffeae6",
        rose: "#ff5a5f",
        deepRose: "#e3272d",
        wine: "#8f1014"
      },
      fontFamily: {
        display: ["DM Sans", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"]
      },
      boxShadow: {
        glow: "0 12px 40px rgba(227, 39, 45, 0.25)"
      }
    }
  },
  plugins: []
};
