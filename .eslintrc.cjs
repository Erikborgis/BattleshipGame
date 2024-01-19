module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': ['warn', 2],
    'quotes': ['warn', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': ['warn', 'always'],
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'react/no-unused-state': 'warn',
    'max-lines': ['warn', { max: 300 }],
  },
}