const path = require("path");

module.exports = {
  distDir: "../../dist/functions/next",
  webpack: (config, options) => {
    config.resolve.alias["assets"] = path.resolve(__dirname, "assets/");
    config.resolve.alias["components"] = path.resolve(__dirname, "components/");
    return config;
  },
};
