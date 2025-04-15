# Frontend - AquaTrace

Este é o frontend da aplicação AquaTrace, desenvolvido em React Native com Expo.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go (app para testar no celular)

## Instalação

1. Clone o repositório
2. Navegue até o diretório do frontend:

   ```bash
   cd front
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Executando o Aplicativo

1. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

2. Escolha como deseja visualizar o aplicativo:
   - Pressione `w` para abrir no navegador web
   - Pressione `a` para abrir no emulador Android
   - Pressione `i` para abrir no emulador iOS
   - Escaneie o QR code com o app Expo Go no seu celular

## Funcionalidades

### Autenticação

- Login com email e senha
- Registro de novo usuário
- Logout (Sair)

### Localização

- Visualização do mapa
- Registro de localizações
- Histórico de localizações

## Como Sair (Logout)

Para sair da aplicação:

1. Toque no ícone de menu (geralmente no canto superior direito)
2. Selecione a opção "Sair" ou "Logout"
3. Confirme que deseja sair

Após sair, você será redirecionado para a tela de login.

## Estrutura do Projeto

```
front/
├── assets/          # Recursos estáticos (imagens, etc)
├── components/      # Componentes reutilizáveis
├── context/         # Contextos do React
├── hooks/           # Hooks personalizados
├── navigation/      # Configuração de navegação
├── screens/         # Telas da aplicação
├── services/        # Serviços (API, autenticação)
├── types/           # Definições de tipos TypeScript
├── utils/           # Utilitários
├── App.tsx          # Ponto de entrada da aplicação
└── index.js         # Arquivo de inicialização
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Inicia no emulador Android
- `npm run ios` - Inicia no emulador iOS
- `npm run web` - Inicia no navegador web
