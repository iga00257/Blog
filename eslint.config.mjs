import eslintReact from '@eslint-react/eslint-plugin';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';

export default tsEslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    eslint.configs.recommended,
    tsEslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    reactRefresh.configs.recommended,
    reactRefresh.configs.vite,
    reactHooks.configs['recommended-latest'],
    jsxA11y.flatConfigs.recommended,
    pluginQuery.configs['flat/recommended'],
    eslintConfigPrettier,
  ],
  plugins: {
    '@next/next': nextPlugin,
  },
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@next/next/no-html-link-for-pages': 'error',
    'react-refresh/only-export-components': 'off',
  },
});
