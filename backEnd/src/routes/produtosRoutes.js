import { Router } from "express";
import produtoController from "../controllers/produtoController.js";

const produtoRoutes = Router();

produtoRoutes.get("/", produtoController.listarProdutos);
produtoRoutes.get("/:id", produtoController.listarIdProduto);

export default produtoRoutes;
