export function criarBotaoCarrinho(carrinho = false) {
  const botao = document.createElement("button");
  botao.className = "btn btn-primary w-100";
  botao.innerText = "Adicionar ao carrinho";
  
  return botao
}
