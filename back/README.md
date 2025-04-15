# Backend - AquaTrace

Este é o backend da aplicação AquaTrace, desenvolvido em Node.js com TypeScript, Express e PostgreSQL.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- pgAdmin 4 (interface gráfica para PostgreSQL)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Navegue até o diretório do backend:

   ```bash
   cd back
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

1. Abra o pgAdmin 4
2. Conecte-se ao seu servidor PostgreSQL (geralmente localhost)
3. Crie um novo banco de dados:

   - Clique com o botão direito em "Databases"
   - Selecione "Create" > "Database"
   - Nome do banco: `AquaTrace`
   - Clique em "Save"

4. Execute os scripts SQL:

   - Clique com o botão direito no banco de dados `AquaTrace`
   - Selecione "Query Tool"
   - Abra o arquivo `back/src/database/create_tables.sql` e execute-o
   - Abra o arquivo `back/src/database/insert_test_user.sql` e execute-o

5. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do diretório `back` com o seguinte conteúdo:
   ```
   DB_USER=postgres
   DB_PASSWORD=sua_senha_postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=AquaTrace
   JWT_SECRET=sua_chave_secreta_jwt
   ```

## Executando o Servidor

1. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

2. O servidor estará rodando em `http://localhost:3000`

## Endpoints da API

### Autenticação

- `POST /auth/login` - Login de usuário

  ```json
  {
    "mail": "teste@email.com",
    "password": "123456"
  }
  ```

- `POST /auth/register` - Registro de novo usuário
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "email@exemplo.com",
    "telefone": "11999999999",
    "pais": "Brasil",
    "senha": "senha123"
  }
  ```

### Localizações

- `POST /locations` - Registrar nova localização

  ```json
  {
    "latitude": -23.55052,
    "longitude": -46.633308
  }
  ```

- `GET /locations` - Listar localizações do usuário

## Estrutura do Projeto

```
back/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── database/        # Configuração e conexão com o banco de dados
│   ├── middlewares/     # Middlewares do Express
│   ├── routes/          # Rotas da API
│   └── index.ts         # Ponto de entrada da aplicação
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configuração do TypeScript
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia o servidor em modo de produção
- `npm test` - Executa os testes
