import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";
import globals from "globals";

export default tseslint.config(
{
    ignores: ["**/dist", "**/node_modules"],
},
{
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
    ],
    plugins: {
        jest,
        "@typescript-eslint": typescriptEslint
    },
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },
        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",
        parserOptions: {
            project: ["./tsconfig.eslint.json"],
            tsconfigRootDir: import.meta.dirname
        },
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "tsconfig.eslint.json"
            }
        }
    },
    rules: {
        camelcase: "off",
        "eslint-comments/no-use": "off",
        "eslint-comments/no-unused-disable": "off",
        "i18n-text/no-en": "off",
        "import/no-namespace": "off",
        "no-console": "off",
        semi: "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/consistent-type-assertions": "error",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "no-public",
        }],

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
        }],

        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/space-before-function-paren": "off",
    }
});
