import pedidoRepositories from "../repositories/pedidoRepositories.js";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/Item_Pedido.js";
import { statusPedido } from "../enum/statusPedido.js";

const pedidoController = {
  selecionar: async (req, res) => {
    try {
      const result = await pedidoRepositories.get();

      if (result.length === 0) {
        return res.status(200).json({
          Message: "Essa tabela não contem registros",
        });
      }

      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  selecionarId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await pedidoRepositories.getId(id);

      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse ID não contem registro!",
        });
      }

      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  criar: async (req, res) => {
    try {
      const { itens } = req.body;

      const itensPedido = itens.map((item) => {
        console.log("Itens:", item);
        return ItensPedido.criar({
          idProduto: item.idProduto,
          estoque: item.estoque,
          valorItem: item.valorItem,
        });
      });

      console.log(itensPedido);

      const subTotalItens = ItensPedido.calcularSubTotal(itensPedido);

      const pedido = Pedido.criar({
        subTotal: subTotalItens,
        status: statusPedido.ABERTO,
      });

      const result = await pedidoRepositories.post(pedido, itensPedido);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },

  atualizar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      // if (
      //   !status ||
      //   status !== statusPedido.ABERTO ||
      //   status !== statusPedido.FECHADO ||
      //   status !== statusPedido.CANCELADO
      // ) {
      //   return res.status(400).json({
      //     message: "Status inválido, informe Aberto, Finalizado ou Pendente",
      //   });
      // }

      console.log(id, status);

      const pedido = Pedido.editar({ status }, id);
      console.log("Pedido para atualização:", pedido.status, pedido.id);
      const result = await pedidoRepositories.put(pedido);

      if (result.affectedRows === 0) {
        return res.status(400).json({
          message: "Erro ao atualizar o pedido.",
          data: result,
        });
      }
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  deletar: async (req, res) => {
    try {
      const id = Number(req.params.id);

      const result = await pedidoRepositories.delete(id);

      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
};

export default pedidoController;
