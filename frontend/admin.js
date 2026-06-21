/**
 * admin.js — Painel de administração
 *
 * Permite à administradora:
 *   - Cadastrar uma nova poção (POST /pocoes)
 *   - Listar todas as poções em tabela (GET /pocoes)
 *   - Remover uma poção pelo ID (DELETE /pocoes/:id)
 */

const API_URL = "http://localhost:3001";

/** Selectors do formulário de cadastro */
const formCadastro   = document.getElementById("form-cadastro");
const inputNome      = document.getElementById("input-nome");
const inputDescricao = document.getElementById("input-descricao");
const inputImagem    = document.getElementById("input-imagem");
const inputPreco     = document.getElementById("input-preco");
const msgCadastro    = document.getElementById("msg-cadastro");

/** Selectors da tabela */
const corpoTabela    = document.getElementById("corpo-tabela");
const msgLista       = document.getElementById("msg-lista");

// Listar poções
/**
 * Busca todas as poções e preenche a tabela do painel admin.
 * Exibe mensagem de erro caso a requisição falhe.
 */
async function listarPocoes() {
    try {
        const resposta = await fetch(`${API_URL}/pocoes`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}`);
        }

        const pocoes = await resposta.json();

        if (pocoes.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="4" style="text-align:center;font-style:italic;">Nenhuma poção cadastrada.</td></tr>';
            return;
        }

        // Renderiza uma linha por poção
        corpoTabela.innerHTML = pocoes.map(renderizarLinha).join("");

    } catch (erro) {
        mostrarMensagem(msgLista, "Erro ao carregar poções: " + erro.message, false);
    }
}

/**
 * Gera o HTML de uma linha da tabela para uma poção.
 *
 * @param {Object} pocao - Objeto com campos id, nome, preco
 * @returns {string} HTML da linha <tr>
 */
function renderizarLinha(pocao) {
    return `
        <tr>
            <td>#${pocao.id}</td>
            <td>${escaparHTML(pocao.nome)}</td>
            <td>${Number(pocao.preco).toLocaleString("pt-BR")} moedas</td>
            <td>
                <button class="btn-remover" onclick="removerPocao(${pocao.id})">
                    🗑 Remover
                </button>
            </td>
        </tr>
    `;
}

// Cadastrar poção
/**
 * Lida com o envio do formulário de cadastro.
 * Valida os campos, envia POST para a API e recarrega a tabela.
 *
 * @param {Event} evento - Evento de submit do formulário
 */
formCadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome      = inputNome.value.trim();
    const descricao = inputDescricao.value.trim();
    const imagem    = inputImagem.value.trim();
    const preco     = parseFloat(inputPreco.value);

    // Validação básica no frontend antes de enviar ao servidor
    if (!nome || !descricao || isNaN(preco) || preco < 0) {
        mostrarMensagem(msgCadastro, "Preencha todos os campos obrigatórios corretamente.", false);
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/pocoes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, descricao, imagem, preco }),
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro || `Erro ${resposta.status}`);
        }

        const novaPocao = await resposta.json();
        mostrarMensagem(msgCadastro, `✅ "${novaPocao.nome}" cadastrada com sucesso!`, true);
        formCadastro.reset();
        listarPocoes(); // Atualiza a tabela após cadastro

    } catch (erro) {
        mostrarMensagem(msgCadastro, "❌ Erro ao cadastrar: " + erro.message, false);
    }
});
//Remove poção pelo ID
/**
 * Remove uma poção pelo ID após confirmação do usuário.
 * Recarrega a tabela após remoção bem-sucedida.
 *
 * @param {number} id - ID da poção a remover
 */
async function removerPocao(id) {
    const confirmado = window.confirm(`Tem certeza que deseja remover a poção #${id}? Esta ação não pode ser desfeita.`);
    if (!confirmado) { return; }

    try {
        const resposta = await fetch(`${API_URL}/pocoes/${id}`, { method: "DELETE" });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro || `Erro ${resposta.status}`);
        }

        mostrarMensagem(msgLista, `✅ Poção #${id} removida com sucesso.`, true);
        listarPocoes(); // Recarrega a lista após remoção

    } catch (erro) {
        mostrarMensagem(msgLista, "❌ Erro ao remover: " + erro.message, false);
    }
}

// Utilitários
/**
 * Exibe uma mensagem de feedback ao usuário em um elemento <p>.
 * Remove a classe de estado anterior antes de aplicar a nova.
 *
 * @param {HTMLElement} elemento - Elemento onde exibir a mensagem
 * @param {string}      texto    - Texto da mensagem
 * @param {boolean}     sucesso  - true para estilo verde, false para estilo vermelho
 */
function mostrarMensagem(elemento, texto, sucesso) {
    elemento.textContent = texto;
    elemento.className = "msg " + (sucesso ? "sucesso" : "erro");
    // Remove a mensagem automaticamente após 5 segundos
    setTimeout(() => { elemento.textContent = ""; elemento.className = "msg"; }, 5000);
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

// Carrega a tabela assim que a página estiver pronta
document.addEventListener("DOMContentLoaded", listarPocoes);
