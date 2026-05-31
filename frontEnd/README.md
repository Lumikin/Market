# Frontend

Documentacao do frontend do projeto Market.

## Objetivo

Esta pasta contem a interface da aplicacao, responsavel por exibir telas, formularios e fluxos de interacao com o usuario. O frontend consome os dados fornecidos pela API do backend e apresenta funcionalidades relacionadas ao mercado, como produtos, categorias e pedidos.

## Estrutura

A organizacao dos arquivos pode variar conforme a evolucao do projeto, mas a pasta `frontEnd` deve concentrar apenas recursos da camada visual da aplicacao, como:

- paginas e telas da interface;
- componentes reutilizaveis;
- arquivos de estilo;
- imagens e outros assets;
- configuracoes especificas do cliente web;
- integracoes com a API.

## Responsabilidades do frontend

O frontend deve cuidar de:

- apresentar os dados de forma clara para o usuario;
- enviar requisicoes para o backend quando precisar listar, criar, editar ou remover informacoes;
- validar campos de formulario antes do envio, quando aplicavel;
- tratar mensagens de erro e sucesso retornadas pela API;
- manter a navegacao entre telas da aplicacao;
- organizar estilos e componentes de forma reutilizavel.

## Comunicacao com o backend

As chamadas para a API devem apontar para o servidor backend do projeto. Em ambiente local, normalmente o backend roda em uma porta separada do frontend.

Ao configurar requisicoes HTTP, mantenha a URL base centralizada sempre que possivel. Isso facilita alterar o endereco da API entre desenvolvimento, testes e producao.

Exemplo conceitual:

```js
const API_URL = "http://localhost:3000";
```

As rotas consumidas pelo frontend devem acompanhar as rotas expostas pelo backend.

## Como executar

Entre na pasta do frontend:

```bash
cd frontEnd
```

Instale as dependencias, caso o projeto utilize um gerenciador como npm:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Caso o projeto use outro comando de inicializacao, consulte o arquivo de configuracao do frontend, como `package.json`.

## Boas praticas

- mantenha componentes pequenos e com responsabilidade clara;
- evite duplicar logica de requisicoes HTTP em varias telas;
- separe estilos globais de estilos especificos de componentes;
- trate estados de carregamento, erro e vazio nas telas que exibem dados;
- mantenha nomes de arquivos e pastas consistentes;
- nao coloque regras de negocio do backend dentro do frontend.

## Manutencao

Ao adicionar uma nova tela ou funcionalidade:

1. Crie ou atualize os componentes necessarios.
2. Configure a navegacao, se houver uma nova rota visual.
3. Integre a tela com a API correspondente.
4. Trate carregamento, sucesso, erro e dados vazios.
5. Teste o fluxo manualmente no navegador.

## Observacoes

Esta documentacao descreve apenas a camada frontend. Arquivos, controllers, models, rotas e configuracoes do backend devem ser documentados separadamente na pasta `backEnd`.
