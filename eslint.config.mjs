// Same rules as self-checkout-v2 (eslint.config.mjs there), written with the flat configs of angular-eslint 22 and
// typescript-eslint (the "plugin:…" names of the older versions are gone).
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import unicorn from "eslint-plugin-unicorn";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    // (src/assets: data files written by the editors' exports, in their own format)
    globalIgnores(["projects/**/*", "src/assets/**/*"]),
    // Apply Prettier config to disable conflicting ESLint rules
    eslintConfigPrettier,
    {
        files: ["**/*.ts"],

        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            angular.configs.tsRecommended,
            eslintPluginPrettierRecommended,
        ],
        processor: angular.processInlineTemplates,

        plugins: {
            unicorn,
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-namespace": "error",
            "prettier/prettier": ["error", {
                tabWidth: 2,
                useTabs: false,
                singleQuote: false,
                semi: true,
                arrowParens: "always",
                trailingComma: "es5",
                bracketSameLine: true,
                printWidth: 80,
                bracketSpacing: true,
                singleAttributePerLine: true,
                endOfLine: "lf",
            }],
            "unicorn/explicit-length-check": "error",
            "unicorn/no-for-loop": "error",
            "unicorn/no-instanceof-array": "error",
            "unicorn/no-lonely-if": "error",
            "unicorn/no-negated-condition": "error",
            "unicorn/no-nested-ternary": "error",
            "unicorn/no-new-array": "error",
            "unicorn/no-useless-length-check": "error",
            "unicorn/no-useless-spread": "error",
            "unicorn/numeric-separators-style": "error",
            "unicorn/prefer-array-find": "error",
            "unicorn/prefer-array-flat": "error",
            "unicorn/prefer-array-flat-map": "error",
            "unicorn/prefer-array-index-of": "error",
            "unicorn/prefer-array-some": "error",
            "unicorn/prefer-at": "error",
            "unicorn/prefer-date-now": "error",
            "unicorn/prefer-default-parameters": "error",
            "unicorn/prefer-includes": "error",
            "unicorn/prefer-math-trunc": "error",
            "unicorn/prefer-modern-math-apis": "error",
            "unicorn/prefer-native-coercion-functions": "error",
            "unicorn/prefer-object-from-entries": "error",
            "unicorn/prefer-spread": "error",
            "unicorn/prefer-switch": "error",
            "unicorn/better-regex": "error",
            "unicorn/no-array-push-push": "error",
            "unicorn/prefer-negative-index": "error",
            "unicorn/prefer-set-has": "error",
            "unicorn/prefer-string-slice": "error",
            "unicorn/prefer-string-trim-start-end": "error",
            "unicorn/require-number-to-fixed-digits-argument": "error",
        }
    },
    {
        files: ["**/*.html"],
        extends: [angular.configs.templateRecommended],
        rules: {},
    },
    {
        files: ["**/*.html"],
        ignores: ["**/*inline-template-*.component.html"],
        extends: [eslintPluginPrettierRecommended],

        rules: {
            "prettier/prettier": ["error", {
                parser: "angular",
            }],
        },
    },
]);
