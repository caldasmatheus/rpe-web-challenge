Cypress.Commands.add('collectProductInfo', () => {
   cy.get('.ProductGrid_vertical__TCnHK .ProductCard_productInfo__WAMw3').each(($el) => {
      const name = $el.find('.ProductCard_productName__mwx7Y').text().trim();

      const priceText = $el.find('.ProductCard_productPrice__XFEqu').text();
      const priceNumber = parseFloat(
         priceText.replace('R$', '').replace('.', '').replace(',', '.')
      );

      const stars = $el.find('.avg-rating').text();

      if (priceNumber > 3500) {
         cy.log(`● Nome: ${name} Preço: R$ ${priceNumber.toFixed(2)} Estrelas: ${stars}`);
      }
   });
});

Cypress.Commands.add('navigateToNextPage', () => {
   return cy.document().then((doc) => {
      const hasButton = doc.querySelector('.Pagination_paginationButton__r_JxW');
      if (hasButton) {
         return cy.get('.Pagination_paginationButton__r_JxW', { timeout: 30000 }).then(($btn) => {
            if ($btn.is(':visible')) {
               cy.wrap($btn).focus().as('nextBtn');

               cy.get('@nextBtn').click({ force: true });
               cy.wait(2000);

               return cy.get('.ProductGrid_vertical__TCnHK .ProductCard_productInfo__WAMw3', { timeout: 30000 }).should('be.visible')
                  .then(() => true);
            } else {
               return null;
            }
         });
      } else {
         return null;
      }
   });
});

Cypress.Commands.add('waitForFiltersAndSelectPrice', () => {
   cy.get('[data-testid="fs-accordion-panel"]')
      .contains('button', 'ver tudo').focus()
      .should('be.visible')
      .click()
      .blur();

   cy.get('input[type="checkbox"][value="2500-5000"]', { timeout: 10000 })
      .focus()
      .check({ force: true })
      .blur();
});