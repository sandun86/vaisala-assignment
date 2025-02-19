module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/src/**/*.spec.ts"], // Only run tests in src/ ending with .test.ts
};
