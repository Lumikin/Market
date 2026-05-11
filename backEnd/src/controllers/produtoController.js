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
    
  },
};
export default produtoController;
