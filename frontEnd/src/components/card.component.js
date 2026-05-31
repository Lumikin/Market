import criarImagemProduto from "./produto/imagen.component.js";
import { criarBotaoCarrinho } from "./button.component.js";

// Monta o card visual do produto e deixa a pagina decidir a acao do botao.
export default function criarCardProduto(produto) {
  // Cria a div principal do card.
  const card = document.createElement("div");
  card.className = "card produto-card";

  // Container usado para guardar a imagem do produto.
  const imageContainer = document.createElement("div");
  imageContainer.className = "overflow-hidden";

  // Cria a imagem usando o componente proprio de imagem.
  const imagem = criarImagemProduto(produto);
  imagem.classList.add("Produto-img");

  imageContainer.appendChild(imagem);

  // Corpo do card, onde ficam nome, preco, estoque e botao.
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Titulo do card com o nome do produto.
  const titulo = document.createElement("h5");
  titulo.className = "card-title";
  titulo.innerText = produto.nome;

  // Texto com o preco do produto.
  const preco = document.createElement("p");
  preco.className = "card-text fw-bold";
  preco.innerText = `R$ ${produto.preco}`;

  // Texto com o estoque disponivel.
  const quantidade = document.createElement("p");
  quantidade.className = "card-text fw-bold";
  quantidade.innerText = `Estoque: ${produto.estoque}`;

  // Botao criado por componente separado para manter o padrao do frontend.
  const botao = criarBotaoCarrinho();

  // O botao fica no final para que a pagina possa inserir controles antes dele.
  cardBody.append(titulo, preco, quantidade, botao);
  card.append(imageContainer, cardBody);

  return card;
}
