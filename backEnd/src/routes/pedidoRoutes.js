import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/", pedidoController.listarPedidos);
pedidoRoutes.get("/itens/", pedidoController.listarItens);
pedidoRoutes.get("/:id", pedidoController.listarIDPedidos);

pedidoRoutes.post("/", pedidoController.criarPedido);


pedidoRoutes.put("/:id", pedidoController.atualizarPedido);
pedidoRoutes.delete("/:id", pedidoController.deletarPedido);
pedidoRoutes.get("/itens/:id", pedidoController.listarIDItem);
pedidoRoutes.put("/itens/:id", pedidoController.alterarItem);



export default pedidoRoutes;