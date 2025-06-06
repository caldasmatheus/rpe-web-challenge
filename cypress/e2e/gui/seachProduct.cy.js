import searchPage from '../../support/page_objects/searchPage';
import { validarPeloMenosUmProduto, validarProdutosVisiveis, validarNenhumProdutoEncontrado, validarPrecosDosProdutos } from '../../support/page_objects/assertions';

describe('Busca de Smart TVs na Americanas', () => {
   it('Deve buscar Smart TVs e filtrar por preço', () => {

      cy.window().then((win) => {
         win.collectedProducts = [];
      });

      searchPage
         .visit()
         .buscarProduto('Smart TV')
         .esperarCarregar()
         .filtrarPorPreco();

      function navegar() {
         return searchPage.navegarParaProximaPagina().then((hasNext) => {
            if (hasNext !== null) {
               return navegar();
            }
         });
      }

      cy.then(() => {
         return navegar();
      });

      cy.coletarProdutosFinal();

      validarPeloMenosUmProduto();
      validarProdutosVisiveis();
      validarNenhumProdutoEncontrado();
      validarPrecosDosProdutos();

   });
});