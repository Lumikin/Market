export default function criarImagemProduto(produto) {
  const img = document.createElement("img");
  img.alt = produto.Name;
  img.className = "card-img-top img-fluid";

  img.style.height = "360px";
  img.style.objectFit = produto.Image ? "cover" : "";

  img.src = produto.Image
    ? produto.Image
    : "/Not-Found.jpg";
  return img;
}
