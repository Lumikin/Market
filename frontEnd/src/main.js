import ProdutosPage from "./pages/produtos/produtos.page.js";
import carrinhoProdutosPage from "./pages/produtos/carrinho.page.js";
import criaNavbar, { ativarMenu } from "./components/nav.component.js";

criaNavbar();
ProdutosPage();

const btnHome = document.querySelector("#btnHome");
const btnCarrinho = document.querySelector("#btnCarrinho");
btnHome.addEventListener("click", () => {
  ativarMenu(btnHome);
  ProdutosPage();
});
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
  carrinhoProdutosPage();
});