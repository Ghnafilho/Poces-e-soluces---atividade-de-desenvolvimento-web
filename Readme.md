# 🧪 Poções & Soluções

> Web Service e vitrine da loja de poções de Annabelle Merigold — Beco da Última Saída.  
> Trabalho prático da disciplina **SCC0219 — Introdução ao Desenvolvimento Web** (ICMC/USP).

---

## 📁 Estrutura do Projeto

```
├── backend/
│   ├── database.js      # Configuração do banco SQLite em memória e modelo Pocao
│   ├── server.js        # Web Service Express com as rotas da API
│   └── package.json
│
└── frontend/
    ├── index.html       # Página principal da loja (vitrine)
    ├── admin.html       # Painel de administração
    ├── app.js           # AJAX para carregar e renderizar as poções na vitrine
    ├── admin.js         # AJAX para cadastrar, listar e remover poções no painel admin
    └── style.css        # Estilos globais (paleta escura + fontes clássicas)
```

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (já incluído no Node.js)

---

## 🚀 Como executar

### 1. Instalar as dependências do backend

```bash
cd backend
npm install
```

### 2. Iniciar o servidor

```bash
node server.js
```

O terminal exibirá:
```
✅ Banco inicializado com 6 poções.
🧪 Servidor rodando em http://localhost:3001
```

> O banco de dados é criado **em memória** a cada inicialização e já vem populado com as 6 poções do enunciado. Os dados são perdidos ao encerrar o servidor — isso é o comportamento esperado.

### 3. Abrir o frontend

Com o servidor rodando, abra no navegador:

- **Vitrine da loja:** abra o arquivo `frontend/index.html` diretamente no navegador  
- **Painel admin:** abra o arquivo `frontend/admin.html` diretamente no navegador  
  (ou clique em "🔒 Admin" no canto superior direito da vitrine)

> Não é necessário nenhum servidor para o frontend — basta abrir os arquivos `.html` diretamente.

---

## 🌐 Endpoints da API

| Método | Rota           | Descrição                         |
|--------|----------------|-----------------------------------|
| GET    | `/pocoes`      | Lista todas as poções             |
| POST   | `/pocoes`      | Cadastra uma nova poção           |
| DELETE | `/pocoes/:id`  | Remove uma poção pelo ID          |

### Exemplo — Cadastrar uma poção (POST /pocoes)

```json
{
  "nome": "Poção da Sabedoria",
  "descricao": "Aumenta o QI por 2 horas. Efeitos variáveis.",
  "imagem": "https://exemplo.com/imagem.png",
  "preco": 450
}
```

Campos obrigatórios: `nome`, `descricao`, `preco`. O campo `imagem` é opcional.

---

## 🖥️ Funcionalidades

### Vitrine (index.html)
- Descrição da loja e apresentação de Annabelle Merigold
- Seção de histórico da loja (fundada em 1867) com galeria de fotos e linha do tempo
- Listagem dinâmica das poções via AJAX (fetch)
- Cada poção exibe: nome, imagem, descrição, preço e botão "Comprar"
- Rodapé com informações de contato
- Layout responsivo para dispositivos móveis

### Painel Admin (admin.html)
- Cadastrar nova poção via formulário
- Listar todas as poções em tabela
- Remover poção com confirmação

---

## 🛠️ Tecnologias utilizadas

- **Backend:** Node.js, Express, Sequelize, SQLite (modo memória)
- **Frontend:** HTML5, CSS3, JavaScript puro (AJAX via Fetch API)
- **Fontes:** IM Fell English, Crimson Text, Gill Sans (fallback)

---

## 👤 Autor

Gustavo Henrique Nogueira de Andrade Filho  
ICMC — Universidade de São Paulo  
SCC0219 — Introdução ao Desenvolvimento Web
