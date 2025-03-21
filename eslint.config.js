import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginUnusedImports from "eslint-plugin-unused-imports"
import pluginFilenameExport from "eslint-plugin-filename-export"
import pluginImport from "eslint-plugin-import"
import pluginEsx from "eslint-plugin-es-x"

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{ts, js}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["vite.config.ts", "eslint.config.js"],
        plugins: {
            "unused-imports": pluginUnusedImports,
            "filename-export": pluginFilenameExport,
            import: pluginImport,
            esx: pluginEsx,
        },
        rules: {
            "no-unused-vars": "off",
            "no-useless-rename": ["error"],
            eqeqeq: ["error", "always", { null: "never" }],
            "import/extensions": ["error", "ignorePackages"],
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/consistent-type-imports": "error",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "import/no-default-export": "error",
            "filename-export/match-named-export": [
                "error",
                { casing: "strict", stripextra: false },
            ],
            "esx/no-top-level-await": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
        },
    },
    eslintConfigPrettier,
]
