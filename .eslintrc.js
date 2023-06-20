module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        'airbnb-base',
        "plugin:import/typescript",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    ignorePatterns: [
        "*.migration.js",
        "add_migration.js"
    ],
    rules: {
        "spaced-comment": [
            "error",
            "always",
            {
                "exceptions": ["*"]
            }
        ],
        "no-console": [
            2,
            { 
                "allow": [
                    "warn",
                    "error"
                ]
            }
        ],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
            "error"
        ],
        "no-underscore-dangle": 0,
        "no-undef": 0,
        "semi": 2,
        "eol-last": 2,
        "quotes" : 0,
        "no-useless-constructor" : 0,
        "indent": [
            "error",
            2,
            {
                "SwitchCase": 1
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "ts": "never",
            }
        ],
        "complexity": [
            "warn",
            10
        ]
    },
};
