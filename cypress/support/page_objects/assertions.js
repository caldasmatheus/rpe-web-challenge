export function validarPeloMenosUmProduto() {
   cy.get('.ProductGrid_vertical__TCnHK .ProductCard_productInfo__WAMw3')
      .its('length')
      .should('be.gte', 1, 'Deve existir pelo menos um produto na lista');
}

export function validarProdutosVisiveis() {
   cy.get('.ProductGrid_vertical__TCnHK').should('be.visible');
}

export function validarNenhumProdutoEncontrado() {
   cy.get('body').then(($body) => {
      if ($body.find('.no-results').length > 0) {
         throw new Error('Nenhum produto encontrado após a busca e filtro');
      }
   });
}

export function validarPrecosDosProdutos() {
   cy.getCollectedProducts().then((produtosFiltrados) => {
      const produtosValidos = produtosFiltrados.filter(p => p.price > 3500);
      expect(produtosValidos.length, `Quantidade de produtos com preço > R$ 3500`).to.be.gte(1);
      cy.task('log', `Quantidade de produtos com preço > R$3500: ${produtosValidos.length}`);
      produtosValidos.forEach((produto) => {
         expect(produto.price, `Preço do ${produto.name} deve ser > R$3500`).to.be.gte(3500);
      });
   });
}