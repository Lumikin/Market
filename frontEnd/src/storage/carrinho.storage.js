export function listarcarrinho() {
  return JSON.parse(localStorage.getItem('carrinho') || "[]");
}

function buscarIdProduto(produto) {
  return produto.Id;
}

export function salvarCarrinho(produto) {
  const carrinho = listarcarrinho();
  const jaExiste = carrinho.some(
    item => buscarIdProduto(item) === buscarIdProduto(produto),
  );

  if (!jaExiste) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}

export function removerCarrinho(produto) {
  const carrinho = listarcarrinho();
  const carrinhoAtualizado = carrinho.filter(
    item => buscarIdProduto(item) !== buscarIdProduto(produto),
  );
  localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
}

export function isCarrinho(produto) {
  const carrinho = listarcarrinho();
  return carrinho.some(
    item => buscarIdProduto(item) === buscarIdProduto(produto),
  );
}
