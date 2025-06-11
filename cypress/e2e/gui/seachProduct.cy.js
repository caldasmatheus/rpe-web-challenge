import searchPage from '../../support/page_objects/searchPage';
import { validarPeloMenosUmProduto, validarProdutosVisiveis, validarNenhumProdutoEncontrado, validarPrecosDosProdutos } from '../../support/page_objects/assertions';
import { setupTest } from '../../support/helpers';

describe('Busca de Smart TVs na Americanas', () => {

   before(() => {
      cy.visit('/');
   });

   setupTest(
      'CT001 - Deve buscar Smart TVs, filtrar por preço e exibir no console produtos com preço acima de R$ 3500',
      'critico',
      'Validar a funcionalidade de busca e filtragem de produtos Smart TVs dentro de uma faixa de preço específica e exibir informações de produtos com valores acima de R$3500'
   )(() => {
      searchPage
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