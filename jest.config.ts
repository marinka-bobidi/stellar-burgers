/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@cookie': '<rootDir>/src/utils/cookie.ts'
  },
  testEnvironment: 'jsdom'
};

export default config;
