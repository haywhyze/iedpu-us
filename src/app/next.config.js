const path = require("path");

module.exports = {
  distDir: "../../dist/functions/next",
  webpack: (config, options) => {
    config.resolve.alias["assets"] = path.resolve(__dirname, "assets/");
    return config;
  },
};
