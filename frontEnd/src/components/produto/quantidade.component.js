export default function criarControleQuantidade(
  produto,
  quantidadeInicial = 1,
) {
  const quantidadeMaxima = Math.max(1, Number(produto.estoque)); // Garante que o estoque seja pelo menos 1
  let quantidade = Math.min(
    Math.max(1, Number(quantidadeInicial)), // Garante que a quantidade inicial seja pelo menos 1
    quantidadeMaxima,
  );

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
    controle.dataset.quantidade = quantidade;
    botaoMenos.disabled = quantidade === 1;
    botaoMais.disabled = quantidade === quantidadeMaxima;
  };

  // Mantem a quantidade entre 1 e o estoque disponivel do produto.
  botaoMenos.addEventListener("click", () => {
    quantidade = Math.max(1, quantidade - 1);
    atualizarValor();
  });

  botaoMais.addEventListener("click", () => {
    quantidade = Math.min(quantidadeMaxima, quantidade + 1);
    atualizarValor();
  });

  controle.append(botaoMenos, valor, botaoMais);
  atualizarValor();

  return controle;
}
