import criarImagemProduto from "./produto/imagen.component.js";
import { criarBotaoCarrinho } from "./button.component.js";

/**
 * COMPONENTE: Cria a estrutura visual (Card) de um produto individual.
 * @param {Object} produto - Objeto contendo Nome, Preco, Imagem, etc.
 */
export default function criarCardProduto(produto) {
  // 1. Cria o container principal do card
  const card = document.createElement("div");
  card.className = "card produto-card";

  // 2. Cria o container da imagem com trava de segurança (overflow-hidden)
  // Isso garante que se a imagem for grande demais, ela não "vaze" do card
  const imageContainer = document.createElement("div");
  imageContainer.className = "overflow-hidden";

  // 3. Chama o componente especializado em tratar a imagem
  const imagem = criarImagemProduto(produto);
  imagem.classList.add("Produto-img");

  imageContainer.appendChild(imagem);

  // 4. Cria a área de conteúdo (texto e botões)
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Título do Produto
  const titulo = document.createElement("h5");
  titulo.className = "card-title";
  titulo.innerText = produto.Nome;

  // Preço formatado
  const preco = document.createElement("p");
  preco.className = "card-text fw-bold";
  preco.innerText = `R$ ${produto.Preco}`;

  // 5. Cria o botão de ação (Adicionar/Remover)
  const botao = criarBotaoCarrinho();

  // 6. MONTAGEM: Organiza as peças dentro do card-body e do card principal
  cardBody.append(titulo, preco, botao);
  card.append(imageContainer, cardBody);

  // Retorna o elemento pronto para ser pendurado no DOM (no HTML)
  return card;
}