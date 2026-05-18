export function criarBotaoCarrinho(carrinho = false) {
  const botao = document.createElement("button");
  botao.className = "btn-primario w-100 justify-content-center";
  botao.innerText = "Adicionar ao carrinho";
  
  return botao
}
