describe('Busca de Smart TVs na Americanas', () => {
   it('Deve buscar Smart TVs e filtrar por preço', () => {
      cy.visit('/');

      cy.get('form input[placeholder="busque aqui seu produto"]').type('Smart TV');
      cy.get('form button[type="submit"]').click();
      cy.wait(4000);
      cy.waitForFiltersAndSelectPrice();

      cy.collectProductInfo();

      function recurseNavigation() {
         return cy.navigateToNextPage().then(() => {
            cy.collectProductInfo();
            return cy.navigateToNextPage().then((hasNext) => {
               if (hasNext !== null) {
                  return recurseNavigation();
               }
            });
         });
      }

      cy.then(() => {
         return recurseNavigation();
      });
   });
});