import criarCardProduto from "../../components/card.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import {
  listarcarrinho,
  removerCarrinho,
} from "../../storage/carrinho.storage.js";

export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app");

  const carrinho = listarcarrinho();

  // Estrutura padrão: Seus cards + a barra fixa embaixo que foi pedida
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

  // Função de soma direta e sem firulas
  const atualizarTotalAutomatico = () => {
    const listaAtualizada = listarcarrinho();

    const total = listaAtualizada.reduce((acc, prod) => {
      // Pega o preço (testando maiúsculo ou minúsculo que vocês usaram no projeto)
      let preco = prod.Preco || prod.preco || prod.Valor || prod.valor || 0;

      // Se o preço for um texto (ex: "R$ 410"), limpa para virar número puro (410)
      if (typeof preco === "string") {
        preco = preco.replace("R$", "").replace(" ", "").replace(",", ".");
      }

      const precoNumerico = parseFloat(preco) || 0;
      
      // Pega a quantidade exata do carrinho definida no seu storage
      const quantidadeProdutos = parseInt(prod.QuantidadeCarrinho) || 1;

      // Retorna a soma multiplicando o preço pela quantidade do item
      return acc + (precoNumerico * quantidadeProdutos);
    }, 0);

    // Coloca o valor formatado bonitinho na tela
    txtTotal.innerText = `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  };

  // Executa a soma assim que abre a página
  atualizarTotalAutomatico();

  carrinho.forEach(produto => {
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");
    const quantidade = document.createElement("p");
    quantidade.className = "quantidade-carrinho";
    quantidade.innerText = `Quantidade: ${produto.QuantidadeCarrinho || 1}`;

    if (button) {
      button.className = "btn-remover w-100 justify-content-center";
      button.innerText = "Remover do carrinho";

      button.addEventListener("click", () => {
        removerCarrinho(produto);
        coluna.remove();
        atualizarTotalAutomatico(); // Recalcula quando clica em remover
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