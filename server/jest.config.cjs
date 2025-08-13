/** @type {import('jest').Config} */
module.exports = {
  // where your tests live
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // TypeScript transform (compile to CJS for Jest runtime)
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: {
        target: 'ES2022',
        module: 'commonjs',
        esModuleInterop: true,
        strict: true
      }
    }]
  },

  // Your sources import with ".js" (NodeNext style). This lets Jest resolve TS files.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  // Load env vars from .env before tests run (like your sample project)
  setupFiles: ['dotenv/config'],

  // Coverage (tweak as you like)
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['text', 'json', 'html', 'json-summary'],

  // Parallelism
  maxWorkers: '50%'
};
