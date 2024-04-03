module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint . --fix',
    'yarn test:all',
    'yarn extract',
    'yarn compile',
    "git-format-staged --formatter 'prettier --stdin' '*.{ts,tsx}'",
    'git add src/locales'
  ]
};
