import { buscarImagem } from "../../services/produtos.api.js";
export default function criarImagemProduto(produto) {
  const img = document.createElement("img");
  img.alt = produto.Nome;
  img.className = "card-img-top img-fluid";

  img.style.height = "360px";
  img.style.objectFit = produto.Imagem ? "contain" : "";

  const nomeImagem = produto.Imagem ? produto.Imagem.replace(/^.*\//, "") : ""; // Tira o uploads/images

  img.src = produto.Imagem
    ? `http://localhost:8080/images/produto/${nomeImagem}`
    : "/Not-Found.jpg";
  console.log(img.src);
  return img;
}
