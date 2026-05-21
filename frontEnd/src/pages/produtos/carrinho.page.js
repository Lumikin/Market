import criarCardProduto from "../../components/card.component.js"; // Importa a função que cria a caixinha visual do produto
import criarColunas from "../../components/shared/coluna-bootstrap.component.js"; // Importa o sistema de colunas para alinhar os cards
import { listarcarrinho, removerCarrinho, contarItensCarrinho } from "../../storage/carrinho.storage.js"; // Importa as três funções juntas do storage

export default function carrinhoProdutosPage() {
  const app = document.querySelector("#app"); // Seleciona a div principal onde a página vai ser desenhada
  const carrinho = listarcarrinho(); // Puxa os produtos salvos no carrinho para começar a usar

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
  `; // Fecha a estrutura em texto HTML que monta a página e a barra do total fixada embaixo

  const row = document.querySelector("#lista-carrinho"); // Seleciona a linha onde os cards dos produtos vão entrar
  const txtTotal = document.querySelector("#valor-total-compra"); // Seleciona o texto onde vai aparecer o valor total somado

  const atualizarTotalAutomatico = () => {
    const listaAtualizada = listarcarrinho(); // Busca a lista de produtos atualizada direto do banco
    let total = 0; // Cria a variável começando em zero para somar os valores dentro dela

    listaAtualizada.forEach(prod => { // Inicia o loop para olhar cada produto que está dentro do carrinho
      let preco = prod.Preco || prod.preco || prod.Valor || prod.valor || 0; // Tenta ler o preço usando as letras maiúsculas ou minúsculas

      if (typeof preco === "string") { // Se o preço vier escrito como texto com R$ no meio
        preco = preco.replace("R$", "").replace(" ", "").replace(",", "."); // Tira o símbolo, limpa o espaço e troca a vírgula por ponto
      } // Fecha o bloco de limpeza do texto

      const precoNumerico = Number(preco) || 0; // Transforma o texto limpo do preço em número usando o Number comum
      const quantidadeProdutos = Number(prod.QuantidadeCarrinho) || 1; // Transforma a quantidade salva em número usando o Number comum

      total = total + (precoNumerico * quantidadeProdutos); // Multiplica o preço pela quantidade e junta o resultado no valor total
    }); // Fecha o loop de soma dos produtos

    txtTotal.innerText = "R$ " + total.toFixed(2); // Mostra o valor somado na tela formatando com duas casas depois do ponto
  }; // Termina a função de atualização do preço

  // Atualiza o número (N) no botão fixo da barra de navegação superior do site
  const atualizarNumeroNavbar = () => {
    const btnCarrinhoNav = document.querySelector("#btnCarrinho"); // Busca o botão do carrinho lá no menu de cima
    if (btnCarrinhoNav) { // Se o botão do menu superior realmente existir na tela
      const totalItens = contarItensCarrinho(); // Conta a quantidade total de itens salvos usando a nossa função
      btnCarrinhoNav.innerHTML = `<span style="margin-right: 5px;">&#128722;</span> CARRINHO (${totalItens})`; // Atualiza o texto do menu com o ícone e o número novo
    } // Fecha a verificação do botão do menu
  }; // Fecha a função de atualizar a barra

  atualizarTotalAutomatico(); // Executa a função da soma logo que a página termina de abrir
  atualizarNumeroNavbar(); // Força a barra do topo a se atualizar de acordo com o carrinho atual na abertura da página

  carrinho.forEach(produto => { // Entra no loop para desenho de cada produto na tela do usuário
    const coluna = criarColunas(); // Cria o espaço da coluna do Bootstrap para o produto encaixar
    const card = criarCardProduto(produto); // Cria a estrutura visual com foto, nome e preço do produto
    const button = card.querySelector("button"); // Acha o botão que veio criado automaticamente dentro do card
    
    const quantidade = document.createElement("p"); // Cria um parágrafo novo no HTML para escrever a quantidade
    quantidade.className = "quantidade-carrinho"; // Adiciona a classe de estilo para o parágrafo de quantidade
    quantidade.innerText = "Quantidade: " + (produto.QuantidadeCarrinho || 1); // Junta o texto com a propriedade de quantidade do produto

    if (button) { // Se o botão do card realmente existir na tela
      button.className = "btn-remover w-100 justify-content-center"; // Muda a classe dele para aplicar a cor de botão de remover
      button.innerText = "Remover do carrinho"; // Altera o texto original para avisar que ele agora serve para excluir

      button.addEventListener("click", () => { // Adiciona o evento de clique no botão de remover
        removerCarrinho(produto); // Apaga o produto do banco de dados do navegador
        coluna.remove(); // Remove a coluna inteira com o card da tela na mesma hora
        atualizarTotalAutomatico(); // Roda a função de somar novamente para atualizar o rodapé fixo
        atualizarNumeroNavbar(); // Atualiza a barra de navegação reduzindo a contagem na mesma hora do clique
      }); // Fecha o evento de clique do botão
    } // Fecha a verificação do botão

    card.appendChild(quantidade); // Coloca o texto da quantidade dentro do card usando o appendChild normal que vocês conhecem
    coluna.appendChild(card); // Coloca o card pronto dentro do sistema de colunas
    row.appendChild(coluna); // Joga a coluna completa com o produto para dentro da linha da página
  }); // Fecha o loop de desenho dos produtos na tela

  document.querySelector("#btnCheckout").addEventListener("click", () => { // Adiciona o evento de clique no botão de finalizar
    alert("Processando checkout de compra..."); // Dispara um aviso simples na tela avisando que deu certo
  }); // Fecha o evento do botão de finalizar
} // Fecha a função principal da página do carrinho