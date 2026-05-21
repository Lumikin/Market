# 📑 Documentação Técnica: Estrutura de Pastas e Componentes do Front-End

Este documento descreve a organização arquitetural do projeto **Espricio Market**, detalhando a responsabilidade de cada diretório (pasta) e o funcionamento técnico de seus respectivos componentes e módulos.


##  1. Diretório `src/components/`
###  O que esta pasta tem de especial?
Este diretório é especializado na **Modularidade e Reutilização de Interface**. Sua função na arquitetura é abrigar funções puras que geram fragmentos isolados de HTML (UI Components). Estes componentes não gerenciam o estado global da aplicação nem sabem de onde os dados vêm; eles operam sob o princípio de responsabilidade única, recebendo parâmetros e devolvendo elementos prontos para o DOM.

### Componente: `card.component.js` (Cartão do Produto)
* **Objetivo:** Instanciar a estrutura visual e semântica que exibe as informações individuais de cada produto no catálogo.
* **Funcionamento:** Recebe um objeto de dados (`produto`) com atributos como imagem, nome e preço. Através do método `document.createElement('div')`, aloca o nó do cartão na memória e renderiza o conteúdo interno via propriedade `innerHTML`. Ele também pré-configura o botão de ação principal e retorna a referência desse elemento encapsulado (`return card`).

### Componente: `shared/coluna-bootstrap.component.js` (Coluna de Grid)
* **Objetivo:** Garantir a **responsividade** e a padronização geométrica do layout da aplicação.
* **Funcionamento:** Cria um contêiner estrutural (`<div>`) configurado estaticamente com as classes de grid utilitárias do Bootstrap (`col-12 col-md-4 col-lg-3`). Ele atua como um invólucro para os cartões de produtos, organizando-os automaticamente em quatro colunas em resoluções de desktop e readequando o tamanho para largura integral em telas de dispositivos móveis.

---

## 2. Diretório `src/pages/`
### O que esta pasta tem de especial?
Este diretório é responsável pela **Orquestração de Telas e Renderização de Visões**. Enquanto os componentes criam os pedaços isolados, as "Pages" são encarregadas de desenhar as interfaces completas do sistema. Elas realizam a limpeza do nó de montagem principal (`#app`), controlam os fluxos de iteração de dados (laços de repetição) e realizam a inserção ordenada dos elementos combinados na tela.

### Componente/Tela: `produtos.page.js` (Vitrine de Produtos)
* **Objetivo:** Estruturar e exibir o catálogo geral de mercadorias disponíveis na loja.
* **Mecanismos Internos:**
  * **`criarControleQuantidade(produto)`:** Função fábrica que gera o seletor incremental e decremental (`[+]` e `[-]`). Utiliza estruturas condicionais (`if`) para restringir a seleção ao intervalo matemático entre a unidade mínima (1) e o limite físico disponível no estoque.
  * **`botaoCarrinho(botao, produtoNoCarrinho)`:** Rotina condicional encarregada de verificar se o item avaliado já consta no repositório local, alternando dinamicamente as classes CSS (`className`) e o texto descritivo do botão entre o modo de inserção e o modo de remoção.
  * **Laço de Repetição (`produtos.forEach`):** Varre a coleção de dados do catálogo, instancia um componente de coluna e um de cartão para cada item, acopla o seletor de quantidade através do método `appendChild()` e renderiza o conjunto final na linha da página.

###  Componente/Tela: `carrinho.page.js` (Tela de Gerenciamento do Carrinho)
* **Objetivo:** Listar os produtos selecionados pelo usuário, gerenciar suas quantidades e consolidar os valores financeiros da transação.
* **Mecanismos Internos:**
  * **Interface Persistente:** Injeta a estrutura de listagem e uma seção fixa no rodapé (`fixed-bottom`) para exibição do somatório financeiro e do gatilho de encerramento (`#btnCheckout`).
  * **`atualizarTotalAutomatico()`:** Rotina que executa um laço `.forEach()` nos registros do carrinho, sanitiza as strings monetárias com métodos `.replace()`, converte-as para o tipo nativo `Number()`, computa a multiplicação distributiva pelas quantidades compradas e atualiza o DOM formatando o valor final com duas casas decimais através da instrução `.toFixed(2)`.
  * **Desacoplamento Síncrono:** Ao capturar o evento de clique para exclusão, delega a remoção lógica ao armazenamento e remove fisicamente o nó do DOM com o método `coluna.remove()`, atualizando a interface em tempo real sem necessidade de recarregamento.

---

##  3. Diretório `src/storage/`
### O que esta pasta tem de especial?
Esta pasta é caracterizada pela **Persistência de Dados e Desacoplamento Visual**. Ela não possui nenhuma relação com o HTML ou estilização visual. Seu único propósito arquitetural é gerenciar o ciclo de vida das informações manipuladas pelo usuário, fazendo com que o navegador memorize os itens escolhidos (mesmo se a aba for fechada) por meio da API do `localStorage`.

###  Módulo: `carrinho.storage.js` (Controlador de Persistência Local)
* **Objetivo:** Abstrair e gerenciar todas as operações de leitura e escrita em baixo nível na memória cache do navegador.
* **Mecanismos Internos:**
  * **`listarcarrinho()`:** Recupera a cadeia de texto do `localStorage` e utiliza o método `JSON.parse()` para desserializá-la em um array de objetos utilizável pelo JavaScript. Implementa uma segurança lógica (`|| "[]"`) para retornar uma coleção vazia caso nenhum registro seja localizado.
  * **`salvarCarrinho(produto, quantidade)`:** Valida a existência prévia do item via método `.some()`. Caso seja detectado, aplica uma iteração `.forEach()` para localizar o objeto e incrementar seu atributo quantitativo; caso contrário, define a quantidade inicial e realiza a inserção no vetor via `.push()`. Por fim, atualiza o cache utilizando o `JSON.stringify()`.
  * **`removerCarrinho(produto)`:** Utiliza o método de filtragem de arrays `.filter()` para produzir um novo vetor purificado, contendo apenas os objetos cujo identificador exclusivo (`id`) seja divergente daquele que foi solicitado para expurgo.
  * **`contarItensCarrinho()`:** Consolida a somatória volumétrica de unidades armazenadas através de um acumulador em um laço `.forEach()`, servindo como fonte de dados quantitativa para atualizar o indicador dinâmico presente no topo do menu de navegação (`CARRINHO (N)`).