export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.mjs$': ['ts-jest', {
      useESM: true,
      diagnostics: false,
      tsconfig: {
        allowJs: true,
        checkJs: false,
        skipLibCheck: true,
        skipDefaultLibCheck: true
      }
    }],
    '^.+\\.js$': ['ts-jest', {
      useESM: true,
      diagnostics: false,
      tsconfig: {
        allowJs: true,
        checkJs: false,
        skipLibCheck: true,
        skipDefaultLibCheck: true
      }
    }],
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      diagnostics: false,
      tsconfig: {
        module: 'ESNext',
        moduleResolution: 'node',
        esModuleInterop: true,
        noEmit: true,
        skipLibCheck: true
      }
    }]
  },
  testEnvironment: 'node'
};
