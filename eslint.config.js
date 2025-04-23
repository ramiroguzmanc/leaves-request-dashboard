import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-quotes': ["error", "prefer-single"],
      '@stylistic/no-mixed-spaces-and-tabs': ["error", "smart-tabs"],
      '@stylistic/jsx-curly-brace-presence': ["error", { "props": "never", "children": "never", "propElementValues": "ignore" }],
      '@stylistic/no-trailing-spaces': ["error"],
      '@stylistic/eol-last': ["error", "always"],
      '@stylistic/no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }],
      '@stylistic/object-curly-spacing': ["error", "always"],
    },
  },
)
