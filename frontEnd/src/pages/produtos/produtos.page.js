import produtos from "../../../../backEnd/data/produtos.data.js"; // Importa a lista de produtos vinda do arquivo de dados
import criarCardProduto from "../../components/card.component.js"; // Importa a função que monta a caixinha do produto
import criarColunas from "../../components/shared/coluna-bootstrap.component.js"; // Importa a função que cria as colunas do Bootstrap
import { isCarrinho, removerCarrinho, salvarCarrinho, contarItensCarrinho, } from "../../storage/carrinho.storage.js"; // Importa as funções do banco do navegador

function criarControleQuantidade(produto) {
  let quantidadeMaxima = produto.Quantidade || 99; // Define o estoque máximo ou joga o padrão 99
  let quantidade = 1; // Inicia a quantidade do seletor sempre valendo 1 ao desenhar

  const controle = document.createElement("div"); // Cria a caixinha para segurar os botões de mais e menos
  controle.className = "controle-quantidade"; // Aplica a classe de estilo no controle de quantidade

  const botaoMenos = document.createElement("button"); // Cria o botão que diminui o número de itens
  botaoMenos.type = "button"; // Define o tipo dele como um botão comum
  botaoMenos.className = "btn-quantidade"; // Aplica a classe CSS de estilo no botão menos
  botaoMenos.innerText = "-"; // Coloca o símbolo de menos no texto do botão

  const valor = document.createElement("span"); // Cria o texto que exibe o número atualizado
  valor.className = "quantidade-valor"; // Aplica a classe CSS para formatar o texto do valor
  valor.innerText = quantidade; // Começa o texto da tela valendo 1

  const botaoMais = document.createElement("button"); // Cria o botão que aumenta o número de itens
  botaoMais.type = "button"; // Define o tipo dele como um botão comum
  botaoMais.className = "btn-quantidade"; // Aplica a classe CSS de estilo no botão mais
  botaoMais.innerText = "+"; // Coloca o símbolo de mais no texto do botão

  botaoMenos.addEventListener("click", () => { // Adiciona o evento de clique para diminuir
    if (quantidade > 1) { // Só diminui se a quantidade for maior que 1 (evita zerar ou ficar negativo)
      quantidade = quantidade - 1; // Subtrai uma unidade do valor atual de forma limpa
      valor.innerText = quantidade; // Atualiza o número direto na tela
    } // Fecha a checagem do botão menos
  }); // Fecha o clique do botão menos

  botaoMais.addEventListener("click", () => { // Adiciona o evento de clique para aumentar
    if (quantidade < quantidadeMaxima) { // Só aumenta se a quantidade for menor que o estoque máximo
      quantidade = quantidade + 1; // Soma uma unidade no valor atual
      valor.innerText = quantidade; // Atualiza o número direto na tela
    } // Fecha a checagem do botão mais
  }); // Fecha o clique do botão mais

  controle.getQuantidade = () => quantidade; // Cria a função para conseguirmos ler esse número fora daqui
  controle.append(botaoMenos, valor, botaoMais); // Coloca os botões e o texto dentro da caixinha do controle

  return controle; // Devolve a caixinha de quantidade prontinha para ser usada
}

function botaoCarrinho(botao, produtoNoCarrinho) {
  if (produtoNoCarrinho) { // Se o produto testado já estiver dentro do carrinho
    botao.className = "btn-remover w-100 justify-content-center"; // Aplica a classe de cor vermelha de remoção
    botao.innerText = "Remover do carrinho"; // Muda o texto interno para o usuário saber que pode remover
    return; // Para a execução da função aqui mesmo
  } // Fecha o bloco do if

  botao.className = "btn-primario w-100 justify-content-center"; // Aplica a classe padrão de cor azul ou rosa de compra
  botao.innerText = "Adicionar ao carrinho"; // Altera o texto para indicar que pode adicionar
}

