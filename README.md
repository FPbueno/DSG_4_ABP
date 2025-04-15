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

## 📂 Estrutura do projeto:
```
/Front
│
├── /src                   
│   ├── /assets       
│   ├── /components            
│   ├── /context
│   ├── /hooks
│   ├── /navigation
│   ├── /screens
│   ├── /services
│   ├── /types               
│   └── /utils             
├── package.json            # Dependências e scripts do projeto
├── .gitignore              # Arquivos a serem ignorados pelo git
└── README.md 
/Back
│
├── /src                    
│   ├── /controllers        
│   ├── /models             
│   ├── /database
│   ├── /middleware
│   ├── /routes             
│   └── /service             
├── package.json            # Dependências e scripts do projeto
├── .gitignore              # Arquivos a serem ignorados pelo git
└── README.md               
```
## ⚙️ Instalação

Para instalarmos e rodarmos a aplicação devemos seguir os seguintes passos abaixo:
```
## Primeiro crie uma pasta onde você clonará o projeto e após abrir ela no terminal digite os seguintes comandos

git clone https://github.com/FPbueno/DSG_4_ABP.git .

npm i   ## Para instalar todas as dependências do projeto
npx react-native install

## Rodando no Backend
npm run dev

## Rodando o aplicativos móvel
npx react-native run-android
```

## 📋 Backlog do Produto

| Requisito | Descrição                                                                 | Sprint | Prioridade |
|-----------|---------------------------------------------------------------------------|--------|------------|
| RF01      | O sistema deve coletar e armazenar coordenadas GPS                        | 1      | Alta       |
| RF02      | O sistema deve transmitir os dados coletados via rede celular             | 1      | Alta       |
| RF03      | O sistema deve permitir que uma estação receba os dados e armazene no BD  | 2      | Alta       |
| RF04      | O sistema deve restringir o acesso a usuários autenticados                | 2      | Alta       |
| RF05      | O sistema deve permitir visualização do histórico por derivador e período | 3      | Alta       |
| RF06      | O sistema deve permitir o download de dados em CSV                        | 2      | Média      |
| RNF01     | O sistema deve permitir acesso aos dados por app móvel                    | 2      | Alta       |
| RNF02     | O sistema deve apresentar localizações em mapas interativos               | 3      | Alta       |
| RNF03     | A interface do sistema deve ser responsiva                                | 2      | Alta       |
| RNF04     | O sistema deve incluir uma tela explicativa sobre o projeto               | 2      | Média      |


## 📋 Entregas 
**Sprint**  | **Inicio / Fim** | **Status**         | **Link**
:---------: | :------:    | :-------:          | :-------:
01          | 24/03 - 15/04   | ✅                | <a href="https://youtu.be/AV_2AfgMPY4">Sprint 1</a>
02          | 16/04 - 13/05   | ⚠️                | <a href="#">Sprint 2</a>
03          | 14/05 - 10/06   | ⚠️               | <a href="#">Sprint 3</a>

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
      <td>Product Owner</td>
      <td>
        <a href="https://github.com/FPBueno">
          <img src="https://github.com/FPBueno.png" width="50" height="50" style="border-radius: 50%;" alt="FPBueno">
        </a>
      </td>
    </tr>
    <tr>
      <td>Dev Team</td>
      <td>
        <a href="https://github.com/Marcelly-cris">
          <img src="https://github.com/Marcelly-cris.png" width="50" height="50" style="border-radius: 50%;" alt="Marcelly-cris">
        </a>
      </td>
    </tr>
    <tr>
      <td>Dev Team</td>
      <td>
        <a href="https://github.com/MingRenan">
          <img src="https://github.com/MingRenan.png" width="50" height="50" style="border-radius: 50%;" alt="MingRenan">
        </a>
      </td>
    </tr>
    <tr>
      <td>Scrum Master</td>
      <td>
        <a href="https://github.com/Isaac-Exon">
          <img src="https://github.com/Isaac-Exon.png" width="50" height="50" style="border-radius: 50%;" alt="Isaac-Exon">
        </a>
      </td>
    </tr>
    <tr>
      <td>Dev team</td>
      <td>
        <a href="https://github.com/AnaBarbancho">
          <img src="https://github.com/AnaBarbancho.png" width="50" height="50" style="border-radius: 50%;" alt="AnaBarbancho">
        </a>
      </td>
    </tr>
  </tbody>
</table>
