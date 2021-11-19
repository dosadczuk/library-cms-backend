/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Stop running tests after `n` failures
  bail: 1,

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: '50%',

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src', '<rootDir>/test'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
