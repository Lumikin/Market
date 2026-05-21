import criarCardProduto from "../../components/card.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import { listarcarrinho, removerCarrinho } from "../../storage/carrinho.storage.js";

export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app");
  
  // 1. Pegamos a lista atual de produtos do carrinho
  const carrinho = listarcarrinho();

  // 2. Criamos a estrutura usando o grid de 12 colunas do Bootstrap
  // A lista de produtos ocupa 8 colunas e o resumo do checkout ocupa 4 colunas (no desktop)
  app.innerHTML = `
    <h1 class="titulo-pagina text-center" style="font-family: 'Oswald'; color: #012549; margin-bottom: 32px;">Carrinho</h1>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="row" id="lista-carrinho"></div>
        </div>

        <div class="col-12 col-lg-4 mt-4 mt-lg-0">
          <div class="card p-4 shadow-sm border-0 bg-white" style="border-radius: 8px;">
            <h3 class="h5 fw-bold mb-3" style="font-family: 'Oswald'; color: #727272; text-transform: uppercase;">Resumo do Pedido</h3>
            <hr />
            
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="fs-5" style="font-family: 'Oswald'; color: #727272;">TOTAL:</span>
              <span class="fw-bold fs-3" id="valor-total-compra" style="font-family: 'Oswald'; color: #012549;">
                R$ 0,00
              </span>
            </div>
            
            <button class="btn-primario w-100 justify-content-center" id="btnCheckout" style="border: none;">
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const row = document.querySelector("#lista-carrinho");
  const txtTotal = document.querySelector("#valor-total-compra");

  // 3. Função interna para recalcular o total sempre que algo mudar
  const atualizarTotalAutomatico = () => {
    const listaAtualizada = listarcarrinho();
    const total = listaAtualizada.reduce((acc, prod) => acc + (prod.preco * (prod.quantidade || 1)), 0);
    txtTotal.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  // Inicializa o valor total logo de cara
  atualizarTotalAutomatico();

  // 4. Renderiza os cards na tela
  carrinho.forEach(produto => {
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");

    button.className = "btn-remover w-100 justify-content-center";
    button.innerText = "Remover do carrinho";

    button.addEventListener("click", () => {
      removerCarrinho(produto);
      coluna.remove();
      // Executa o cálculo automático assim que o item é excluído da tela!
      atualizarTotalAutomatico(); 
    });

    coluna.appendChild(card);
    row.appendChild(coluna);
  });

  // 5. Clique do botão de Checkout
  document.querySelector("#btnCheckout").addEventListener("click", () => {
    alert("Redirecionando para o Checkout...");
  });
}