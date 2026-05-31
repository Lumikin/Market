import criarCardProduto from "../../components/card.component.js";
import criarControleQuantidade from "../../components/produto/quantidade.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import produtosMock from "../../../../backEnd/data/produtos.data.js";
import {
  isCarrinho,
  listarcarrinho,
  removerCarrinho,
  salvarCarrinho,
  contarItensCarrinho,
} from "../../storage/carrinho.storage.js";
import { buscarProdutos } from "../../services/produtos.api.js";

// Procura o produto no carrinho para reaproveitar a quantidade ja escolhida.
function buscarProdutoCarrinho(produto) {
  return listarcarrinho().find(item => item.Id === produto.Id);
}

// Altera o texto e a cor do botao conforme o produto esteja ou nao no carrinho.
function botaoCarrinho(botao, produtoNoCarrinho) {
  if (produtoNoCarrinho) {
    botao.className = "btn-remover w-100 justify-content-center";
    botao.innerText = "Remover do carrinho";
    return;
  }

  botao.className = "btn-primario w-100 justify-content-center";
  botao.innerText = "Adicionar ao carrinho";
}

export default async function ProdutosPage() {
  const app = document.querySelector("#app");

  // Estrutura inicial da pagina antes de carregar os produtos.
  app.innerHTML = `
    <h1 class="titulo-pagina text-center">Produtos</h1>
    <div class="row mt-4" id="lista-produtos"></div>
  `;

  // Atualiza o contador exibido no botao do carrinho da navbar.
  const atualizarNumeroNavbar = () => {
    const btnCarrinhoNav = document.querySelector("#btnCarrinho");
    if (btnCarrinhoNav) {
      const totalItens = contarItensCarrinho();
      btnCarrinhoNav.innerHTML = `<span style="margin-right: 5px;">&#128722;</span> CARRINHO (${totalItens})`;
    }
  };

  const row = document.querySelector("#lista-produtos");
  row.innerHTML = `<div class="col-12 text-center py-5">Carregando produtos...</div>`;

  // Busca os produtos no backend.
  let produtos = await buscarProdutos();
  console.log(produtos);

  // Se a API nao responder ou vier vazia, usa a massa local para preservar a vitrine.
  if (!produtos || produtos.length === 0) {
    produtos = produtosMock;
    console.error("Usando Mock!");
  }

  row.innerHTML = "";

  // Cria um card para cada produto retornado.
  produtos.forEach(produto => {
    let produtoNoCarrinho = isCarrinho(produto);
    const produtoCarrinho = buscarProdutoCarrinho(produto);
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");

    // O controle comeca na quantidade ja salva no carrinho, se existir.
    const controleQuantidade = criarControleQuantidade(
      produto,
      produtoCarrinho?.QuantidadeCarrinho || 1,
    );

    button.before(controleQuantidade);
    botaoCarrinho(button, produtoNoCarrinho);

    // Alterna entre adicionar e remover o produto do carrinho.
    button.addEventListener("click", () => {
      if (produtoNoCarrinho) {
        removerCarrinho(produto);
        produtoNoCarrinho = false;
      } else {
        salvarCarrinho(produto, controleQuantidade.dataset.quantidade);
        produtoNoCarrinho = true;
      }

      botaoCarrinho(button, produtoNoCarrinho);
      atualizarNumeroNavbar();
    });

    coluna.appendChild(card);
    row.appendChild(coluna);
  });
}

// Marca visualmente o item ativo do menu.
export function ativarMenu(botaoClicado) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.remove("active", "text-primary", "fw-bold");
  });

  botaoClicado.classList.add("active", "text-primary", "fw-bold");
}
