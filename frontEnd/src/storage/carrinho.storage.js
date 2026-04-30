export function salvarCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  const jaExiste = carrinho.some(fav => fav.Name === produto.Name);
  if (!jaExiste) {
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}
export function removerCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  const carrinhoAtualizados = carrinho.filter(fav => fav.Name !== produto.Name);
  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizados));
}

export function isCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  return carrinho.some(fav => fav.Name === produto.Name);
}

export function listarcarrinho() {
  return JSON.parse(localStorage.getItem("carrinho") || "[]");
}
