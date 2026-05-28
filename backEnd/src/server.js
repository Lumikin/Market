import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/router.js";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadImagesPath = path.resolve(__dirname, "../uploads/images");
const mockImagesPath = path.resolve(__dirname, "../data/assets");

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
