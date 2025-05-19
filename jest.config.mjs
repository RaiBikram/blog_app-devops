/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],     // Ignore tests in dist/
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore coverage for dist/
};
