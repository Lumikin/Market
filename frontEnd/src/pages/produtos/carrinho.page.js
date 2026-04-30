import criarCardProduto from "../../components/card.component";
import criarColunas from "../../components/shared/coluna-bootstrap.component";
import { listarcarrinho } from "../../storage/carrinho.storage";
export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app");
  app.innerHTML = `
<h1 class="fw-bold text-primary text-center">Carrinho</h1>
<div class="row mt-4" id="lista-personagens">
</div>
  `;

  const row = document.querySelector("#lista-personagens");

  const carrinho = listarcarrinho();
  carrinho.forEach(favorito => {
    const coluna = criarColunas();
    const card = criarCardProduto(favorito);

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      coluna.remove();
    });

    coluna.appendChild(card);
    row.appendChild(coluna);
  });
}
