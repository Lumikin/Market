export default function criaNavbar() {
  const header = document.querySelector("header");
  header.innerHTML = ""; 

  const nav = document.createElement("nav");
  // navbar-dark garante que o ícone do menu (hambúrguer) fique branco
  nav.className = "navbar navbar-expand-lg bg-navy shadow-sm navbar-dark fixed-top";

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#" style="font-family: 'Oswald'; letter-spacing: 1px;">
<<<<<<< HEAD
        Espricio Market
=======
        HP EXPLORER
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

<<<<<<< HEAD
      <div class="collapse navbar-collapse" style="font-family: 'Oswald'; id="menu">
=======
      <div class="collapse navbar-collapse" id="menu">
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="nav-link active" id="btnHome" style="background:none; border:none;">HOME</button>
          </li>
        </ul>

        <div class="d-flex">
          <button class="btn-primario" id="btnCarrinho"> 
            <span>🛒</span> CARRINHO (0)
          </button>
        </div>
      </div>
    </div>
  `;

  header.appendChild(nav);
}

export function ativarMenu(botaoClicado) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.remove("active", "fw-bold");
  });
  botaoClicado.classList.add("active", "fw-bold");
}