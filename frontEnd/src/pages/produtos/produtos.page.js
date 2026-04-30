import produtos from "../../../data/produtos.data.js";
import criarCardProduto from "../../components/card.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";

export default function ProdutosPage() {
  const app = document.querySelector("#app");
  app.innerHTML = `
  <h1 class="fw-bold text-primary"> Market </h1>
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
