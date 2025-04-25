<p align="center">
  <img src="documents/images/logo.jpg" width="300" height="300">
</p>
<h1 align="center">DSG - DATA SOLUTIONS GROUP</h1>

> Status: Developing ⚠️

## 💡 Desafio problema:

Os derivadores são amplamente utilizados em estudos oceanográficos, como análise de correntes,
dispersão de óleo e operações de resgate. Projetados para seguir as correntes locais, permitem o
cálculo de velocidade e outros parâmetros cinemáticos e dinâmicos a partir de suas posições ao
longo do tempo.
<Br/><Br/>
Atualmente, a estrutura externa desses dispositivos tem sido construída de forma eficiente com
impressoras 3D (vide figura abaixo). No entanto, a carga útil-composta por localizador GPS e
sistema de transmissão de dados via telefonia celular-ainda depende de soluções importadas. O
desafio, portanto, é desenvolver uma solução própria baseada em IoT, que possibilite o
rastreamento dos derivadores e ofereça uma interface gráfica para visualização em tempo real dos
dados transmitidos.

## 📂 Estrutura do projeto: (preencher conforme o necessário)

```
/Front
│
├── /src
│   ├── /
│   ├── /
│   ├── /
│   └── /
├── package.json            # Dependências e scripts do projeto
├── .gitignore              # Arquivos a serem ignorados pelo git
└── README.md
/Back
│
├── /src
│   ├── /controllers
│   ├── /models
│   ├── /database
│   └── /utils
├── package.json            # Dependências e scripts do projeto
├── .gitignore              # Arquivos a serem ignorados pelo git
└── README.md
```

## ⚙️ Instalação

## 🗄️ Configuração do Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. Para configurar o banco de dados, siga os passos abaixo:

1. Certifique-se de ter o PostgreSQL instalado e rodando
2. Crie um banco de dados para o projeto
3. Execute o script de migração:

```bash
# Navegue até o diretório do backend
cd back

# Execute o script de migração
psql -U seu_usuario -d nome_do_banco -f src/database/migrations/001_create_tables.sql
```

### Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas:

- **users**: Armazena informações dos usuários

  - Campos: id, nome, email, telefone, pais, senha, code, code_expires, created_at, updated_at
  - Índices: email

- **locations**: Armazena informações de localização
  - Campos: id, user_id, latitude, longitude, nome, descricao, created_at, updated_at
  - Índices: user_id, coordenadas (latitude, longitude)
  - Chave estrangeira: user_id referenciando users(id)

## 📋 Entregas (arrumar os links)

| **Sprint** | **Inicio / Fim** | **Status** |         **Link**         |
| :--------: | :--------------: | :--------: | :----------------------: |
|     01     |  24/03 - 15/04   |     ⚠️     | <a href="#">Sprint 1</a> |
|     02     |  16/04 - 13/05   |     ⚠️     | <a href="#">Sprint 2</a> |
|     03     |  14/05 - 10/06   |     ⚠️     | <a href="#">Sprint 3</a> |

## 👩‍💻 Equipe

<table>
  <thead>
    <tr>
      <th>Função</th>
      <th>Integrante</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sem definição</td>
      <td>
        <a href="https://github.com/FPBueno">
          <img src="https://github.com/FPBueno.png" width="50" height="50" style="border-radius: 50%;" alt="FPBueno">
        </a>
      </td>
    </tr>
    <tr>
      <td>Sem definição</td>
      <td>
        <a href="https://github.com/Marcelly-cris">
          <img src="https://github.com/Marcelly-cris.png" width="50" height="50" style="border-radius: 50%;" alt="Marcelly-cris">
        </a>
      </td>
    </tr>
    <tr>
      <td>Sem definição</td>
      <td>
        <a href="https://github.com/MingRenan">
          <img src="https://github.com/MingRenan.png" width="50" height="50" style="border-radius: 50%;" alt="MingRenan">
        </a>
      </td>
    </tr>
    <tr>
      <td>Sem definição</td>
      <td>
        <a href="https://github.com/Isaac-Exon">
          <img src="https://github.com/Isaac-Exon.png" width="50" height="50" style="border-radius: 50%;" alt="Isaac-Exon">
        </a>
      </td>
    </tr>
    <tr>
      <td>Sem definição</td>
      <td>
        <a href="https://github.com/AnaBarbancho">
          <img src="https://github.com/AnaBarbancho.png" width="50" height="50" style="border-radius: 50%;" alt="AnaBarbancho">
        </a>
      </td>
    </tr>
  </tbody>
</table>
