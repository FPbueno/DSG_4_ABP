const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Adiciona suporte para arquivos .env
config.resolver.sourceExts.push("env");

module.exports = config;
