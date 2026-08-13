/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-primary": "#1c1b1f",
        "text-secondary": "#62606e",
        "brand-tint": "#f8f4fa",
        "secondary-border": "#8d73b6",
        "secondary-text": "#55456e",
        "input-border": "#d9e3ed",
        "input-placeholder": "#61647a",
        "prompt-border": "#e8eef4",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        field: "20px",
      },
    },
  },
  plugins: [],
};
