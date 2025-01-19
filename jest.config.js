module.exports = {
  rootDir: __dirname,
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
//   setupFiles: ['<rootDir>/src/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};