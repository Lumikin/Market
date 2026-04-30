import ProdutosPage from "./pages/produtos/produtos.page.js";
import carrinhoProdutosPage from "./pages/produtos/carrinho.page.js";
import criaNavbar, { ativarMenu } from "./components/nav.component.js";
criaNavbar();
ProdutosPage();

const btnHome = document.querySelector("#btnHome");
const btnFavoritos = document.querySelector("#btnFavoritos");
btnHome.addEventListener("click", () => {
  ativarMenu(btnHome);
  ProdutosPage();
});
btnFavoritos.addEventListener("click", () => {
  ativarMenu(btnFavoritos);
  carrinhoProdutosPage();
});
