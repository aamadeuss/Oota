module.exports = {
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
   
    },
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['<rootDir>/**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/', '/\\.css$/']
  };