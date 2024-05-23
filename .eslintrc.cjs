module.exports = {
  extends: '@it-incubator/eslint-config',
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-interfaces': 'off',
  },
  plugins: ['jest'],
};