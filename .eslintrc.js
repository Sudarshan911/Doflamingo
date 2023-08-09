module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
  },
};
