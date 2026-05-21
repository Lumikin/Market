import { connection } from "../config/Database.js";

const pedidoRepositories = {
  post: async (pedido, itemPed) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      // --- INSERT PEDIDO --- //
      const sqlPedido = "INSERT INTO pedidos (Subtotal, Status) VALUES (?, ?);";
      const valuesPedido = [pedido.subTotal, pedido.status];
      const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

      // --- INSERT ITENS_PEDIDO --- //
      for (const item of itemPed) {
        const sqlItemPed =
          "INSERT INTO itens_pedidos (idPedido, idProduto, quantidade, valorItem) VALUES (?, ?, ?, ?);";
        const valuesItemPed = [
          rowsPedido.insertId,
          item.idProduto,
          item.estoque,
          item.valorItem,
        ];
        await conn.execute(sqlItemPed, valuesItemPed);
      }

      await conn.commit();
      return rowsPedido;
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  get: async () => {
    const sql = "SELECT * FROM pedidos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  getId: async id => {
    const sql = "SELECT * FROM pedidos WHERE idPedido = ?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  getItensPorPedido: async pedidoId => {
    const sql = "SELECT * FROM itens_pedidos WHERE PedidoId = ?;";
    const values = [pedidoId];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  getItens: async () => {
    const sql = "SELECT * FROM itens_pedidos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  put: async pedido => {
    const sql =
      "UPDATE pedidos SET Subtotal = ?, Status = ? WHERE idPedido = ?;";
    const values = [pedido.subTotal, pedido.status, pedido.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  putStatus: async pedido => {
    const sql = "UPDATE pedidos SET Status = ? WHERE idPedido = ?;";
    const values = [pedido.status, pedido.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  putItem: async (itemId, pedidoId, item) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      // --- UPDATE ITEM --- //
      const sqlUpdate =
        "UPDATE itens_pedidos SET ProdutoId = ?, Quantidade = ?, ValorItem = ? WHERE id = ? AND PedidoId = ?;";
      const valuesUpdate = [
        item.idProduto,
        item.estoque,
        item.valorItem,
        itemId,
        pedidoId,
      ];
      await conn.execute(sqlUpdate, valuesUpdate);

      // --- RECALCULAR SUBTOTAL --- //
      const sqlSubtotal =
        "SELECT COALESCE(SUM(Quantidade * ValorItem), 0) AS novoSubtotal FROM itens_pedidos WHERE PedidoId = ?;";
      const [subtotalRows] = await conn.execute(sqlSubtotal, [pedidoId]);
      const novoSubtotal = subtotalRows[0].novoSubtotal;

      // --- UPDATE PEDIDO SUBTOTAL --- //
      const sqlUpdatePedido =
        "UPDATE pedidos SET Subtotal = ? WHERE idPedido = ?;";
      await conn.execute(sqlUpdatePedido, [novoSubtotal, pedidoId]);

      await conn.commit();
      return { pedidoId, novoSubtotal };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  postItem: async (pedidoId, itemPed) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      // --- INSERT ITENS --- //
      for (const item of itemPed) {
        const sqlItemPed =
          "INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?);";
        const valuesItemPed = [
          pedidoId,
          item.idProduto,
          item.estoque,
          item.valorItem,
        ];
        await conn.execute(sqlItemPed, valuesItemPed);
      }

      // --- RECALCULAR SUBTOTAL --- //
      const sqlSubtotal =
        "SELECT COALESCE(SUM(Quantidade * ValorItem), 0) AS novoSubtotal FROM itens_pedidos WHERE PedidoId = ?;";
      const [subtotalRows] = await conn.execute(sqlSubtotal, [pedidoId]);
      const novoSubtotal = subtotalRows[0].novoSubtotal;

      // --- UPDATE PEDIDO SUBTOTAL --- //
      const sqlUpdatePedido =
        "UPDATE pedidos SET Subtotal = ? WHERE idPedido = ?;";
      await conn.execute(sqlUpdatePedido, [novoSubtotal, pedidoId]);

      await conn.commit();
      return { pedidoId, novoSubtotal };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  delete: async id => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      // --- DELETE ITENS DO PEDIDO --- //
      const sqlDeleteItens = "DELETE FROM itens_pedidos WHERE idPedido = ?;";
      await conn.execute(sqlDeleteItens, [id]);

      // --- DELETE PEDIDO --- //
      const sqlDeletePedido = "DELETE FROM pedidos WHERE idPedido = ?;";
      const [rows] = await conn.execute(sqlDeletePedido, [id]);

      await conn.commit();
      return rows;
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  deleteItem: async itemId => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      // --- BUSCAR PEDIDO DO ITEM --- //
      const sqlGetItem = "SELECT PedidoId FROM itens_pedidos WHERE id = ?;";
      const [itemRows] = await conn.execute(sqlGetItem, [itemId]);

      if (!itemRows.length) {
        throw new Error("Item não encontrado");
      }

      const pedidoId = itemRows[0].PedidoId;

      // --- DELETE ITEM --- //
      const sqlDeleteItem = "DELETE FROM itens_pedidos WHERE id = ?;";
      await conn.execute(sqlDeleteItem, [itemId]);

      // --- RECALCULAR SUBTOTAL --- //
      const sqlSubtotal =
        "SELECT COALESCE(SUM(Quantidade * ValorItem), 0) AS novoSubtotal FROM itens_pedidos WHERE PedidoId = ?;";
      const [subtotalRows] = await conn.execute(sqlSubtotal, [pedidoId]);
      const novoSubtotal = subtotalRows[0].novoSubtotal;

      // --- UPDATE PEDIDO SUBTOTAL --- //
      const sqlUpdatePedido =
        "UPDATE pedidos SET Subtotal = ? WHERE idPedido = ?;";
      await conn.execute(sqlUpdatePedido, [novoSubtotal, pedidoId]);

      await conn.commit();
      return { pedidoId, novoSubtotal };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },
};

export default pedidoRepositories;
