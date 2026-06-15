import { buscarImagem } from "../../services/produtos.api.js";
export default function criarImagemProduto(produto) {
  const img = document.createElement("img");
  img.alt = produto.Nome;
  img.className = "card-img-top img-fluid";
  const imagem = produto.Imagem;

  img.style.height = "360px";
  img.style.objectFit = imagem ? "contain" : "";

  // O backend salva o caminho completo, mas a rota publica recebe apenas o nome do arquivo.
  const nomeImagem = imagem ? imagem.replace(/^.*\//, "") : "";

  img.src = imagem && imagem !== "undefined"
    ? `http://localhost:8080/images/produto/${nomeImagem}`
    : "../../public/Not-Found.jpg";
  console.log(img.src);
  return img;
}
