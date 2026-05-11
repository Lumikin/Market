import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.get("/", categoriaController.listarCategorias);
categoriaRoutes.get("/:id", categoriaController.listarIdCategoria);

export default categoriaRoutes;
