const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
   e2e: {
      setupNodeEvents(on, config) {
         console.log('Configurando Allure Writer');
         allureWriter(on, config);
         console.log('Allure Writer configurado');

         on('after:spec', (spec, results) => {
            console.log('after:spec chamado');
            console.log('spec:', spec);
            console.log('results:', results);
         });

         return config;
      },
      viewportWidth: 1920,
      viewportHeight: 1080,
      baseUrl: 'https://www.americanas.com.br/',
      specPattern: 'cypress/e2e/**/*.cy.js',
      excludeSpecPattern: 'cypress/e2e/other/*.js',
      env: {
         allure: true,
         allureResultsPath: 'allure-results',
      },
   },
});