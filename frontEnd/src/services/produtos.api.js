import axios from "axios";

const API_URL = "http://localhost:8080/produtos/";

export async function buscarProdutos() {
  try {
    const resposta = await axios.get(API_URL);

    return resposta.data.Data;
  } catch (error) {
    // Mantem a tela funcional mesmo quando a API esta indisponivel.
    console.error("Erro ao buscar os personagens", error);
    return [];
  }
}

export async function buscarImagem(Imagem) {
}
