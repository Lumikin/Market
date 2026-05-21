import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/router.js";
let port = 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Servidor rodando em: http://localhost:${process.env.SERVER_PORT}`,
  );
});
