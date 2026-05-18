import { connection } from "../config/Database.js";

const pedidoRepositories = {
  criar: async (pedido, itemPed) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();

      const sqlPedido = `INSERT INTO pedidos (ClienteId, SubTotal, Status) VALUES (?, ?, ?)`;      
      const valuesPedido = [pedido.ClienteId, pedido.subTotal, pedido.status];

      const [resultPedido] = await conn.execute(sqlPedido, valuesPedido);
      
      const pedidoId = resultPedido.insertId;
      const sqlItem = `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)`;
      
      for (const item of itemPed) {
        await conn.execute(sqlItem, [pedidoId, item.produtoId, item.quantidade, item.valorItem]);
      }
      
      await conn.commit();
      return { pedidoId };
    
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  criarItem: async (PedidoId, itensPedido) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();
      
      const sqlItem = `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)`;
      
      for (const item of itensPedido) {
        
        await conn.execute(sqlItem, [PedidoId, item.produtoId, item.quantidade, item.valorItem]);
      }
      
      const sqlSoma = `SELECT COALESCE(SUM(Quantidade * ValorItem), 0) AS novoSubTotal FROM itens_pedidos WHERE PedidoId = ?`;

      const [rowsSoma] = await conn.execute(sqlSoma, [PedidoId]);

      const novoSubTotal = rowsSoma[0].novoSubTotal;

      await conn.execute(`UPDATE pedidos SET SubTotal = ? WHERE id = ?`, [novoSubTotal, PedidoId]);

      await conn.commit();

      return {message: "Itens adicionados com sucesso", PedidoId, novoSubTotal};

    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  alterarItem: async (dadosPedido) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      const sqlUpdate = `UPDATE itens_pedidos SET ProdutoId = ?, Quantidade = ?, ValorItem = ? WHERE id = ? AND PedidoId = ?`;

      for (const item of dadosPedido.itens) {
        await conn.execute(sqlUpdate, [item.produtoId, item.quantidade, item.valorItem, item.id, dadosPedido.pedidoId]);
      }

      const sqlSoma = `SELECT COALESCE(SUM(Quantidade * ValorItem), 0) AS novoSubTotal FROM itens_pedidos WHERE PedidoId = ?`;

      const [rows] = await conn.execute(sqlSoma, [dadosPedido.pedidoId]);
      
      const novoSubTotal = rows[0].novoSubTotal;

      await conn.execute(`UPDATE pedidos SET SubTotal = ? WHERE id = ?`, [novoSubTotal, dadosPedido.pedidoId]);

      await conn.commit();

      return {PedidoId: dadosPedido.pedidoId, novoSubTotal};

    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  get: async () => {
    const sql = "SELECT * FROM pedidos";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  getId: async (id) => {
    const sql = `SELECT * FROM pedidos WHERE id = ?`;

    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },

  deletar: async (id) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      await conn.execute(`DELETE FROM itens_pedidos WHERE PedidoId = ?`, [id]);

      const [result] = await conn.execute(`DELETE FROM pedidos WHERE id = ?`, [id]);

      await conn.commit();

      return result;

    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
};

export default pedidoRepositories;