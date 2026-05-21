import { Router } from "express";
import pedidoController from "../controllers/pedido.controller.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/", pedidoController.selecionar);
pedidoRoutes.post("/", pedidoController.criar);
pedidoRoutes.get("/:id", pedidoController.selecionarId);
pedidoRoutes.put("/:id", pedidoController.atualizar);
pedidoRoutes.delete("/:id", pedidoController.deletar);

// --- Itens --- //
// pedidoRoutes.get("/:id/items", pedidoController.s);
// pedidoRoutes.post("/:id/items", pedidoController.criarItem);
// pedidoRoutes.delete("/:id/items/:idItem", pedidoController.deletarItemPedido);

export default pedidoRoutes;