/**
 * app.js — Página principal (vitrine da loja)
 *
 * Usa fetch (AJAX) para recuperar as poções do Web Service
 * e renderiza os cards dinamicamente no grid #lista-pocoes.
 */

const API_URL = "http://localhost:3001";

/** Selectors */
const listaPocoes    = document.getElementById("lista-pocoes");
const subtitulo      = document.querySelector(".produtos-subtitulo");

/**
 * Busca todas as poções via AJAX e renderiza os cards.
 * Exibe mensagem de erro amigável caso a requisição falhe.
 */
async function carregarPocoes() {
    try {
        const resposta = await fetch(`${API_URL}/pocoes`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }

        const pocoes = await resposta.json();

        // Remove o subtítulo de "carregando..." após a resposta
        if (subtitulo) { subtitulo.remove(); }

        if (pocoes.length === 0) {
            listaPocoes.innerHTML = '<p class="erro-pocoes">Nenhuma poção em estoque no momento. Volte em breve! 🧙</p>';
            return;
        }

        // Renderiza um card para cada poção recebida
        listaPocoes.innerHTML = pocoes.map(renderizarCard).join("");

    } catch (erro) {
        if (subtitulo) { subtitulo.remove(); }
        listaPocoes.innerHTML = `
            <p class="erro-pocoes">
                🔮 Não foi possível carregar as poções.<br/>
                <small>${erro.message}</small>
            </p>`;
    }
}

/**
 * Gera o HTML de um card de poção.
 *
 * @param {Object} pocao - Objeto com campos: id, nome, descricao, imagem, preco
 * @returns {string} HTML do card
 */
function renderizarCard(pocao) {
    // Imagem padrão caso nenhuma URL seja fornecida
    const imgSrc = pocao.imagem && pocao.imagem.trim() !== ""
        ? pocao.imagem
        : "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=400";

    return `
        <article class="card-pocao">
            <img src="${imgSrc}" alt="${escaparHTML(pocao.nome)}" loading="lazy" />
            <div class="card-corpo">
                <h3 class="card-nome">${escaparHTML(pocao.nome)}</h3>
                <p class="card-descricao">${escaparHTML(pocao.descricao)}</p>
                <p class="card-preco">💰 ${Number(pocao.preco).toLocaleString("pt-BR")} moedas</p>
                <button class="btn-comprar" onclick="alert('Funcionalidade de compra em breve! 🧙‍♀️')">
                    Comprar
                </button>
            </div>
        </article>
    `;
}

/**
 * Escapa caracteres HTML para evitar XSS ao inserir dados do banco no DOM.
 *
 * @param {string} str - String a escapar
 * @returns {string} String com caracteres especiais escapados
 */
function escaparHTML(str) {
    if (!str) { return ""; }
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Carrega as poções assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", carregarPocoes);
