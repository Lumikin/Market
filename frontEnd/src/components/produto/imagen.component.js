export default function criarImagemProduto(produto) {
  const img = document.createElement("img");
  img.alt = produto.Nome;
  img.className = "card-img-top img-fluid";

  img.style.height = "360px";
  img.style.objectFit = produto.Imagem ? "cover" : "";

  img.src = produto.Imagem ? produto.Imagem : "/Not-Found.jpg";
  return img;
}
