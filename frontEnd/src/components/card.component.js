import criarImagemProduto from "./produto/imagen.component.js";
import { criarBotaoCarrinho } from "./button.component.js";

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
  titulo.innerText = produto.nome;

  const preco = document.createElement("p");
  preco.className = "card-text fw-bold";
  preco.innerText = `R$ ${produto.preco}`;

  const quantidade = document.createElement("p");
  quantidade.className = "card-text fw-bold";
  quantidade.innerText = `Estoque: ${produto.estoque}`;

  const botao = criarBotaoCarrinho();

  cardBody.append(titulo, preco, quantidade, botao);
  card.append(imageContainer, cardBody);

  return card;
}
