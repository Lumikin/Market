import produtos from "../../../../backEnd/data/produtos.data.js";
import criarCardProduto from "../../components/card.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import {
  isCarrinho,
  removerCarrinho,
  salvarCarrinho,
} from "../../storage/carrinho.storage.js";

function botaoCarrinho(botao, produto) {
  if (produto) {
    botao.className = "btn-remover w-100 justify-content-center";
    botao.innerText = "Remover do carrinho";
    return;
  }

  botao.className = "btn-primario w-100 justify-content-center";
  botao.innerText = "Adicionar ao carrinho";
}

export default function ProdutosPage() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1 class="titulo-pagina text-center">Produtos</h1>
    <div class="row mt-4" id="lista-produtos"></div>
  `;

  const row = document.querySelector("#lista-produtos");
  produtos.forEach(produto => {
    let Carrinho = isCarrinho(produto);
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");
    botaoCarrinho(button, Carrinho);

    button.addEventListener("click", () => {
      Carrinho = !Carrinho;

      if (Carrinho) {
        salvarCarrinho(produto);
      } else {
        removerCarrinho(produto);
      }

      botaoCarrinho(button, Carrinho);
    });

    coluna.appendChild(card);
    row.appendChild(coluna);
  });
}

export function ativarMenu(botaoClicado) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.remove("active", "text-primary", "fw-bold");
  });

  botaoClicado.classList.add("active", "text-primary", "fw-bold");
}
