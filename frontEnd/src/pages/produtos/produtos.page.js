import produtos from "../../../../backEnd/data/produtos.data.js";
import criarCardProduto from "../../components/card.component.js";
import { atualizarContadorCarrinho } from "../../components/nav.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import {
  isCarrinho,
  listarcarrinho,
  removerCarrinho,
  salvarCarrinho,
} from "../../storage/carrinho.storage.js";

function buscarProdutoCarrinho(produto) {
  return listarcarrinho().find(item => item.Id === produto.Id);
}

function criarControleQuantidade(produto, quantidadeInicial = 1) {
  const quantidadeMaxima = produto.Quantidade || 99;
  let quantidade = Math.min(quantidadeInicial, quantidadeMaxima);

  const controle = document.createElement("div");
  controle.className = "controle-quantidade";

  const botaoMenos = document.createElement("button");
  botaoMenos.type = "button";
  botaoMenos.className = "btn-quantidade";
  botaoMenos.innerText = "-";

  const valor = document.createElement("span");
  valor.className = "quantidade-valor";

  const botaoMais = document.createElement("button");
  botaoMais.type = "button";
  botaoMais.className = "btn-quantidade";
  botaoMais.innerText = "+";

  const atualizarValor = () => {
    valor.innerText = quantidade;
    botaoMenos.disabled = quantidade === 1;
    botaoMais.disabled = quantidade === quantidadeMaxima;
  };

  botaoMenos.addEventListener("click", () => {
    quantidade = Math.max(1, quantidade - 1);
    atualizarValor();
  });

  botaoMais.addEventListener("click", () => {
    quantidade = Math.min(quantidadeMaxima, quantidade + 1);
    atualizarValor();
  });

  controle.getQuantidade = () => quantidade;
  controle.append(botaoMenos, valor, botaoMais);
  atualizarValor();

  return controle;
}

function botaoCarrinho(botao, produtoNoCarrinho) {
  if (produtoNoCarrinho) {
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
   <h1 class="fw-bold text-center" style="color: #DB8787;">Produtos</h1>
<div class="row mt-4" id="lista-produtos"></div>
  `;

  const row = document.querySelector("#lista-produtos");
  produtos.forEach(produto => {
    let produtoNoCarrinho = isCarrinho(produto);
    const produtoCarrinho = buscarProdutoCarrinho(produto);
    const coluna = criarColunas();
    const card = criarCardProduto(produto);
    const button = card.querySelector("button");
    const controleQuantidade = criarControleQuantidade(
      produto,
      produtoCarrinho?.QuantidadeCarrinho || 1,
    );

    button.before(controleQuantidade);
    botaoCarrinho(button, produtoNoCarrinho);

    button.addEventListener("click", () => {
      produtoNoCarrinho = !produtoNoCarrinho;

      if (produtoNoCarrinho) {
        salvarCarrinho(produto, controleQuantidade.getQuantidade());
      } else {
        removerCarrinho(produto);
      }

      botaoCarrinho(button, produtoNoCarrinho);
      atualizarContadorCarrinho();
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
