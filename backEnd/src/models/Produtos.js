export class Produtos {
  #id;
  #nome;
  #valor;
  #caminhoImagem;
  #idCategoria;

  constructor(Nome, valor, idCategoria, caminhoImagem, id) {
    this.#nome = Nome;
    this.#valor = valor;
    this.#idCategoria = idCategoria;
    this.#caminhoImagem = caminhoImagem;
    this.#id = id;
  }

  get idCategoria() {
    return this.#idCategoria;
  }
  set idCategoria(value) {
    this.#validarIdCategoria(value);
    this.#idCategoria = value;
  }

  get caminhoImagem() {
    return this.#caminhoImagem;
  }
  set caminhoImagem(value) {
    this.#validarPathImagem(value);
    this.#caminhoImagem = value;
  }

  get nome() {
    return this.#nome;
  }

  set nome(value) {
    this.#validarNome(value);
    this.#nome = value;
  }

  get valor() {
    return this.#valor;
  }

  set valor(value) {
    this.#validarValor(value);
    this.#valor = value;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  #validarNome(value) {
    if (!value || value.trim() < 3 || value.trim().length > 45) {
      throw new Error(
        "O campo nome é obrigatório e deve ter 3 e 45 caracteres",
      );
    }
  }

  #validarValor(value) {
    if (!value || value.trim() <= 0 || isNaN(value)) {
      throw new Error(
        "O campo valor deve ser um número valido ou maior do que 0",
      );
    }
  }

  #validarId(value) {
    if (value && value.trim() <= 0) {
      throw new Error("O valor do Id não corresponde ao esperado");
    }
  }

  #validarIdCategoria(value) {
    if (!value || value.trim() <= 0) {
      throw new Error("O valor do IdCategoria não corresponde ao esperado");
    }
  }

  #validarPathImagem(value) {
    if (!value || value.trim().length < 3) {
      throw new Error("O verifique se o Path da imagem esta correto");
    }
  }

  // Design pattern: Factory

  static criar(dados) {
    return new Produtos(
      dados.nome,
      dados.valor,
      dados.idCategoria,
      dados.caminhoImagem,
      null,
    );
  }
  static editar(dados, id) {
    return new Produtos(
      dados.nome,
      dados.valor,
      dados.idCategoria,
      dados.caminhoImagem,
      id,
    );
  }
}