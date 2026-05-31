export function listarcarrinho() {
  return JSON.parse(localStorage.getItem("carrinho") || "[]");
}

function buscarIdProduto(produto) {
  return produto.Id;
}

function salvarListaCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

export function contarItensCarrinho() {
  return listarcarrinho().reduce(
    (total, produto) => total + (produto.QuantidadeCarrinho || 1),
    0,
  );
}

export function salvarCarrinho(produto, quantidade = 1) {
  const carrinho = listarcarrinho();
  const quantidadeCarrinho = Math.max(1, Number(quantidade) || 1);
  const produtoCarrinho = carrinho.find(
    item => buscarIdProduto(item) === buscarIdProduto(produto),
  );

  if (produtoCarrinho) {
    produtoCarrinho.QuantidadeCarrinho = quantidadeCarrinho;
  } else {
    carrinho.push({ ...produto, QuantidadeCarrinho: quantidadeCarrinho });
  }

  salvarListaCarrinho(carrinho);
}

export function removerCarrinho(produto) {
  const carrinho = listarcarrinho();
  const carrinhoAtualizado = carrinho.filter(
    item => buscarIdProduto(item) !== buscarIdProduto(produto),
  );
  salvarListaCarrinho(carrinhoAtualizado);
}

export function isCarrinho(produto) {
  const carrinho = listarcarrinho();
  return carrinho.some(
    item => buscarIdProduto(item) === buscarIdProduto(produto),
  );
}
