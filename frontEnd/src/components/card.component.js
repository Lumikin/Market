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
  titulo.innerText = produto.Nome;

  const preco = document.createElement("p");
  preco.className = "card-text fw-bold";
  preco.innerText = `R$ ${produto.Preco}`;

  const botao = criarBotaoCarrinho();

  cardBody.append(titulo, preco, botao);
  card.append(imageContainer, cardBody);

  return card;
}
