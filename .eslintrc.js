module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {},
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    semi: [2, "always"],
  },
}
