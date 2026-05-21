export function listarcarrinho() {
  return JSON.parse(localStorage.getItem("carrinho") || "[]"); // Pega o texto do banco e vira lista, se não tiver nada vira []
}

function buscarIdProduto(produto) {
  return produto.Id; // Retorna o campo ID do produto que foi passado
}

function salvarListaCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Transforma a lista em texto e grava no banco do navegador
}

export function contarItensCarrinho() {
  const carrinho = listarcarrinho(); // Busca a lista atualizada de produtos do carrinho
  let total = 0; // Cria a variável para guardar a soma das quantidades
  
  carrinho.forEach(item => { // Passa de item em item da lista do carrinho
    total = total + (Number(item.QuantidadeCarrinho) || 1); // Soma a quantidade do produto atual no valor total
  }); // Fecha o loop dos produtos

  return total; // Retorna o número total de itens somados
}

export function salvarCarrinho(produto, quantidade = 1) {
  const carrinho = listarcarrinho(); // Carrega os produtos que já estão salvos no carrinho
  
  let quantidadeCarrinho = Number(quantidade); // Transforma o texto da caixinha em número puro
  if (quantidadeCarrinho < 1) { // Se o número for inválido ou menor que um
    quantidadeCarrinho = 1; // Força a quantidade digitada a valer 1
  } // Fecha a verificação de segurança
  
  const jaExiste = carrinho.some( // Usa o some para testar se o produto já está na lista
    item => buscarIdProduto(item) === buscarIdProduto(produto) // Compara o ID de cada item com o ID do produto novo
  ); // Fecha a verificação do some

  if (jaExiste) { // Se o produto já foi adicionado antes no carrinho
    carrinho.forEach(item => { // Roda a lista para achar onde ele está escondido
      if (buscarIdProduto(item) === buscarIdProduto(produto)) { // Quando bater o ID do item com o ID do produto
        item.QuantidadeCarrinho = item.QuantidadeCarrinho + quantidadeCarrinho; // Soma a nova quantidade junto com a que já estava lá
      } // Fecha o if deIDs iguais
    }); // Fecha o loop de atualização
  } else { // Caso o produto seja totalmente novo no carrinho
    produto.QuantidadeCarrinho = quantidadeCarrinho; // Cria e guarda a quantidade escolhida direto no objeto dele
    carrinho.push(produto); // Joga o produto completo para o fim da lista do carrinho
  } // Fecha o bloco do else

  salvarListaCarrinho(carrinho); // Salva as alterações e atualiza a lista final no banco
}

export function removerCarrinho(produto) {
  const carrinho = listarcarrinho(); // Carrega os itens salvos atualmente no carrinho
  
  const carrinhoAtualizado = carrinho.filter( // Cria uma nova lista filtrando os itens existentes
    item => buscarIdProduto(item) !== buscarIdProduto(produto) // Deixa na lista apenas quem tiver ID diferente do produto clicado
  ); // Fecha a filtragem do filter

  salvarListaCarrinho(carrinhoAtualizado); // Salva essa nova lista limpa por cima da antiga
}

export function isCarrinho(produto) {
  const carrinho = listarcarrinho(); // Puxa os dados atuais salvos no carrinho

  return carrinho.some( // Verifica com o some e retorna true se o produto estiver lá ou false se não estiver
    item => buscarIdProduto(item) === buscarIdProduto(produto) // Compara os IDs para saber se o item já existe na lista
  ); // Fecha a checagem do some
}