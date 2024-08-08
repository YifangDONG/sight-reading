module.exports = {
  preset: 'ts-jest', // Handle TypeScript files
  testEnvironment: 'node', // Or 'jsdom' if you're testing browser-like environments
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ], // Where to find test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to look for
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['./setup-tests.js'], 
};
