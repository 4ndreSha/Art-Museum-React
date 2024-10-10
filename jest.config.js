module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  verbose: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "\\.(svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
