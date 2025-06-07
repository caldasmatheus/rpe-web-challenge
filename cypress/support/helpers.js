Cypress.Commands.add('assertLoadingIsShownAndHidden', () => {
   cy.contains('div', 'Aguarde...', { timeout: 30000 }).should('be.visible')
   cy.contains('div', 'Aguarde...', { timeout: 30000 }).should('not.be.visible')
})

export function setupTest(testName, severity, description) {
   return (testFunction) => {
      it(testName, function () {
         cy.allure().severity(severity);
         cy.allure().description(description);
         cy.allure().link('https://www.americanas.com.br', 'Americanas');

         cy.window().then((win) => {
            win.collectedProducts = [];
         });

         testFunction.call(this);
      });
   };
}