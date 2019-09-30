module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        impliedStrict: true
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        "indent": ["error", 4],
        "spaced-comment": [2, "always", {
            "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!"]
        }],
        "space-unary-ops": [2, {
            "words": true,
            "nonwords": false
        }],
        "quotes": [2, "single"],
        "comma-dangle": ["error", "never"],
    },
};
