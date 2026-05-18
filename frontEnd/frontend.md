# Frontend

Documentacao do frontend do projeto **Espricio Market**.

## Visao geral

O frontend e uma aplicacao web simples de catalogo e carrinho, criada com
Vite e JavaScript puro. A interface exibe produtos em cards, permite adicionar
e remover itens do carrinho e salva os itens selecionados no `localStorage` do
navegador.

Atualmente os produtos sao carregados de um arquivo local do backend:

```js
backEnd/data/produtos.data.js
```

## Tecnologias

- Vite: servidor de desenvolvimento e build.
- JavaScript ES Modules: organizacao dos componentes e paginas.
- Bootstrap: grid, navbar e classes utilitarias via CDN no `index.html`.
- CSS proprio: estilos globais e variaveis de cor em `src/styles.css`.
- localStorage: persistencia local do carrinho.

## Como executar

Entre na pasta do frontend:

```bash
cd frontEnd
```

Instale as dependencias:

```bash
npm install
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

Gere a build de producao:

```bash
npm run build
```

Visualize a build localmente:

```bash
npm run preview
```

## Estrutura de pastas

```text
frontEnd/
  index.html
  package.json
  public/
    Not-Found.jpg
    assets/
  src/
    main.js
    styles.css
    components/
      button.component.js
      card.component.js
      nav.component.js
      produto/
        imagen.component.js
      shared/
        coluna-bootstrap.component.js
    pages/
      produtos/
        produtos.page.js
        carrinho.page.js
    storage/
      carrinho.storage.js
```

## Entrada da aplicacao

Arquivo: `src/main.js`

Responsabilidades:

- Importa as paginas de produtos e carrinho.
- Cria a navbar inicial.
- Renderiza a pagina de produtos ao carregar a aplicacao.
- Registra os eventos dos botoes `HOME` e `CARRINHO`.
- Alterna o menu ativo usando `ativarMenu`.

Fluxo inicial:

1. `criaNavbar()` monta o cabecalho.
2. `ProdutosPage()` renderiza a listagem de produtos.
3. Os botoes da navbar passam a trocar o conteudo dentro de `#app`.

## Paginas

### Produtos

Arquivo: `src/pages/produtos/produtos.page.js`

Renderiza a tela principal de produtos.

Responsabilidades:

- Limpa e recria o conteudo de `#app`.
- Importa a lista de produtos de `backEnd/data/produtos.data.js`.
- Cria uma coluna Bootstrap para cada produto.
- Cria um card para cada produto.
- Verifica se o produto ja esta no carrinho.
- Alterna o botao entre:
  - `Adicionar ao carrinho`
  - `Remover do carrinho`
- Salva ou remove produtos no `localStorage`.

### Carrinho

Arquivo: `src/pages/produtos/carrinho.page.js`

Renderiza a tela de carrinho.

Responsabilidades:

- Busca os produtos salvos no `localStorage`.
- Exibe cada produto em um card.
- Configura o botao de cada card para remover o item do carrinho.
- Remove o card da tela apos a remocao.

## Componentes

### Navbar

Arquivo: `src/components/nav.component.js`

Cria a barra de navegacao fixa no topo da pagina.

Elementos principais:

- Marca: `Espricio Market`.
- Botao `HOME`.
- Botao `CARRINHO (0)`.

Tambem exporta `ativarMenu(botaoClicado)`, funcao usada para marcar o botao
ativo na navegacao.

### Card de produto

Arquivo: `src/components/card.component.js`

Cria o card visual de um produto.

Campos usados do produto:

- `Nome`
- `Preco`
- `Imagem`

O card e composto por:

- Imagem do produto.
- Nome.
- Preco.
- Botao de carrinho.

### Botao de carrinho

Arquivo: `src/components/button.component.js`

Cria o botao padrao de adicionar ao carrinho.

Estado inicial:

```text
Adicionar ao carrinho
```

As paginas alteram o texto e a classe do botao conforme o item esteja ou nao
no carrinho.

### Imagem do produto

Arquivo: `src/components/produto/imagen.component.js`

Cria a tag `img` do produto.

Regras:

- Usa `produto.Nome` como texto alternativo.
- Usa `produto.Imagem` quando existir.
- Usa `/Not-Found.jpg` quando nao houver imagem.
- Define altura fixa de `360px`.
- Usa `object-fit: cover` quando existe imagem.

### Coluna Bootstrap

Arquivo: `src/components/shared/coluna-bootstrap.component.js`

Cria uma coluna responsiva para os cards.

Classes usadas:

```text
col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4
```

Com isso, a listagem ocupa:

- 1 card por linha em telas pequenas.
- 2 cards por linha em telas medias.
- 3 cards por linha em telas grandes.
- 4 cards por linha em telas extra grandes.

## Carrinho e persistencia

Arquivo: `src/storage/carrinho.storage.js`

O carrinho e salvo no `localStorage` com a chave:

```text
carrinho
```

Funcoes disponiveis:

- `listarcarrinho()`: retorna todos os itens salvos.
- `salvarCarrinho(produto)`: adiciona um produto se ele ainda nao existir.
- `removerCarrinho(produto)`: remove o produto pelo `Id`.
- `isCarrinho(produto)`: verifica se o produto ja esta salvo.

A identificacao dos produtos e feita pelo campo:

```text
Id
```

## Estilos

Arquivo: `src/styles.css`

Define:

- Variaveis de cores no `:root`.
- Fonte principal `Oswald`.
- Espacamento superior do `body` para compensar a navbar fixa.
- Classes de botoes:
  - `.btn-primario`
  - `.btn-remover`
  - `.btn-secundario`
- Classe `.bg-navy` para a navbar.
- Classe `.titulo-pagina`.
- Ajustes dos links da navbar.

## Assets

Imagens publicas ficam em:

```text
frontEnd/public/
```

Produtos usam caminhos como:

```text
/assets/s24.png
```

Como o Vite serve a pasta `public` a partir da raiz da aplicacao, esses
caminhos ficam disponiveis diretamente no navegador.

## Dependencia com o backend

Apesar de existir backend no projeto, o frontend ainda nao consome API HTTP.
Os dados de produtos sao importados diretamente do arquivo:

```js
backEnd/data/produtos.data.js
```

Para evoluir para consumo via API, a pagina `produtos.page.js` deve substituir
esse import direto por uma chamada HTTP, por exemplo usando `axios`, que ja esta
instalado no `package.json`.

## Observacoes tecnicas

- O projeto usa manipulacao direta do DOM, sem framework de interface.
- A navegacao troca apenas o conteudo do elemento `#app`.
- O estado do carrinho sobrevive ao recarregamento da pagina por usar
  `localStorage`.
- O contador visual `CARRINHO (0)` ainda nao e atualizado dinamicamente.
- Bootstrap CSS e JS sao carregados por CDN no `index.html`.