export default function ProdutosPage() {
  const app = document.querySelector("#app"); // Seleciona a div principal onde a loja vai aparecer
  app.innerHTML = `
    <h1 class="titulo-pagina text-center">Produtos</h1>
    <div class="row mt-4" id="lista-produtos"></div>
  `; // Escreve o título da página e cria a linha para alinhar as caixas dos produtos

  const atualizarNumeroNavbar = () => {
    const btnCarrinhoNav = document.querySelector("#btnCarrinho"); // Busca o botão do carrinho lá no menu de cima
    if (btnCarrinhoNav) { // Se o botão do menu superior realmente existir na tela
      const totalItens = contarItensCarrinho(); // Conta a quantidade total de itens salvos usando a nossa função
      btnCarrinhoNav.innerHTML = `<span style="margin-right: 5px;">&#128722;</span> CARRINHO (${totalItens})`; // Atualiza o texto do menu com o ícone e o número novo
    } // Fecha a verificação do botão do menu
  }; // Fecha a função de atualizar a barra

  const row = document.querySelector("#lista-produtos"); // Seleciona a linha do HTML onde os cards vão entrar
  
  atualizarNumeroNavbar(); // Força o número da barra do topo a atualizar assim que entra na tela de produtos!

  produtos.forEach(produto => { // Inicia o loop para desenhar cada produto da lista de dados na vitrine
    let produtoNoCarrinho = isCarrinho(produto); // Testa se o produto atual já está guardado no carrinho
    const coluna = criarColunas(); // Cria o espaço da coluna do Bootstrap para alinhar o card
    const card = criarCardProduto(produto); // Monta o visual completo com foto, nome e preço do produto
    const button = card.querySelector("button"); // Localiza o botão de compra que veio criado dentro do card
    const controleQuantidade = criarControleQuantidade(produto); // Cria a caixinha de mais e menos para esse produto

    card.appendChild(controleQuantidade); // Coloca as caixinhas de [+] e [-] dentro do card usando o appendChild normal que vocês conhecem
    botaoCarrinho(button, produtoNoCarrinho); // Ajusta a cor e o texto do botão baseado se ele já está no carrinho

    button.addEventListener("click", () => { // Adiciona o evento de clique no botão de compra do card
      if (produtoNoCarrinho) { // Se o produto já estava no carrinho e o usuário clicou para tirar
        removerCarrinho(produto); // Executa a nossa função que apaga o item do banco de dados
        produtoNoCarrinho = false; // Altera a variável de controle indicando que ele saiu do carrinho
      } else { // Caso o produto não estivesse no carrinho e o usuário clicou para comprar
        salvarCarrinho(produto, controleQuantidade.getQuantidade()); // Salva o produto passando a quantidade marcada no seletor
        produtoNoCarrinho = true; // Altera a variável de controle indicando que ele agora está no carrinho
      } // Termina o bloco de decisão de adicionar ou remover

      botaoCarrinho(button, produtoNoCarrinho); // Atualiza visualmente a cor e o texto do botão que foi clicado
      atualizarNumeroNavbar(); // Atualiza o número de itens que aparece no menu fixo do topo do site
    }); // Fecha o evento de clique do botão do card

    coluna.appendChild(card); // Coloca o card do produto dentro da coluna do Bootstrap
    row.appendChild(coluna); // Coloca a coluna completa dentro da linha de produtos da página
  }); // Fecha o loop de desenho de todos os produtos da vitrine
}

export function ativarMenu(botaoClicado) {
  document.querySelectorAll(".nav-link").forEach(btn => { // Passa por todos os links do menu de navegação do site
    btn.style.color = ""; // Limpa a cor de todos os botões voltando ao padrão
    btn.style.fontWeight = "normal"; // Deixa a letra de todos os botões com a espessura normal
  }); // Fecha o loop de limpeza do menu

  botaoClicado.style.color = "#0d6efd"; // Pinta o botão clicado com a cor azul de destaque (padrão do Bootstrap)
  botaoClicado.style.fontWeight = "bold"; // Deixa a letra do botão clicado em negrito
}