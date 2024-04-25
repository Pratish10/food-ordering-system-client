module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["error"] }],
    "react/jsx-fragments": ["error", "element"],
  },
  ignorePatterns: ["node_modules/", "build/", "components/ui/**/*"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
