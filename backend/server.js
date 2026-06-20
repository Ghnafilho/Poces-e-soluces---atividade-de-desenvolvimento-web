import express from "express";
import cors from "cors";
import { Pocao, initDB } from "./database.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// ROTAS DA API (Web Service)
// ─────────────────────────────────────────────

/**
 * GET /pocoes
 * Lista todas as poções cadastradas no banco.
 * Retorna array JSON com todos os campos do modelo.
 */
app.get("/pocoes", async (req, res) => {
    try {
        const pocoes = await Pocao.findAll();
        res.json(pocoes);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar poções.", detalhe: err.message });
    }
});

/**
 * GET /pocoes/:id
 * Retorna uma poção específica pelo ID.
 * Retorna 404 se não encontrada.
 */
app.get("/pocoes/:id", async (req, res) => {
    try {
        const pocao = await Pocao.findByPk(req.params.id);
        if (!pocao) {
            return res.status(404).json({ erro: "Poção não encontrada." });
        }
        res.json(pocao);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar poção.", detalhe: err.message });
    }
});

/**
 * POST /pocoes
 * Cadastra uma nova poção.
 * Body esperado: { nome, descricao, imagem, preco }
 * Retorna 400 se campos obrigatórios estiverem ausentes.
 */
app.post("/pocoes", async (req, res) => {
    const { nome, descricao, imagem, preco } = req.body;

    if (!nome || !descricao || preco === undefined) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, descricao, preco." });
    }

    try {
        const novaPocao = await Pocao.create({ nome, descricao, imagem, preco });
        res.status(201).json(novaPocao);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao cadastrar poção.", detalhe: err.message });
    }
});

/**
 * DELETE /pocoes/:id
 * Remove uma poção pelo ID.
 * Retorna 404 se não encontrada, 200 com mensagem de sucesso se removida.
 */
app.delete("/pocoes/:id", async (req, res) => {
    try {
        const pocao = await Pocao.findByPk(req.params.id);
        if (!pocao) {
            return res.status(404).json({ erro: "Poção não encontrada." });
        }
        await pocao.destroy();
        res.json({ mensagem: "Poção removida com sucesso." });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao remover poção.", detalhe: err.message });
    }
});

// ─────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🧪 Servidor rodando em http://localhost:${PORT}`);
    });
});
