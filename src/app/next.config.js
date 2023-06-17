const path = require("path");

module.exports = {
  distDir: "../../dist/functions/next",
  webpack: (config, options) => {
    config.resolve.alias["assets"] = path.resolve(__dirname, "assets/");
    config.resolve.alias["components"] = path.resolve(__dirname, "components/");
    config.resolve.alias["views"] = path.resolve(__dirname, "views/");
    config.resolve.alias["variables"] = path.resolve(__dirname, "variables/");
    return config;
  },
};
