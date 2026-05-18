import produtoRepositories from "../repositories/produtoRepositories.js";
import { Produtos } from "../models/Produtos.js";

const produtoController = {
  listarProdutos: async (req, res) => {
    try {
      const result = await produtoRepositories.listar();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Produtos não existem nessa tabela",
          Data: result,
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
          Message: "Digite um id válido",
        });
      }
      const result = await produtoRepositories.listarId(id);
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse id não existe",
          Data: result,
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
      const Imagem = req.file.path;
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
  deletarProduto: async (req, res) => {
    try {
      const { id } = req.params;
      const buscaId = produtoRepositories.listarId(id);
      if (buscaId.length === 0 || !id) {
        return res.status(400).json({
          Message: "Insira um Id válido",
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
};
export default produtoController;
