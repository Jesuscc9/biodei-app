module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'never'],
    quotes: [2, 'single', { avoidEscape: true }],
    '@typescript-eslint/consistent-type-assertions': 'off',
  },
}
