import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/router.js";
let port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "..", "uploads/images")),
);

app.use("/", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Servidor rodando em: http://localhost:${process.env.SERVER_PORT}`,
  );
});
