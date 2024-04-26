// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as process from 'process';

process.env.VITE_HOST_ENVIRONNEMENT = 'test';
process.env.VITE_HOST_AXIOS_DELAY = '0';

module.exports = {
  testEnvironment: 'jsdom'
};
