import produtoRepositories from "../repositories/produto.repositories.js";
import { Produtos } from "../models/Produtos.js";

const produtoController = {
  listarProdutos: async (req, res) => {
    try {
      const result = await produtoRepositories.listar();

      if (result.length === 0) {
        return res.status(200).json({
          Message: "Produtos n�o existem nessa tabela",
        });
      }

      res.status(200).json({
        Message: "Produtos Listados:",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  listarIdProduto: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || id === undefined || isNaN(id) || id < 0) {
        return res.status(400).json({
          Message: "Digite um id v�lido",
        });
      }

      const result = await produtoRepositories.listarId(id);

      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse id n�o existe",
        });
      }

      res.status(200).json({
        Message: "Produto Encontrado:",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  criarProdutos: async (req, res) => {
    try {
      const { idCategoria, nome, descricao, preco, estoque } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "Arquivo de imagem n�o enviado",
        });
      }

      const Imagem = `uploads/images/${req.file.filename}`;

      const produto = Produtos.criar({
        idCategoria,
        nome,
        descricao,
        preco,
        Imagem,
        estoque,
      });

      const result = await produtoRepositories.criar(produto);

      console.log("Produto criado: \n", result);
      res.status(201).json({
        Message: "Produto criado com sucesso",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },

  alterarProduto: async (req, res) => {
    try {
      const { id } = req.params;
      let { idCategoria, nome, descricao, preco, estoque } = req.body;

      if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({
          Message: "Digite um id v�lido",
        });
      }

      const produtoExistente = await produtoRepositories.listarId(id);
      if (produtoExistente.length === 0) {
        return res.status(400).json({
          Message: "Produto n�o encontrado",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Arquivo de imagem n�o enviado",
        });
      }

      const Imagem = `uploads/images/${req.file.filename}`;

      const produto = Produtos.editar(
        {
          idCategoria,
          nome,
          descricao,
          preco,
          Imagem,
          estoque,
        },
        id,
      );

      const result = await produtoRepositories.alterar(produto);

      if (result.affectedRows === 0) {
        return res.status(400).json({
          Message: "Erro ao alterar produto",
        });
      }

      console.log("Produto alterado", result);
      res.status(200).json({
        Message: "Produto alterado com sucesso",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },

  deletarProduto: async (req, res) => {
    try {
      const { id } = req.params;
      const buscaId = await produtoRepositories.listarId(id);

      if (!id || buscaId.length === 0) {
        return res.status(400).json({
          Message: "Insira um Id v�lido",
        });
      }

      const result = await produtoRepositories.deletar(id);

      console.log("Produto Deletado", result);
      res.status(200).json({
        Message: "Produto deletado!",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  listarImagem: async () => {},
};

export default produtoController;
