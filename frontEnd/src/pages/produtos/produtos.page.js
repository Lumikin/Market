import criaNavbar from "../../components/nav.component.js";

export default async function ProdutosPage() {
  const app = document.querySelector("#app");
  const nav = criaNavbar()
  app.appendChild(nav)
  
}
