const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
      enableTsDiagnostics: true,
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/.*'],
};
