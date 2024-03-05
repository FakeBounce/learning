module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint . --fix',
    'yarn prettier . --write --check',
    'yarn test:all',
    'yarn extract',
    'yarn compile'
  ]
};
