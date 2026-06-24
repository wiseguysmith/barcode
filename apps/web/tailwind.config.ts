import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        paper: "#fafafa",
        line: "#e4e4e7",
        mint: "#0f766e",
        gold: "#b45309",
        berry: "#be123c"
      }
    }
  },
  plugins: []
};

export default config;
