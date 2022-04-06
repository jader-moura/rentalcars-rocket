/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: 1,
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  // collectCoverage: true,
  coverageDirectory: "coverage",
};
