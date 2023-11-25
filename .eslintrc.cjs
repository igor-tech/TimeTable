module.exports = {
  extends: '@it-incubator/eslint-config',
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', 'always', { js: 'never' }],
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-interfaces': 'off',
  },
  plugins: ['jest'],
};