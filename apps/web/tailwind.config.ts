import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#ffffff",
        paper: "#0a0a0a",
        line: "#2a2118",
        muted: "#a8a8a8",
        copper: "#b87333",
        brown: "#1c1208",
        mint: "#b87333",
        gold: "#b87333",
        berry: "#be123c"
      }
    }
  },
  plugins: []
};

export default config;
