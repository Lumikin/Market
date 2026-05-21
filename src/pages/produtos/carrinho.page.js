import criarCardProduto from "../../components/card.component.js";
import { atualizarContadorCarrinho } from "../../components/nav.component.js";
import criarColunas from "../../components/shared/coluna-bootstrap.component.js";
import {
  atualizarQuantidadeCarrinho,
  listarcarrinho,
  removerCarrinho,
} from "../../storage/carrinho.storage.js";

function criarControleQuantidade(produto) {
  const quantidadeMaxima = produto.Quantidade || 99;
  let quantidade = Math.min(produto.QuantidadeCarrinho || 1, quantidadeMaxima);

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

  const salvarQuantidade = () => {
    atualizarQuantidadeCarrinho(produto, quantidade);
    atualizarContadorCarrinho();
    atualizarValor();
  };

  botaoMenos.addEventListener("click", () => {
    quantidade = Math.max(1, quantidade - 1);
    salvarQuantidade();
  });

  botaoMais.addEventListener("click", () => {
    quantidade = Math.min(quantidadeMaxima, quantidade + 1);
    salvarQuantidade();
  });

  controle.append(botaoMenos, valor, botaoMais);
  atualizarValor();

  return controle;
}

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
    const controleQuantidade = criarControleQuantidade(produto);

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

    button.before(controleQuantidade);
    coluna.appendChild(card);
    row.appendChild(coluna);
  });
}
