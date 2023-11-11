module.exports = {
  extends: '@it-incubator/eslint-config',
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', 'always', {js: 'never'}]
  }
};