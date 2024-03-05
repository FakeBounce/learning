module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'yarn test:all',
    'yarn extract',
    'yarn compile'
  ]
};
