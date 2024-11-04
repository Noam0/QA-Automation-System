const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://qa-30.nanolocksecurity.nl', // Default baseUrl
    experimentalRunAllSpecs: true, // Enable experimental feature to run all specs
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Adjust baseUrl based on environment variable
      const envConfig = {
        'dev-30': 'http://dev-30.nanolocksecurity.nl',
        'dev-21': 'http://dev-21.nanolocksecurity.nl',
        'qa-21': 'http://qa-30.nanolocksecurity.nl'
      };
      if (config.env.environment && envConfig[config.env.environment]) {
        config.baseUrl = envConfig[config.env.environment];
      }
      return config;
    },
  },

  // Mochawesome reporter configuration
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // Directory for reports
    overwrite: true,
    html: true, // Enable HTML reports
    json: true, // Enable JSON reports
  },
});