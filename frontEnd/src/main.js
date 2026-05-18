import ProdutosPage from "./pages/produtos/produtos.page.js";
import carrinhoProdutosPage from "./pages/produtos/carrinho.page.js";
import criaNavbar, { ativarMenu } from "./components/nav.component.js";

criaNavbar();
ProdutosPage();

const btnHome = document.querySelector("#btnHome");
const btnCarrinho = document.querySelector("#btnCarrinho");
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
=======
>>>>>>> f39a8e4660e3651b854f0605774b8a27b4853b22
btnHome.addEventListener("click", () => {
  ativarMenu(btnHome);
  ProdutosPage();
});
<<<<<<< HEAD
<<<<<<< HEAD
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
=======

btnCarrinho.addEventListener("click", () => {
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
=======
btnCarrinho.addEventListener("click", () => {
  ativarMenu(btnCarrinho);
>>>>>>> f39a8e4660e3651b854f0605774b8a27b4853b22
  carrinhoProdutosPage();
});