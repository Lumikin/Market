import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

ppedidoRoutes.get("/", pedidoController.selecionar);
pedidoRoutes.post("/", pedidoController.criar);
pedidoRoutes.get("/:id", pedidoController.selecionarId);
pedidoRoutes.put("/:id", pedidoController.atualizarPedido);
pedidoRoutes.delete("/:id", pedidoController.deletar);

// --- Itens --- //
pedidoRoutes.get("/:id/items", pedidoController.selecionarItens);
pedidoRoutes.post("/:id/items", pedidoController.criarItem);
pedidoRoutes.delete("/:id/items/:idItem", pedidoController.deletarItemPedido);

export default pedidoRoutes;