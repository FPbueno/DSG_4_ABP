const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Adiciona suporte para arquivos .env
config.resolver.sourceExts.push("env");

// Adiciona configuração para resolver o problema do react-native-maps na web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName.startsWith("react-native-maps")) {
    return {
      filePath: require.resolve("./src/utils/empty-map.js"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
