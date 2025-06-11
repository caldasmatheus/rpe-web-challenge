class searchPage {
   visit() {
      cy.visit('/');
      return this;
   }

   buscarProduto(nome) {
      cy.typeSearchInput(nome);
      cy.clickSearchButton();
      this.esperarCarregar;
      return this;
   }

   esperarCarregar() {
      cy.wait(4000);
      return this;
   }

   esperarResultadoCarregar() {
      cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist');
      return this;
   }

   filtrarPorPreco() {
      cy.waitForFiltersAndSelectPrice();
      return this;
   }

   navegarParaProximaPagina() {
      return cy.navigateToNextPage().then((hasNext) => {
         return hasNext;
      });
   }

   coletarProdutosFinal() {
      cy.collectProductsFinal();
      return this;
   }
}

export default new searchPage();