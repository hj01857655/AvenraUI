import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ignores: ["dist/**", ".next/**", "coverage/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];
