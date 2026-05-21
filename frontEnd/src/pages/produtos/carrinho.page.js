import criarCardProduto from "../../components/card.component.js";
import { atualizarContadorCarrinho } from "../../components/nav.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import { listarcarrinho, removerCarrinho } from "../../storage/carrinho.storage.js";

export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1 class="titulo-pagina text-center">Carrinho</h1>
    <div class="row mt-4" id="lista-carrinho"></div>
  `;

  const row = document.querySelector("#lista-carrinho");
  const carrinho = listarcarrinho();

  if (carrinho.length === 0) {
    row.innerHTML = `<p class="text-center">Seu carrinho esta vazio.</p>`;
    return;
  }

  carrinho.forEach(produto => {
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");
    const quantidade = document.createElement("p");
    quantidade.className = "quantidade-carrinho";
    quantidade.innerText = `Quantidade: ${produto.QuantidadeCarrinho || 1}`;

    button.className = "btn-remover w-100 justify-content-center";
    button.innerText = "Remover do carrinho";

    button.addEventListener("click", () => {
      removerCarrinho(produto);
      coluna.remove();
      atualizarContadorCarrinho();

      if (listarcarrinho().length === 0) {
        row.innerHTML = `<p class="text-center">Seu carrinho esta vazio.</p>`;
      }
    });

    button.before(quantidade);
    coluna.appendChild(card);
    row.appendChild(coluna);
  });
}
