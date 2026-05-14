import ProdutosPage from "./pages/produtos/produtos.page.js";
import carrinhoProdutosPage from "./pages/produtos/carrinho.page.js";
import criaNavbar, { ativarMenu } from "./components/nav.component.js";

criaNavbar();
ProdutosPage();

const btnHome = document.querySelector("#btnHome");
const btnCarrinho = document.querySelector("#btnCarrinho");
<<<<<<< HEAD
=======

>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
btnHome.addEventListener("click", () => {
  ativarMenu(btnHome);
  ProdutosPage();
});
<<<<<<< HEAD
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
=======

btnCarrinho.addEventListener("click", () => {
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
  carrinhoProdutosPage();
});