import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.get("/", pedidoController.selecionar);
pedidoRoutes.post("/", pedidoController.criar);
pedidoRoutes.get("/:id", pedidoController.selecionarId);
pedidoRoutes.put("/:id", pedidoController.atualizar);
pedidoRoutes.delete("/:id", pedidoController.deletar);


pedidoRoutes.get("/itens/itens", pedidoController.selecionar);

export default pedidoRoutes;
