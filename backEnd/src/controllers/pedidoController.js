import pedidoRepositories from "../repositories/pedidoRepository.js";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/Item_Pedido.js";
import { statusPedido } from "../enum/statusPedido.js";

const pedidoController = {
    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepositories.getPedido();
            
            if (!result || result.length === 0) {
                return res.status(200).json({message: "Nenhum pedido encontrado"});
            }
            return res.status(200).json({ result });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor!"});
        }
    },
    
    selecionarItens: async (req, res) => {
        try {
            const result = await pedidoRepositories.getItem();
            
            if (!result || result.length === 0) {
                return res.status(200).json({message: "Nenhum item encontrado"});
            }
            return res.status(200).json({ result });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor!"});
        }
    },
    
    selecionarId: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await pedidoRepositories.getPedidoId(id);
            
            if (!result || result.length === 0) {
                return res.status(404).json({message: "Pedido não encontrado!"});
            }
            return res.status(200).json({ result });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor!"});
        }
    },
    
    criar: async (req, res) => {
        try {
            const { ClienteId, itens } = req.body;
            
            if (!ClienteId) {
                return res.status(400).json({message: "ClienteId obrigatório!"});
            }
            
            if (!itens || !Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({message: "Itens obrigatórios!"});
            }
            
            const itensPedido = itens.map(item =>
                ItensPedido.criar({produtoId: item.ProdutoId, quantidade: item.quantidade, valorItem: item.valorItem})
            );
            
            const subTotalItens = ItensPedido.calcularSubTotal(itensPedido);
            
            const pedido = Pedido.criar({ClienteId, status: statusPedido.ABERTO, subTotalItens});
            
            const result = await pedidoRepositories.criar(pedido, itensPedido);
            
            return res.status(201).json({message: "Pedido criado com sucesso!", result});
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor!", error: error.message});
        }
    },
    
    criarItem: async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            const { itens } = req.body;
            
            if (!idPedido || isNaN(idPedido)) {
                return res.status(400).json({message: "idPedido inválido!"});
            }
            
            if (!itens || !Array.isArray(itens)) {
                return res.status(400).json({message: "Itens inválidos!"});
            }
            
            const itensPedido = itens.map(item =>
                ItensPedido.criar({pedidoId: idPedido, produtoId: item.ProdutoId, quantidade: item.quantidade, valorItem: item.valorItem})
            );
            
            const result = await pedidoRepositories.criarItem(idPedido, itensPedido);
            
            return res.status(201).json({ result });
        
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({message: "Erro no servidor!", error: error.message});
        }
    },
    
    atualizarPedido: async (req, res) => {
        try {
            const idPedido = Number(req.params.id);
            const { status } = req.body;
            
            if (!idPedido || isNaN(idPedido)) {
                return res.status(400).json({message: "ID inválido!"});
            }
            
            const pedidoEditado = Pedido.editar({ status }, idPedido);
            const result = await pedidoRepositories.alterarPedido(pedidoEditado);
            
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({message: "Pedido não encontrado!"});
            }
            
            return res.status(200).json({message: "Pedido atualizado!", result});
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro ao atualizar pedido!"});
        }
    },
    
    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await pedidoRepositories.deletar(id);
            
            return res.status(200).json({
        message: "Pedido removido",
        result
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro no servidor"
      });
    }
  },

  deletarItemPedido: async (req, res) => {
    try {
      const idItem = Number(req.params.idItem);

      if (!idItem) {
        return res.status(400).json({
          message: "idItem obrigatório"
        });
      }

      const resultado = await pedidoRepositories.deletarItem(idItem);

      return res.status(200).json({
        message: "Item removido",
        novoSubtotal: resultado.novoTotal
      });

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao remover item",
        error: error.message
      });
    }
  }
};

export default pedidoController;