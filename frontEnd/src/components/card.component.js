// DICA: Verifique se o nome do arquivo é "imagen" com 'n' mesmo, ou se foi erro de digitação para "imagem" com 'm'.
import criarImagemProduto from "./produto/imagen.component.js";
import { criarBotaoCarrinho } from "./button.component.js";
import {
  isCarrinho,
  removerCarrinho,
  salvarCarrinho,
} from "../storage/carrinho.storage.js";

export default function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "card produto-card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "overflow-hidden";

  const imagem = criarImagemProduto(produto);
  imagem.classList.add("Produto-img");

  imageContainer.appendChild(imagem);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const titulo = document.createElement("h5");
  titulo.className = "card-title";
  titulo.innerText = produto.Nome;

  const preco = document.createElement("p");
  preco.className = "card-text fw-bold";
  preco.innerText = `R$ ${produto.Preco}`;
  
  const botao = criarBotaoCarrinho();

  // CORREÇÃO: Executando a função e passando o produto!
  let Carrinho = isCarrinho(produto); 
  
  // Se o produto já vier do storage como "true", já aplicamos a classe na criação do card
  if (Carrinho) {
    card.classList.add("carrinho");
  }

  botao.addEventListener("click", () => {
    Carrinho = !Carrinho; // Inverte o valor (de true pra false ou vice-versa)
    
    // Liga ou desliga a classe dependendo do status atual
    card.classList.toggle("carrinho", Carrinho); 
    
    if (Carrinho) {
      salvarCarrinho(produto);
      // Aqui você também pode mudar o texto do botão: botao.innerText = "Remover";
    } else {
      removerCarrinho(produto);
      // Aqui você volta o texto: botao.innerText = "Adicionar ao carrinho";
    }
  });

  cardBody.append(titulo, preco, botao);
  card.append(imageContainer, cardBody);

  return card;
}