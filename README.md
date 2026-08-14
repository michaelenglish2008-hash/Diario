# 🎬 Diário Cultural

Site pessoal para registrar e acompanhar os filmes e séries que você assistiu.

Feito com **React + Vite**, sem backend, sem banco de dados e sem login — tudo é salvo direto no seu navegador (`localStorage`).

---

## O que o site faz

- Cadastra filmes e séries com nome, tipo, ano, status, nota (0–10) e uma anotação opcional.
- Mostra 4 estatísticas automáticas no topo: filmes assistidos, séries assistidas, total de obras assistidas e nota média.
- Permite pesquisar pelo nome e filtrar por tipo e por status.
- Permite editar e excluir qualquer obra, e trocar status/nota direto na lista.
- Salva tudo automaticamente no `localStorage` — os dados continuam lá mesmo depois de fechar o navegador.
- Tem botões de **Exportar** e **Importar** para você fazer backup dos seus dados em um arquivo `.json`.

---

## 1. Como instalar as dependências

Você precisa ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou mais recente).

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

Isso vai baixar o React, o Vite e tudo o que o projeto precisa.

---

## 2. Como executar localmente

Ainda no terminal, rode:

```bash
npm run dev
```

O terminal vai mostrar um endereço, algo como `http://localhost:5173`. Abra esse endereço no navegador — o site vai estar rodando na sua máquina, já com alguns filmes e séries de exemplo cadastrados.

Para parar, aperte `Ctrl + C` no terminal.

---

## 3. Como colocar no GitHub

1. Crie uma conta em [github.com](https://github.com) se ainda não tiver.
2. Clique em **New repository**, dê um nome (ex: `diario-cultural`) e crie o repositório (pode deixar vazio, sem README).
3. No terminal, dentro da pasta do projeto, rode:

```bash
git init
git add .
git commit -m "Primeira versão do Diário Cultural"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/diario-cultural.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub.

---

## 4. Como conectar o GitHub à Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) — pode entrar direto com sua conta do GitHub.
2. Dentro do painel da Vercel, clique em **Add New → Project**.
3. Selecione o repositório `diario-cultural` que você acabou de subir para o GitHub.
4. A Vercel detecta automaticamente que é um projeto Vite. Não precisa mudar nada — o comando de build (`vite build`) e a pasta de saída (`dist`) já são identificados sozinhos.

---

## 5. Como publicar

Depois de conectar o repositório, clique em **Deploy**.

Em cerca de 1 minuto a Vercel te entrega um link público (algo como `diario-cultural.vercel.app`) onde o site já está no ar.

---

## 6. Como atualizar o site depois

Sempre que você (ou eu, te ajudando) alterar o código, basta enviar as mudanças para o GitHub:

```bash
git add .
git commit -m "descrição do que mudou"
git push
```

A Vercel detecta o novo `push` automaticamente e publica a nova versão sozinha — não precisa fazer nada no painel da Vercel.

---

## Sobre os dados: como funciona a persistência

Os dados ficam salvos no `localStorage` do navegador, no seu computador — ou seja, cada pessoa que abrir o site vê apenas os próprios dados, e nada é enviado para nenhum servidor.

Isso significa duas coisas importantes:

- Atualizar o código e reimplantar o site **não apaga seus dados** — o `localStorage` é do navegador, não do deploy.
- Se você limpar os dados do navegador, trocar de computador ou de navegador, os dados **não acompanham** — por isso existem os botões **Exportar** e **Importar**: use "Exportar" de vez em quando para guardar um arquivo `.json` de backup, e "Importar" para restaurá-lo (inclusive em outro navegador ou computador).

### Estrutura dos dados

Toda obra segue este formato:

```json
{
  "id": "texto único",
  "title": "Nome da obra",
  "type": "filme" | "serie",
  "year": 2024,
  "status": "quero" | "assistindo" | "assistido",
  "rating": 8.5,
  "notes": "o que você achou (opcional)"
}
```

---

## Se um dia você quiser trocar o localStorage por um banco de dados

O projeto já foi organizado para isso ser simples:

- Toda a leitura e escrita passa por **`src/data/storage.js`** — é o único lugar que fala com o `localStorage`.
- Toda a lógica de adicionar/editar/excluir passa pelo hook **`src/hooks/useObras.js`**.

Para trocar por um banco de dados no futuro, basta reescrever essas duas peças (por exemplo, fazendo `storage.js` chamar uma API em vez do `localStorage`) — os componentes de tela não precisam mudar.

---

## Estrutura do projeto

```
diario-cultural/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # ponto de entrada
    ├── App.jsx             # componente principal
    ├── App.css             # estilos do app
    ├── index.css           # estilos globais
    ├── components/         # Header, StatsCards, Toolbar, ObraList, ObraRow, ObraFormModal, ConfirmDialog
    ├── data/                # storage.js (localStorage) e seedData.js (dados de exemplo)
    ├── hooks/               # useObras.js (toda a lógica de CRUD)
    └── utils/                # constants.js, stats.js, backup.js (exportar/importar)
```

---

Feito para ser simples de continuar. Qualquer alteração que você quiser depois — um novo campo, um novo filtro, um visual diferente — pode ser pedida normalmente a partir deste projeto.
