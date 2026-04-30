export default function criaNavbar() {
  const header = document.querySelector('header');
  const nav = document.createElement('nav');
  
  nav.className = 'navbar navbar-expand-lg bg-navy shadow-sm navbar-dark';

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#" style="font-family: 'Oswald';">
        HP EXPLORER
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="menu">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="nav-link active" id="btnHome">PRODUTOS</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="btnCarrinho">CARRINHO</button>
          </li>
        </ul>
      </div>

      <div class="d-flex">
        <button class="btn-primario" id="btnIrCarrinho">CARRINHO (0)</button>
      </div>
    </div>
  `;
  header.appendChild(nav);
}

export function ativarMenu(botaoClicado) {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active', 'fw-bold');
  });
  botaoClicado.classList.add('active', 'fw-bold');
}