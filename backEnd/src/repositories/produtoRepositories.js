import { connection } from "../config/Database.js";

const produtoRepositories = {
  listar: async () => {
    const sql = "SELECT * FROM produtos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },
  listarId: async id => {
    const sql = "SELECT * FROM produtos WHERE idProduto = ?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};
export default produtoRepositories;
