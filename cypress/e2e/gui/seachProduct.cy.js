import searchPage from '../../support/page_objects/searchPage';
import { validarPeloMenosUmProduto, validarProdutosVisiveis, validarNenhumProdutoEncontrado, validarPrecosDosProdutos } from '../../support/page_objects/assertions';
import { setupTest } from '../../support/helpers';

describe('Busca de Smart TVs na Americanas', () => {
   it('CT001 - Validar a funcionalidade de busca e filtragem de produtos Smart TVs dentro de uma faixa de preço específica e exibir informações de produtos com valores acima de R$3500', () => {
      setupTest(
         'Deve buscar Smart TVs e filtrar por preço',
         'critical',
         'Este teste verifica a busca de Smart TVs e o filtro por preço.'
      );

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

      searchPage.coletarProdutosFinal();

      validarPeloMenosUmProduto();
      validarProdutosVisiveis();
      validarNenhumProdutoEncontrado();
      validarPrecosDosProdutos();
   });
});