import searchPage from '../../support/page_objects/searchPage';

describe('Busca de Smart TVs na Americanas', () => {
   it.only('Deve buscar Smart TVs e filtrar por preço', () => {

      searchPage
         .visit()
         .buscarProduto('Smart TV')
         .esperarCarregar()
         .filtrarPorPreco()
         .coletarProdutos();

      function navegar() {
         return searchPage.navegarParaProximaPagina().then((hasNext) => {
            if (hasNext !== null) {
               searchPage.coletarProdutos();
               return navegar();
            }
         });
      }

      cy.then(() => {
         return navegar();
      });
   });
});