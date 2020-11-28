const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },

  extends: ["plugin:react/recommended"],
  plugins: ["react", "react-hooks"],

  rules: {
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": WARN,
    "react/prop-types": OFF,
    "react/display-name": OFF,
  },
};
