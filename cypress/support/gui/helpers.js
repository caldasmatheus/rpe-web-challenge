Cypress.Commands.add('assertLoadingIsShownAndHidden', () => {
   cy.contains('div', 'Aguarde...', { timeout: 30000 }).should('be.visible')
   cy.contains('div', 'Aguarde...', { timeout: 30000 }).should('not.be.visible')
})