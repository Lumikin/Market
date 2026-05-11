import { Categoria } from "../models/Categoria.js";
import categoriaRepositories from "../repositories/categoriaRepositories.js";

const categoriaController = {
  listarCategorias: async (req, res) => {
    try {
      const result = await categoriaRepositories.listar();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Categorias não existem nessa tabela",
          Data: result,
        });
      }
      res.status(200).json({
        Message: "Categorias Listadas:",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  listarIdCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || id === undefined || isNaN(id) || id < 0) {
        return res.status(400).json({
          Message: "Digite um id válido",
        });
      }
      const result = await categoriaRepositories.listarId(id);
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse id não existe",
          Data: result,
        });
      }
      res.status(200).json({
        Message: "Categoria Encontrada:",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  criarCategoria: async (req, res) => {
    try {
      const { nome, descricao } = req.body;
      const categoria = Categoria.criar({ nome, descricao });
      const result = await categoriaRepositories.criar(categoria);
      res.status(201).json({
        Message: "Categoria criada",
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
export default categoriaController;
