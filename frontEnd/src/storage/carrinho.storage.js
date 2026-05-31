// Nome da chave usada para guardar o carrinho no localStorage.
const CARRINHO_KEY = "carrinho";

// Busca o carrinho salvo no navegador.
// Se ainda nao existir carrinho, retorna uma lista vazia.
export function listarcarrinho() {
  return JSON.parse(localStorage.getItem(CARRINHO_KEY) || "[]");
}

// Salva a lista atualizada do carrinho no localStorage.
// O localStorage guarda apenas texto, por isso a lista precisa virar JSON.
function salvarCarrinhoStorage(carrinho) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
}

// Conta todos os itens do carrinho somando a quantidade de cada produto.
export function contarItensCarrinho() {
  return listarcarrinho().reduce(
    // Se o produto nao tiver QuantidadeCarrinho, considera 1 unidade.
    (total, produto) => total + (produto.QuantidadeCarrinho || 1),
    0,
  );
}

// Adiciona um produto ao carrinho ou atualiza a quantidade se ele ja existir.
export function salvarCarrinho(produto, quantidade = 1) {
  const carrinho = listarcarrinho();

  // Garante que a quantidade salva nunca seja menor que 1.
  const quantidadeCarrinho = Math.max(1, Number(quantidade) || 1);

  // Procura no carrinho um produto com o mesmo Id.
  const produtoCarrinho = carrinho.find(item => item.Id === produto.Id);

  // O carrinho guarda apenas uma entrada por produto e atualiza a quantidade escolhida.
  if (produtoCarrinho) {
    produtoCarrinho.QuantidadeCarrinho = quantidadeCarrinho;
  } else {
    carrinho.push({ ...produto, QuantidadeCarrinho: quantidadeCarrinho });
  }

  salvarCarrinhoStorage(carrinho);
}

// Remove do carrinho o produto que tiver o mesmo Id do produto recebido.
export function removerCarrinho(produto) {
  const carrinho = listarcarrinho().filter(item => item.Id !== produto.Id);
  salvarCarrinhoStorage(carrinho);
}

// Verifica se o produto ja esta salvo no carrinho.
export function isCarrinho(produto) {
  return listarcarrinho().some(item => item.Id === produto.Id);
}
