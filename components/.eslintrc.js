module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js"], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["react-app", "eslint:recommended"],
  plugins: ["prettier"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript rules
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "prettier/@typescript-eslint", // Prettier plugin
        "plugin:prettier/recommended", // Prettier recommended rules
      ],
      rules: {
        // We will use TypeScript's types for component props instead
        "react/prop-types": "off",

        // No need to import React
        "react/react-in-jsx-scope": "off",

        // Why would you want unused vars?
        "@typescript-eslint/no-unused-vars": ["warn"],

        // I suggest this setting for requiring return types on functions only where useful
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": [0],
        "prettier/prettier": [
          "warn",
          { endOfLine: "auto" },
          { usePrettierrc: true },
        ], // Includes .prettierrc.js rules
      },
    },
  ],
};
