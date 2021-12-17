module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {},
}
