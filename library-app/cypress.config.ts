const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Set your app's URL here
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Test file naming pattern
    supportFile: 'cypress/support/e2e.js', // Path to support file
  },
});
