import type {Options} from "prettier";

const config: Options = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: false,
  printWidth: 80,
  tabWidth: 2,
  arrowParens: "always",
  htmlWhitespaceSensitivity: "css",
  jsxBracketSameLine: false,
  bracketSameLine: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
