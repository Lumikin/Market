import { contarItensCarrinho } from "../storage/carrinho.storage.js";

/**
 * FUNÇÃO PRINCIPAL: Cria e renderiza a barra de navegação no topo do site.
 */
export default function criaNavbar() {
  const header = document.querySelector("header");
  header.innerHTML = ""; // Limpa o header antes de inserir para evitar duplicatas

  const nav = document.createElement("nav");
  // Classes Bootstrap: expand-lg (responsivo), bg-navy (sua cor CSS), fixed-top (trava no topo)
  nav.className = "navbar navbar-expand-lg bg-navy shadow-sm navbar-dark fixed-top";

  nav.innerHTML = `
    <div class="container-fluid">
      <!-- Logo do Site -->
      <a class="navbar-brand fw-bold" href="#" style="font-family: 'Oswald'; letter-spacing: 1px;">
        Espricio Market
      </a>

      <!-- Botão Hamburger: aparece apenas no celular -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Conteúdo do Menu (colapsável no mobile) -->
      <div class="collapse navbar-collapse" id="menu" style="font-family: 'Oswald';">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- Botão de Navegação: Estilizado para parecer link, mas funciona como botão -->
            <button class="nav-link active" id="btnHome" style="background:none; border:none;">HOME</button>
          </li>
        </ul>

        <!-- Lado Direito: Botão do Carrinho -->
        <div class="d-flex">
          <button class="btn-primario" id="btnCarrinho">
            <!-- &#128722; é o código HTML para o emoji de carrinho de compras -->
            <span style="margin-right: 5px;">&#128722;</span> CARRINHO (0)
          </button>
        </div>
      </div>
    </div>
  `;

  header.appendChild(nav);
}

/**
 * ESTADO DO MENU: Gerencia qual link aparece como "selecionado" (aceso).
 */
export function ativarMenu(botaoClicado) {
  // Remove a classe 'active' de todos os botões do menu
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.remove("active", "fw-bold");
  });
  
  // Adiciona a classe 'active' apenas no botão que o usuário clicou
  botaoClicado.classList.add("active", "fw-bold");
}