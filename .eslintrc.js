module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: './',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unstable-nested-components': 0,
    'jsx-a11y/anchor-is-valid': 0, // next-links require empty a tags
    'jsx-a11y/label-has-associated-control': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/no-array-index-key' : 0,
    'react/function-component-definition': 0,
    'no-unused-vars': 0,
    'import/order': 0,
    'jsx-a11y/click-events-have-key-events':0,
    'jsx-a11y/no-static-element-interactions':0,
    'no-console':0,
    'react/destructuring-assignment':0,
    'no-shadow':0,
    'react/no-danger':0,
    'react/prop-types':0,
    'no-use-before-define':0,
    'import/no-unresolved':0,
    'react/jsx-no-useless-fragment':0,
    'no-lone-blocks':0,
    'consistent-return':0
  },
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
