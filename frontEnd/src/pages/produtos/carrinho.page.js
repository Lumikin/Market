import criarCardProduto from "../../components/card.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import {
  listarcarrinho,
  removerCarrinho,
} from "../../storage/carrinho.storage.js";

export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app");

  const carrinho = listarcarrinho();

  // A barra fixa deixa o total e o checkout sempre visiveis durante a rolagem.
  app.innerHTML = `
    <div class="container my-4" style="padding-bottom: 120px;"> 
      <h1 class="titulo-pagina text-center mb-4" style="font-family: 'Oswald'; color: #012549;">Carrinho</h1>
      <div class="row" id="lista-carrinho"></div>
    </div>

    <div class="fixed-bottom bg-white border-top shadow-lg p-3" id="footer-checkout-fixo" style="z-index: 1030;">
      <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
        
        <div class="d-flex align-items-center">
          <span class="fs-5 me-2 text-secondary" style="font-family: 'Oswald'; text-transform: uppercase;">Total da Compra:</span>
          <span class="fw-bold fs-2" id="valor-total-compra" style="font-family: 'Oswald'; color: #012549;">
            R$ 0,00
          </span>
        </div>

        <button class="btn-primario px-5 py-2" id="btnCheckout" style="border: none; font-size: 1.1rem;">
          FINALIZAR COMPRA
        </button>

      </div>
    </div>
  `;

  const row = document.querySelector("#lista-carrinho");
  const txtTotal = document.querySelector("#valor-total-compra");

  const atualizarTotalAutomatico = () => {
    const listaAtualizada = listarcarrinho();

    const total = listaAtualizada.reduce((acc, produto) => {
      // Usa o preco vindo do backend e a quantidade salva no carrinho.
      const preco = Number(produto.preco) || 0;
      const quantidade = Number(produto.QuantidadeCarrinho) || 1;
      return acc + preco * quantidade;
    }, 0);

    txtTotal.innerText = `R$ ${total.toFixed(2)}`; //Formato em reais com 2 casas decimais
  };

  atualizarTotalAutomatico();

  carrinho.forEach(produto => {
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");
    const quantidade = document.createElement("p");
    quantidade.className = "quantidade-carrinho";
    quantidade.innerText = `Quantidade: ${produto.QuantidadeCarrinho}`;

    if (button) {
      button.className = "btn-remover w-100 justify-content-center";
      button.innerText = "Remover do carrinho";

      button.addEventListener("click", () => {
        removerCarrinho(produto);
        coluna.remove();
        atualizarTotalAutomatico();
      });
    }

    button.before(quantidade);
    coluna.appendChild(card);
    row.appendChild(coluna);
  });

  document.querySelector("#btnCheckout").addEventListener("click", () => {
    alert("Processando checkout de compra...");
  });
}
