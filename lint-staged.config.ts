module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint . --fix',
    'yarn test:all',
    'yarn extract',
    'yarn compile',
    "git-format-staged --formatter 'prettier --stdin-filepath \"{}\"' 'src/*.ts' 'src/*.tsx'",
    'git add src/locales'
  ]
};
