module.exports = {
  extends: ['universe/native', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 100,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  globals: {
    __dirname: true,
  },
  settings: {
    'import/ignore': ['react-native', 'node_modules/react-native/index\\.js$'],
  },
};
