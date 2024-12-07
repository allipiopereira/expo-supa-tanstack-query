const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

const { withNativeWind } = require("nativewind/metro");
module.exports = withNativeWind(config, {
  input: "./global.css",
  inlineRem: false,
  features: {
    transformPercentagePolyfill: true,
  },
});
