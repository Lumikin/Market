  import produtos from "../../../../backEnd/data/produtos.data.js";
  import criarCardProduto from "../../components/card.component.js";
  import criarColunas from "../../components/shared/coluna-bootstrap.component.js";

  export default function ProdutosPage() {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <h1 class="fw-bold text-primary text-center"> Market </h1>
    <div class="row mt-4" id="lista-produtos"></div>
  `;

    const row = document.querySelector("#lista-produtos");
    produtos.forEach(produto => {
      const coluna = criarColunas();
      const card = criarCardProduto(produto);
      coluna.appendChild(card);
      row.appendChild(coluna);
    });

    // const produtoImage = produtos.forEach(produto => {
    //   console.log(produto.Imagem);
    // });
  }
  export function ativarMenu(botaoClicado) {
    document.querySelectorAll(".nav-link").forEach(btn => {
      btn.classList.remove("active", "text-primary", "fw-bold");
    });

    botaoClicado.classList.add("active", "text-primary", "fw-bold");
  }