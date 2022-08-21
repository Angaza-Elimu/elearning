/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      primary: {
        500: "#0C6B94",
        600: "#137EAD",
        700: "#1B8EBF",
        800: "#58B3DA",
        900: "#D2EDF9",
      },
      secondary: {
        500: "#09662F",
        600: "#0C803A",
        700: "#0FA24A",
        800: "#13CC5D",
        900: "#DAFCE7",
      },
      neutral: {
        500: "#828E99",
        600: "#AAB4BD",
        700: "#CFD6DB",
        800: "#DFE9EB",
        900: "#F4F9FA",
      },
      shade: {
        dark: "#050D10",
        light: "#FFFFFF",
      },
      accent: {
        500: "#CC377B",
        600: "#26BDA4",
        700: "#13CFD6",
      },
      alerts: {
        info: "#0099CC",
        success: "#339933",
        warning: "#FD7E14",
        danger: "#CC3333",
        danger2: "#DB3700",
      },
    },
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
    },
    extend: {
      transformOrigin: {
        0: "0%",
      },
      gridTemplateColumns: {
        sidebar: "minmax(260px, 280px) 1fr", //sidebar
      },
    },
  },
  plugins: [],
};
